const ResponseHandler = require('../Utils/ResponseHandler');

exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return ResponseHandler.badRequest(res, 'No file provided');
    }

    // Windows double backslash fix
    const filePath = req.file.path.replace(/\\/g, "/");
    
    // Full URL for frontend
    const fileUrl = `${req.protocol}://${req.get('host')}/${filePath}`;

    ResponseHandler.success(res, 'File uploaded successfully', {
      url: fileUrl,
      path: filePath, // Database mein save karne ke liye
      type: req.file.mimetype.split('/')[0],
      filename: req.file.filename,
      size: `${(req.file.size / (1024 * 1024)).toFixed(2)} MB`
    });
  } catch (error) {
    next(error);
  }
};