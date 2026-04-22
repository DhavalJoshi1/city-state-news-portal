/**
 * @desc    Reusable class for Mongoose Query manipulation
 */
class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // 1. Advance Filtering (e.g., category=politics)
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Handle Mongo Operators like: gte, gt, lte, lt (e.g., ?views[gte]=100)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // 2. Sorting (e.g., sort=-createdAt)
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      // Default: Newest News First
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  // 3. Field Limiting (e.g., fields=title,content)
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      // Internal fields ko hide karne ke liye
      this.query = this.query.select('-__v');
    }
    return this;
  }

  // 4. Pagination (e.g., page=2&limit=10)
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;