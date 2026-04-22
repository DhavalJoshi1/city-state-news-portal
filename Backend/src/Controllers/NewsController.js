const News = require('../Models/News');
const User = require('../Models/User');
const ResponseHandler = require('../Utils/ResponseHandler');

// 1. Get All News (With Filters)
exports.getNews = async (req, res, next) => {
    try {
        let filter = { status: 'published' }; // Default only show published
        
        // 1. Search Logic
        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            filter.$or = [
                { title: { $regex: searchRegex } },
                { content: { $regex: searchRegex } }
            ];
        }

        // 2. Category Filter
        if (req.query.category) {
            const Category = require('../Models/Category');
            const cat = await Category.findOne({ slug: req.query.category });
            if (cat) filter.category = cat._id;
        }

        // 3. City Filter
        if (req.query.city) {
            const City = require('../Models/City');
            const cityData = await City.findOne({ slug: req.query.city });
            if (cityData) filter.city = cityData._id;
        }

        // 4. State Filter
        if (req.query.state) {
            const City = require('../Models/City');
            const citiesInState = await City.find({ 
                state: { $regex: new RegExp(`^${req.query.state}$`, 'i') } 
            }).select('_id');
            filter.city = { $in: citiesInState.map(c => c._id) };
        }

        const news = await News.find(filter)
            .populate('category', 'name')
            .populate('city', 'name')
            .populate('createdBy', 'name')
            .sort('-createdAt');
        ResponseHandler.success(res, 'News fetched', { news });
    } catch (error) { next(error); }
};

// 2. Get Single News by Slug
exports.getNewsBySlug = async (req, res, next) => {
    try {
        const news = await News.findOne({ slug: req.params.slug })
            .populate('category', 'name')
            .populate('city', 'name')
            .populate('createdBy', 'name');
        if (!news) return ResponseHandler.notFound(res, 'News not found');
        ResponseHandler.success(res, 'News fetched', { news });
    } catch (error) { next(error); }
};

// 3. Create News
exports.createNews = async (req, res, next) => {
    try {
        const data = { ...req.body, createdBy: req.user.id };
        if (req.file) data.image = req.file.path;
        const news = await News.create(data);
        ResponseHandler.created(res, 'News created', { news });
    } catch (error) { next(error); }
};

// 4. Update News
exports.updateNews = async (req, res, next) => {
    try {
        if (req.file) req.body.image = req.file.path;
        const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
        ResponseHandler.success(res, 'News updated', { news });
    } catch (error) { next(error); }
};

// 5. Delete News
exports.deleteNews = async (req, res, next) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        ResponseHandler.success(res, 'News deleted');
    } catch (error) { next(error); }
};

// 6. Admin All News List
exports.getAllNewsForAdmin = async (req, res, next) => {
    try {
        const news = await News.find()
            .populate('category', 'name')
            .populate('city', 'name')
            .populate('createdBy', 'name')
            .sort('-createdAt');
        ResponseHandler.success(res, 'All news fetched for admin', { news });
    } catch (error) { next(error); }
};

// 6b. Get Reporter's Own News
exports.getMyNews = async (req, res, next) => {
    try {
        const news = await News.find({ createdBy: req.user.id })
            .populate('category', 'name')
            .populate('city', 'name')
            .sort('-createdAt');
        ResponseHandler.success(res, 'Your news fetched', { news });
    } catch (error) { next(error); }
};

// 7. Admin Stats
exports.getAdminStats = async (req, res, next) => {
    try {
        const stats = await News.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]);
        const userCount = await User.countDocuments();
        ResponseHandler.success(res, 'Stats fetched', { newsStats: stats, totalUsers: userCount });
    } catch (error) { next(error); }
};

// 7. Update Status
exports.updateNewsStatus = async (req, res, next) => {
    try {
        const news = await News.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        ResponseHandler.success(res, 'Status updated', { news });
    } catch (error) { next(error); }
};