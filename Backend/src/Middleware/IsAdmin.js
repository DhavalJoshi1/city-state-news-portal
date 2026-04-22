/**
 * @desc    Admin Access Middleware
 * @logic   Ye middleware tabhi kaam karta hai jab iske pehle 'protect' middleware call hua ho (kyunki req.user wahan se milta hai).
 */
const isAdmin = (req, res, next) => {
  try {
    // 1. Check if user object exists (Auth protection check)
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Session expired ya user data missing hai. Please login karein."
      });
    }

    // 2. Check Role (Sirf 'admin' allowed hai)
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: `Aapke paas ${req.user.role} permissions hain, lekin ye resource sirf Admin ke liye hai.`
      });
    }

    // 3. Admin verified -> Proceed
    next();

  } catch (error) {
    // Controller tak pahunchne se pehle koi unexpected crash ho toh
    res.status(500).json({
      success: false,
      message: "Internal Server Error in Admin Authorization"
    });
  }
};

module.exports = isAdmin;