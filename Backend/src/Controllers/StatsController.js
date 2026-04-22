const News = require("../Models/News");
const Category = require("../Models/Category");
const City = require("../Models/City");
const User = require("../Models/User");
const ResponseHandler = require('../Utils/ResponseHandler');

/**
 * @desc    Get Admin Dashboard Stats
 */
exports.getDashboardStats = async (req, res, next) => {
  try {
    // 1. Basic counts aur total views aggregation
    const [
      totalNews, 
      totalCategories, 
      totalCities, 
      totalUsers,
      totalViewsData,
      pendingNewsCount
    ] = await Promise.all([
      News.countDocuments(),
      Category.countDocuments(),
      City.countDocuments(),
      User.countDocuments(),
      News.aggregate([{ $group: { _id: null, totalViews: { $sum: "$views" } } }]),
      News.countDocuments({ status: 'pending' }) // Quick check for approval queue
    ]);

    // 2. Status-wise distribution (Logic same rakha hai)
    const statusStats = await News.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    // 3. Category-wise News Count (Optimized Lookup)
    const categoryStats = await News.aggregate([
      { $group: { _id: "$category", newsCount: { $sum: 1 } } },
      { $sort: { newsCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "cat"
        }
      },
      { $unwind: "$cat" },
      { $project: { name: "$cat.name", newsCount: 1 } }
    ]);

    // 4. City-wise Distribution (Taaki pata chale coverage kahan zyada hai)
    const cityStats = await News.aggregate([
      { $group: { _id: "$city", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "cities",
          localField: "_id",
          foreignField: "_id",
          as: "cityInfo"
        }
      },
      { $unwind: "$cityInfo" },
      { $project: { cityName: "$cityInfo.name", count: 1 } }
    ]);

    ResponseHandler.success(res, 'Admin Dashboard Stats fetched', {
      summary: {
        totalNews,
        totalCategories,
        totalCities,
        totalUsers,
        totalViews: totalViewsData[0]?.totalViews || 0,
        pendingApproval: pendingNewsCount
      },
      charts: {
        byStatus: statusStats,
        byCategory: categoryStats,
        byCity: cityStats
      }
    });

  } catch (error) {
    next(error);
  }
};