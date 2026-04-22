const User = require("../Models/User");
const News = require("../Models/News");
const ResponseHandler = require('../Utils/ResponseHandler');

// ✅ 1. Get All Users (With Pagination & Role Filter)
exports.getAllUsers = async (req, res, next) => {
  try {
    const { role, search, page = 1, limit = 20 } = req.query;
    let filter = {};

    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await User.countDocuments(filter);

    ResponseHandler.success(res, 'Users fetched successfully', {
      users,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) { next(error); }
};

// ✅ 2. Update User Role or Status (Admin Only)
exports.updateUserPrivileges = async (req, res, next) => {
  try {
    const { role, isActive } = req.body;
    const { id } = req.params;

    // Khud ka role change karne se rokna (Security)
    if (id === req.user.id) {
      return ResponseHandler.badRequest(res, "You cannot change your own role or status");
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role, isActive },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) return ResponseHandler.notFound(res, "User not found");

    ResponseHandler.success(res, "User updated successfully", user);
  } catch (error) { next(error); }
};

// ✅ 3. Delete User (With News Integrity Check)
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id === req.user.id) {
      return ResponseHandler.badRequest(res, "You cannot delete your own admin account");
    }

    // Check: Kya is reporter ne news post ki hain?
    const hasNews = await News.findOne({ createdBy: id });
    if (hasNews) {
      return ResponseHandler.badRequest(res, "Cannot delete user. This user has posted news. Deactivate them instead.");
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) return ResponseHandler.notFound(res, "User not found");

    ResponseHandler.success(res, "User deleted successfully");
  } catch (error) { next(error); }
};