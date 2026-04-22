const City = require("../Models/City");
const News = require("../Models/News"); // Dependency check ke liye
const ResponseHandler = require('../Utils/ResponseHandler');

// ✅ 1. Get Cities (With State Filter Support)
exports.getCities = async (req, res, next) => {
  try {
    const { state, activeOnly } = req.query;
    let filter = {};

    // Agar frontend se state pass ho rahi hai toh filter karein
    if (state) filter.state = state;
    if (activeOnly === 'true') filter.isActive = true;

    const cities = await City.find(filter).sort({ name: 1 });
    
    ResponseHandler.success(res, 'Cities retrieved successfully', cities);
  } catch (error) {
    next(error);
  }
};

// ✅ 2. Create City (Advanced Validation)
exports.createCity = async (req, res, next) => {
  try {
    const { name, state } = req.body;

    if (!name || !state) {
      return ResponseHandler.badRequest(res, 'City name and State are required');
    }

    // Check if city already exists in the same state
    const existingCity = await City.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') },
      state: state 
    });

    if (existingCity) {
      return ResponseHandler.badRequest(res, 'This city already exists in this state');
    }

    const city = await City.create({
      name,
      state,
      isActive: true
    });

    ResponseHandler.created(res, 'City added successfully', city);
  } catch (error) {
    next(error);
  }
};

// ✅ 3. Update City
exports.updateCity = async (req, res, next) => {
  try {
    // Model middleware slug update handle karega agar name change hua toh
    const city = await City.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );

    if (!city) return ResponseHandler.notFound(res, 'City not found');

    ResponseHandler.success(res, 'City updated successfully', city);
  } catch (error) {
    next(error);
  }
};

// ✅ 4. Delete City (With Integrity Check)
exports.deleteCity = async (req, res, next) => {
  try {
    // 🛑 STOP: Pehle check karein ki is city ki koi news toh nahi hai?
    const hasNews = await News.findOne({ city: req.params.id });
    if (hasNews) {
      return ResponseHandler.badRequest(res, 'Cannot delete city. News articles are already mapped to this city.');
    }

    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) return ResponseHandler.notFound(res, 'City not found');

    ResponseHandler.success(res, 'City deleted successfully');
  } catch (error) {
    next(error);
  }
};