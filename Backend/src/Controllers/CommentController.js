const Comment = require("../Models/Comment");
const { validationResult } = require('express-validator');
const ResponseHandler = require('../Utils/ResponseHandler');

// ✅ 1. Get Comments (Optimized with Nested Replies)
exports.getComments = async (req, res, next) => {
  try {
    const { contentId, contentType = 'news' } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const filter = contentType === 'news'
      ? { news: contentId, parentComment: null, status: 'approved' }
      : { article: contentId, parentComment: null, status: 'approved' };

    const comments = await Comment.find(filter)
      .populate('user', 'name avatar')
      .populate({
        path: 'replies',
        match: { status: 'approved' },
        populate: { path: 'user', select: 'name avatar' }
      })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Comment.countDocuments(filter);

    ResponseHandler.success(res, 'Comments fetched', {
      comments,
      pagination: { total, currentPage: page, totalPages: Math.ceil(total / limit) }
    });
  } catch (error) { next(error); }
};

// ✅ 2. Create Comment (Fixed Reference Bug)
exports.createComment = async (req, res, next) => {
  try {
    const { text, contentId, contentType = 'news', parentComment } = req.body;

    const comment = new Comment({
      text,
      user: req.user.id,
      [contentType === 'news' ? 'news' : 'article']: contentId,
      parentComment: parentComment || null
    });

    // Auto-approve if privileged
    if (['admin', 'reporter'].includes(req.user.role)) {
      comment.status = 'approved';
    }

    await comment.save();

    // Agar reply hai, toh parent ke replies array mein add karein
    if (parentComment) {
      await Comment.findByIdAndUpdate(parentComment, {
        $push: { replies: comment._id }
      });
    }

    await comment.populate('user', 'name avatar');
    ResponseHandler.created(res, 'Comment posted', comment);
  } catch (error) { next(error); }
};

// ✅ 3. Delete Comment (Recursive Cleanup)
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return ResponseHandler.notFound(res, 'Comment not found');

    if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return ResponseHandler.forbidden(res, 'Unauthorized');
    }

    // Agar replies hain toh text badal do (Soft Delete)
    if (comment.replies.length > 0) {
      comment.text = 'This comment was deleted.';
      comment.status = 'rejected';
      await comment.save();
    } else {
      // Direct delete (Middleware in Model will handle parent array cleanup)
      await Comment.findByIdAndDelete(req.params.id);
    }

    ResponseHandler.success(res, 'Comment deleted');
  } catch (error) { next(error); }
};

// ✅ 4. Toggle Like (Simplified)
exports.toggleLike = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const isLiked = comment.likes.includes(req.user.id);

    const update = isLiked 
      ? { $pull: { likes: req.user.id } } 
      : { $addToSet: { likes: req.user.id } };

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id, 
      update, 
      { new: true }
    );

    ResponseHandler.success(res, isLiked ? 'Unliked' : 'Liked', {
      likeCount: updatedComment.likes.length
    });
  } catch (error) { next(error); }
};

// ✅ 5. Update Comment
exports.updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return ResponseHandler.notFound(res, 'Comment not found');
    if (comment.user.toString() !== req.user.id) return ResponseHandler.forbidden(res, 'Only author can edit');
    
    comment.text = req.body.text;
    await comment.save();
    ResponseHandler.success(res, 'Comment updated', comment);
  } catch (error) { next(error); }
};

// ✅ 6. Report Comment
exports.reportComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, { isReported: true, $push: { reports: { user: req.user.id, reason: req.body.reason } } }, { new: true });
    ResponseHandler.success(res, 'Comment reported', comment);
  } catch (error) { next(error); }
};

// ✅ 7. Get Reported Comments (Admin)
exports.getReportedComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ isReported: true }).populate('user', 'name');
    ResponseHandler.success(res, 'Reported comments fetched', comments);
  } catch (error) { next(error); }
};