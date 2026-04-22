const Category = require("../Models/Category");
const News = require("../Models/News"); // Dependency check ke liye
const ResponseHandler = require('../Utils/ResponseHandler');
const fs = require('fs');
const path = require('path');

// ✅ 1. Get all categories (Active & News Count ke saath)
exports.getCategories = async (req, res, next) => {
  try {
    // .populate('newsCount') tab kaam karega jab aapne Model mein virtual set kiya ho
    const categories = await Category.find({ isActive: true })
      .sort({ order: 1, name: 1 });
    
    ResponseHandler.success(res, 'Categories retrieved successfully', categories);
  } catch (error) {
    next(error);
  }
};

// ✅ 2. Create Category (With Image Support)
exports.createCategory = async (req, res, next) => {
  try {
    const { name, description, order } = req.body;

    if (!name) return ResponseHandler.badRequest(res, 'Category name is required');

    const existingCat = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existingCat) return ResponseHandler.badRequest(res, 'Category already exists');

    const category = await Category.create({
      name,
      description,
      order: order || 0,
      image: req.file ? `/uploads/categories/${req.file.filename}` : '',
      isActive: true
    });

    ResponseHandler.created(res, 'Category created successfully', category);
  } catch (error) {
    next(error);
  }
};

// ✅ 3. Update Category (With Old Image Cleanup)
exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return ResponseHandler.notFound(res, 'Category not found');

    const updateData = { ...req.body };

    // Agar nayi image upload ho rahi hai toh purani delete karein
    if (req.file) {
      updateData.image = `/uploads/categories/${req.file.filename}`;
      if (category.image) {
        const oldPath = path.join(__dirname, '../../', category.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    ResponseHandler.success(res, 'Category updated successfully', updatedCategory);
  } catch (error) {
    next(error);
  }
};

// ✅ 4. Delete Category (Safety Check)
exports.deleteCategory = async (req, res, next) => {
  try {
    // 🛑 Check: Kya is category mein news hain?
    const hasNews = await News.findOne({ category: req.params.id });
    if (hasNews) {
      return ResponseHandler.badRequest(res, 'Cannot delete category that has news assigned to it. Move news first.');
    }

    const category = await Category.findById(req.params.id);
    if (!category) return ResponseHandler.notFound(res, 'Category not found');

    // Delete image file
    if (category.image) {
      const imgPath = path.join(__dirname, '../../', category.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await Category.findByIdAndDelete(req.params.id);
    ResponseHandler.success(res, 'Category deleted successfully');
  } catch (error) {
    next(error);
  }
};