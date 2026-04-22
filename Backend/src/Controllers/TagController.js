const Tag = require("../Models/Tag");
const News = require("../Models/News"); // Check karne ke liye ki tag use toh nahi ho raha
const ResponseHandler = require('../Utils/ResponseHandler');

// ✅ 1. Get All Tags (Sorted by usage or name)
exports.getTags = async (req, res, next) => {
  try {
    // A to Z order mein tags fetch karna
    const tags = await Tag.find().sort({ name: 1 });
    ResponseHandler.success(res, 'Tags retrieved successfully', tags);
  } catch (error) {
    next(error);
  }
};

// ✅ 2. Create Tag (With Duplicate Check)
exports.createTag = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) return ResponseHandler.badRequest(res, 'Tag name is required');

    // Case-insensitive check taaki "Crime" aur "crime" dono na ban jayein
    const existingTag = await Tag.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existingTag) {
      return ResponseHandler.badRequest(res, 'This tag already exists');
    }

    const tag = await Tag.create({ name });
    // Model middleware auto-slug generate kar dega
    
    ResponseHandler.created(res, 'Tag created successfully', tag);
  } catch (error) {
    next(error);
  }
};

// ✅ 3. Delete Tag (Safety Check)
exports.deleteTag = async (req, res, next) => {
  try {
    const tagId = req.params.id;

    // Check karein ki kya ye tag kisi news mein use ho raha hai?
    const isUsed = await News.findOne({ tags: tagId });
    if (isUsed) {
      return ResponseHandler.badRequest(res, 'Cannot delete tag. It is currently being used in news articles.');
    }

    const tag = await Tag.findByIdAndDelete(tagId);
    if (!tag) return ResponseHandler.notFound(res, 'Tag not found');

    ResponseHandler.success(res, 'Tag deleted successfully');
  } catch (error) {
    next(error);
  }
};

// ✅ 4. Update Tag
exports.updateTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tag) return ResponseHandler.notFound(res, 'Tag not found');
    ResponseHandler.success(res, 'Tag updated successfully', tag);
  } catch (error) { next(error); }
};