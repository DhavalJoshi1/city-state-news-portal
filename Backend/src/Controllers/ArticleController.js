const Article = require("../Models/Article");
const { validationResult } = require('express-validator');
const ResponseHandler = require('../Utils/ResponseHandler');
const fs = require('fs');
const path = require('path');

// ✅ 1. Get all articles (With Advanced Pagination & Filters)
exports.getArticles = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.city) filter.city = req.query.city;
    if (req.query.author) filter.author = req.query.author;
    
    // Default filter for public users
    if (req.user && req.user.role === 'admin') {
      if (req.query.status) filter.status = req.query.status;
    } else {
      filter.status = 'published';
    }

    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { content: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const articles = await Article.find(filter)
      .populate('author', 'name email avatar')
      .populate('category', 'name slug')
      .populate('city', 'name')
      .populate('tags', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Article.countDocuments(filter);

    ResponseHandler.success(res, 'Articles retrieved successfully', {
      articles,
      pagination: {
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) { next(error); }
};

// ✅ 2. Create Article (With Automatic Slug & Image)
exports.createArticle = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return ResponseHandler.badRequest(res, 'Validation failed', errors.array());

    const articleData = {
      ...req.body,
      author: req.user.id,
      image: req.file ? `/uploads/articles/${req.file.filename}` : ''
    };

    // Note: Slug generation model middleware handle karega (pre-save)
    const article = await Article.create(articleData);
    const populatedArticle = await Article.findById(article._id).populate(['author', 'category', 'city']);

    ResponseHandler.created(res, 'Article created successfully', populatedArticle);
  } catch (error) { next(error); }
};

// ✅ 3. Update Article (With File Cleanup)
exports.updateArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return ResponseHandler.notFound(res, 'Article not found');

    if (article.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return ResponseHandler.forbidden(res, 'Not authorized');
    }

    const updateData = { ...req.body };
    
    // Agar nayi image upload hui hai toh purani delete karo
    if (req.file) {
      updateData.image = `/uploads/articles/${req.file.filename}`;
      if (article.image) {
        const oldPath = path.join(__dirname, '../../', article.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate(['author', 'category', 'city']);

    ResponseHandler.success(res, 'Article updated successfully', updatedArticle);
  } catch (error) { next(error); }
};

// ✅ 4. Delete Article (With Image Removal)
exports.deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return ResponseHandler.notFound(res, 'Article not found');

    if (article.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return ResponseHandler.forbidden(res, 'Not authorized');
    }

    if (article.image) {
      const imagePath = path.join(__dirname, '../../', article.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await Article.findByIdAndDelete(req.params.id);
    ResponseHandler.success(res, 'Article deleted successfully');
  } catch (error) { next(error); }
};

// ✅ 5. Get Single Article
exports.getArticleById = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'name email avatar')
      .populate('category', 'name')
      .populate('city', 'name');
    if (!article) return ResponseHandler.notFound(res, 'Article not found');
    ResponseHandler.success(res, 'Article found', article);
  } catch (error) { next(error); }
};

// ✅ 6. Get Articles by Author
exports.getArticlesByAuthor = async (req, res, next) => {
  try {
    const articles = await Article.find({ author: req.params.authorId }).sort({ createdAt: -1 });
    ResponseHandler.success(res, 'Author articles retrieved', articles);
  } catch (error) { next(error); }
};

// ✅ 7. Toggle Publish Status
exports.togglePublish = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return ResponseHandler.notFound(res, 'Article not found');
    
    article.status = article.status === 'published' ? 'draft' : 'published';
    await article.save();
    
    ResponseHandler.success(res, `Article ${article.status}`, article);
  } catch (error) { next(error); }
};