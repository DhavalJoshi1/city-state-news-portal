/**
 * @desc    Wraps async functions to eliminate the need for try-catch blocks
 */
module.exports = (fn) => {
  return (req, res, next) => {
    // Agar function mein error aati hai, toh .catch(next) use automatically
    // global error handler middleware (middleware/error-handler.js) par bhej deta hai.
    fn(req, res, next).catch(next);
  };
};