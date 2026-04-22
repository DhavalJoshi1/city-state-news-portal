/**
 * ✅ Standard API Response Handler
 * @logic Sabhi success aur error responses ko ek hi format mein bhejta hai.
 */
const responseHandler = (res, statusCode, message, data = null, extra = {}) => {
  const success = statusCode >= 200 && statusCode < 300;

  return res.status(statusCode).json({
    success,
    message,
    results: Array.isArray(data) ? data.length : undefined,
    data,
    ...extra,
  });
};

// --- Helper Methods ---

// 200 OK
responseHandler.success = (res, message, data = null, extra = {}) => {
  return responseHandler(res, 200, message, data, extra);
};

// 201 Created
responseHandler.created = (res, message, data = null, extra = {}) => {
  return responseHandler(res, 201, message, data, extra);
};

// 400 Bad Request
responseHandler.badRequest = (res, message = 'Invalid Request') => {
  return responseHandler(res, 400, message);
};

// 401 Unauthorized
responseHandler.unauthorized = (res, message = 'Unauthorized access') => {
  return responseHandler(res, 401, message);
};

// 403 Forbidden
responseHandler.forbidden = (res, message = 'Aapke paas permission nahi hai') => {
  return responseHandler(res, 403, message);
};

// 404 Not Found
responseHandler.notFound = (res, message = 'Resource nahi mila') => {
  return responseHandler(res, 404, message);
};

// 500 Internal Server Error
responseHandler.internalError = (res, message = 'Server error occurred') => {
  return responseHandler(res, 500, message);
};

module.exports = responseHandler;