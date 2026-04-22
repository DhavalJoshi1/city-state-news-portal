# City State News Portal Backend

A comprehensive, production-ready backend API for a city and state news portal built with Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication & Authorization** - JWT-based auth with role-based access control
- **News & Articles Management** - Full CRUD operations with advanced filtering
- **Comments System** - Nested comments with likes and moderation
- **File Upload** - Image and video upload with validation
- **Categories & Tags** - Organize content with categories and tags
- **Cities & Locations** - Location-based news filtering
- **Admin Dashboard** - Comprehensive admin features
- **Rate Limiting** - Protection against abuse
- **Security** - Helmet, CORS, input validation
- **Logging** - Morgan-based request logging
- **Error Handling** - Centralized error management
- **API Documentation** - RESTful API with versioning

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer
- **Logging**: Morgan
- **Password Hashing**: bcryptjs

## 📋 Prerequisites

- Node.js >= 14.0.0
- MongoDB >= 4.0
- npm >= 6.0.0

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd city-state-news-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the application**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## ⚙️ Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | development |
| `PORT` | Server port | 3000 |
| `MONGO_URI` | MongoDB connection string | mongodb://localhost:27017/city_state_news |
| `JWT_SECRET` | JWT signing secret | (required) |
| `JWT_EXPIRES_IN` | JWT expiration time | 7d |
| `FRONTEND_URL` | Frontend application URL | http://localhost:3000 |
| `RATE_LIMIT_WINDOW` | Rate limit window (minutes) | 15 |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### News Endpoints

#### Get News (with filtering)
```http
GET /api/v1/news?page=1&limit=10&category=politics&city=newyork&search=corruption
```

#### Create News
```http
POST /api/v1/news
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Breaking News Title",
  "content": "Full news content...",
  "summary": "Brief summary",
  "category": "category_id",
  "city": "city_id",
  "tags": ["tag1", "tag2"],
  "priority": "high"
}
```

### Articles Endpoints

#### Get Articles
```http
GET /api/v1/articles?page=1&limit=10&author=author_id&status=published
```

#### Create Article
```http
POST /api/v1/articles
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Article Title",
  "content": "Full article content...",
  "category": "category_id",
  "city": "city_id"
}
```

### Comments Endpoints

#### Get Comments for News
```http
GET /api/v1/comments/news/:newsId
```

#### Create Comment
```http
POST /api/v1/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "This is a comment",
  "contentId": "news_or_article_id",
  "contentType": "news"
}
```

## 🔐 User Roles

- **User**: Can read content, create comments, like content
- **Editor**: Can create/edit news and articles, moderate comments
- **Admin**: Full access including user management, system settings

## 📁 Project Structure

```
src/
├── Controllers/          # Request handlers
│   ├── AuthController.js
│   ├── NewsController.js
│   ├── ArticleController.js
│   └── ...
├── Models/              # Database models
│   ├── User.js
│   ├── News.js
│   ├── Article.js
│   └── ...
├── Routes/              # API routes
│   ├── AuthRoutes.js
│   ├── NewsRoutes.js
│   └── ...
├── Middleware/          # Custom middleware
│   ├── AuthMiddleware.js
│   ├── ErrorHandler.js
│   └── ...
├── Utils/               # Utility functions
│   ├── ResponseHandler.js
│   ├── Dbconnect.js
│   └── ...
└── Uploads/             # File uploads
    ├── Images/
    └── Videos/
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📏 Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## 🚀 Deployment

### Using Docker

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Using PM2

```bash
npm install -g pm2
pm2 start app.js --name "city-state-news-api"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@citystatenews.com or create an issue in the repository.

## 🔄 API Versioning

The API uses versioning in the URL path:
- `/api/v1/` - Current stable version

## 🔍 Monitoring

The application includes:
- Request logging with Morgan
- Error tracking and reporting
- Health check endpoint at `/health`
- Rate limiting monitoring

## 🛡️ Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- Input validation and sanitization
- CORS configuration
- Helmet security headers
- SQL injection prevention (MongoDB)
- XSS protection