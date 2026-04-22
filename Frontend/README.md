# City State News Portal

A modern, responsive news portal built with React 19, Vite, and Tailwind CSS. Features user authentication, news submission with media uploads, search functionality, and category filtering.

## 🚀 Features

- **User Authentication**: Register, login, and profile management
- **News Management**: Create, read, update, and delete news articles
- **Media Upload**: Support for images and videos in news submissions
- **Search & Filter**: Search news by keywords, categories, and cities
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Admin Panel**: Manage users, news, and ads
- **Real-time Updates**: Live news feed and notifications

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API server (optional - works with mock data)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd city-state-news-portal/Frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup

Copy the environment template and configure your settings:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Backend API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000

# Authentication
VITE_JWT_SECRET_KEY=your_jwt_secret_here

# File Upload Configuration
VITE_MAX_FILE_SIZE=5242880
VITE_ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/gif,image/webp

# Other configurations...
```

### 4. Start development server
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
```

## 🔧 Backend Integration

The application is designed to work with a REST API backend. If no backend is available, it automatically falls back to localStorage-based mock data.

### Required Backend Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

#### News
- `GET /api/news` - Get all news
- `GET /api/news/:id` - Get news by ID
- `GET /api/news/city/:city` - Get news by city
- `GET /api/news/search?q=query` - Search news
- `POST /api/news` - Create news
- `PUT /api/news/:id` - Update news
- `DELETE /api/news/:id` - Delete news

#### File Upload
- `POST /api/upload` - Upload files (images/videos)

### Backend Technologies (Suggested)
- **Node.js** with Express.js
- **Database**: MongoDB with Mongoose or PostgreSQL
- **Authentication**: JWT tokens
- **File Storage**: Cloudinary, AWS S3, or local storage
- **Validation**: Joi or express-validator

## 📁 Project Structure

```
src/
├── components/
│   ├── Admin/          # Admin panel components
│   ├── Pages/          # Page components
│   └── ...             # UI components
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── Services/           # API services
└── utils/              # Utility functions
```

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3000/api` |
| `VITE_API_TIMEOUT` | API request timeout (ms) | `10000` |
| `VITE_MAX_FILE_SIZE` | Max file upload size (bytes) | `5242880` |
| `VITE_APP_NAME` | Application name | `City State News Portal` |

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email support@citystatenews.com or create an issue in the repository.
