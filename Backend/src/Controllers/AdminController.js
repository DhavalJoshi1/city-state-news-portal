const User = require("../Models/User");
const News = require("../Models/News");
const Category = require("../Models/Category");
const City = require("../Models/City");
const ResponseHandler = require('../Utils/ResponseHandler');

exports.getDashboard = async (req, res, next) => {
  try {
    // Ek saath saari queries run karne ke liye Promise.all best hai (Performance boost)
    const [
      totalUsers,
      totalNews,
      pendingNews,
      publishedNews,
      totalCategories,
      totalCities,
      recentNews
    ] = await Promise.all([
      User.countDocuments(),
      News.countDocuments(),
      News.countDocuments({ status: 'pending' }),
      News.countDocuments({ status: 'published' }),
      Category.countDocuments(),
      City.countDocuments(),
      News.find().sort({ createdAt: -1 }).limit(5).populate('createdBy', 'name')
    ]);

    // Role-based stats (kitne Admin hain kitne Reporters)
    const reportersCount = await User.countDocuments({ role: 'reporter' });

    ResponseHandler.success(res, 'Dashboard data fetched successfully', {
      stats: {
        users: {
          total: totalUsers,
          reporters: reportersCount
        },
        content: {
          totalNews,
          published: publishedNews,
          pendingApproval: pendingNews
        },
        directory: {
          categories: totalCategories,
          cities: totalCities
        }
      },
      recentActivity: recentNews // Latest 5 news items
    });

  } catch (error) {
    next(error);
  }
};