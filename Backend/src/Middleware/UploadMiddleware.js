const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ✅ Ensure Folders Exist (Sync on startup)
const folders = [
  path.join('public', 'uploads', 'images'),
  path.join('public', 'uploads', 'videos')
];

folders.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Mimetype detection for folder routing
    const folder = file.mimetype.startsWith('video/') 
      ? path.join('public', 'uploads', 'videos') 
      : path.join('public', 'uploads', 'images');
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    // Professional naming convention: portal-timestamp-random.ext
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `city-news-${uniqueSuffix}${extension}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
    'video/mp4', 'video/quicktime', 'video/x-matroska', 'video/webm'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error('Invalid file type! Sirf Images (JPG, PNG, WEBP) aur Videos (MP4, WEBM) allowed hain.');
    error.statusCode = 400;
    cb(error, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { 
    fileSize: 50 * 1024 * 1024 // Increased to 50MB for high-quality news videos
  }
});

module.exports = upload;