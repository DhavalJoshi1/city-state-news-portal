const mongoose = require('mongoose');

exports.isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.validateId = (paramName = 'id') => (req, res, next) => {
  const id = req.params[paramName];
  if (!exports.isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: `Invalid ${paramName}` });
  }
  next();
};