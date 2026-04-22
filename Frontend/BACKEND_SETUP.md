# Backend Integration Guide - City State News Portal

## Frontend-Backend Connection Setup

Your frontend is now configured to connect with a backend API. Follow these steps to set up your backend server.

## 📋 Required Backend Endpoints

### 1. Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "user": {
    "id": "user_id",
    "email": "john@example.com",
    "name": "John Doe"
  },
  "token": "jwt_token_here"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer jwt_token_here

Response:
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

### 2. News Endpoints

#### Get All News
```http
GET /api/news

Response:
{
  "data": [
    {
      "_id": "news_id",
      "title": "News Title",
      "description": "News description",
      "category": "Politics",
      "city": "Ahmedabad",
      "image": "image_url",
      "author": "user_id",
      "createdAt": "ISO_DATE"
    }
  ]
}
```

#### Get News by ID
```http
GET /api/news/:id
```

#### Get News by City
```http
GET /api/news/city/:city
```

#### Search News
```http
GET /api/news/search?q=query_string
```

#### Get News by Category
```http
GET /api/news/category/:category
```

#### Create News
```http
POST /api/news
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "title": "News Title",
  "description": "News description",
  "category": "Politics",
  "city": "Ahmedabad",
  "image": "image_url"
}
```

#### Update News
```http
PUT /api/news/:id
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description"
}
```

#### Delete News
```http
DELETE /api/news/:id
Authorization: Bearer jwt_token_here
```

### 3. File Upload Endpoint

#### Upload Image/Video
```http
POST /api/upload
Authorization: Bearer jwt_token_here
Content-Type: multipart/form-data

FormData:
- file: [binary_file_data]
- type: "image" | "video"

Response:
{
  "url": "https://uploaded_file_url",
  "filename": "filename",
  "size": 12345
}
```

## ⚙️ Environment Configuration

Update your `.env` file with your backend URL:

```env
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
```

**Change `localhost:5000` to your actual backend server URL once deployed.**

## 🔐 Authentication Flow

1. **Register**: User creates account → Backend stores user with hashed password → Returns JWT token
2. **Login**: User provides credentials → Backend validates → Returns JWT token
3. **Authenticated Requests**: Frontend sends token in `Authorization: Bearer {token}` header
4. **Token Expiry**: If 401 response, frontend clears token and redirects to `/login`

## 📝 Request/Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": { ... }
}
```

## 🚀 Backend Technology Recommendations

### Node.js + Express
```bash
npm install express cors dotenv bcrypt jsonwebtoken
```

### Database
- **MongoDB** with Mongoose for NoSQL
- **PostgreSQL** for relational data

### File Upload
- **Cloudinary** (recommended)
- **AWS S3**
- **Local storage** (for development)

### Validation
- **Joi** or **express-validator**

### JWT Middleware Example
```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
```

## 🧪 Testing the Connection

1. Start your backend server on `http://localhost:3000`
2. Run frontend: `npm run dev`
3. Test register/login on `/register` and `/login` pages
4. Check browser DevTools → Network tab to verify API calls
5. Check DevTools → Console for any errors

## 📊 Frontend API Interceptors

The frontend automatically:
- ✅ Adds JWT token to all requests
- ✅ Handles 401 errors by redirecting to login
- ✅ Adds proper headers (JSON content-type, etc.)
- ✅ Formats errors with helpful messages

## 🔗 Important Notes

- **CORS**: Backend must allow requests from `http://localhost:5173` (dev) and your deployed domain
- **JWT Secret**: Must be secure and match backend JWT_SECRET
- **Token Storage**: Stored in `localStorage` (consider using httpOnly cookies for production)
- **API Base URL**: Change from `localhost:3000` to your production API URL before deploying

## 📖 Example Backend Structure (Node.js/Express)

```
backend/
├── routes/
│   ├── auth.js
│   └── news.js
├── controllers/
│   ├── authController.js
│   └── newsController.js
├── middleware/
│   └── auth.js
├── models/
│   ├── User.js
│   └── News.js
├── .env
└── server.js
```

---

For questions or issues, check the main [README.md](./README.md) file.
