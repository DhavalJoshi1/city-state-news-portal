const Ad = require("../Models/Ad");
const fs = require('fs');
const path = require('path');
const ResponseHandler = require('../Utils/ResponseHandler');

// ✅ 1. Get All Ads (For Admin Dashboard)
exports.getAds = async (req, res, next) => {
  try {
    const ads = await Ad.find().sort({ createdAt: -1 });
    ResponseHandler.success(res, 'Ads fetched successfully', ads);
  } catch (error) {
    next(error);
  }
};

// ✅ 2. Get Active Ads (For Frontend Portal) - Missing Function Added
exports.getActiveAds = async (req, res, next) => {
  try {
    const now = new Date();
    const ads = await Ad.find({
      status: 'active',
      $or: [
        { endDate: { $exists: false } },
        { endDate: { $gt: now } }
      ]
    }).sort({ createdAt: -1 });

    ResponseHandler.success(res, 'Active ads fetched successfully', ads);
  } catch (error) {
    next(error);
  }
};

// ✅ 3. Create Ad
exports.createAd = async (req, res, next) => {
  try {
    const { title, description, link, position, status, endDate } = req.body;
    const imagePath = req.file ? `/uploads/ads/${req.file.filename}` : '';

    const ad = await Ad.create({
      title, description, link, position, status, endDate, image: imagePath
    });

    ResponseHandler.created(res, 'Ad created successfully', ad);
  } catch (error) {
    next(error);
  }
};

// ✅ 4. Toggle Status - Missing Function Added
exports.toggleAdStatus = async (req, res, next) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return ResponseHandler.notFound(res, 'Ad not found');

    ad.status = ad.status === 'active' ? 'inactive' : 'active';
    await ad.save();

    ResponseHandler.success(res, `Ad marked as ${ad.status}`, ad);
  } catch (error) {
    next(error);
  }
};

// ✅ 5. Delete Ad
exports.deleteAd = async (req, res, next) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return ResponseHandler.notFound(res, 'Ad not found');

    if (ad.image) {
      const filePath = path.join(__dirname, '../../', ad.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Ad.findByIdAndDelete(req.params.id);
    ResponseHandler.success(res, 'Ad deleted successfully');
  } catch (error) {
    next(error);
  }
};