const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// Config load karein
dotenv.config();

const connectDB = require('./src/Utils/Dbconnect'); 

// Import Routes
const authRoutes = require('./src/Routes/authRoutes');
const newsRoutes = require('./src/Routes/NewsRoutes');
const articleRoutes = require('./src/Routes/ArticleRoutes');
const categoryRoutes = require('./src/Routes/CategoryTagRoutes');
const cityRoutes = require('./src/Routes/CityRoutes');
const commentRoutes = require('./src/Routes/CommentRoutes');
const adRoutes = require('./src/Routes/AdRoutes');
const adminRoutes = require('./src/Routes/AdminRoutes');
const userRoutes = require('./src/Routes/UserRoutes');
const statsRoutes = require('./src/Routes/statsRoutes');
const uploadRoutes = require('./src/Routes/UploadRoutes');
const notificationRoutes = require('./src/Routes/NotificationRoutes');


// DB Connect karein
connectDB(); 

const app = express();

// ✅ 1. Middlewares
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5177',
  'http://localhost:3000'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// ✅ 2. API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/news', newsRoutes);
app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/cities', cityRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/ads', adRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/stats', statsRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/notifications', notificationRoutes);


// ✅ Serve Static Files (For Uploads)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// ✅ 3. 404 Handler
app.use((req, res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} on this server!`);
  error.statusCode = 404;
  next(error);
});

// ✅ 4. GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errors: err.data || null,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// ✅ 5. Server Startup
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`🚀 SERVER RUNNING ON PORT: ${PORT}`);
});