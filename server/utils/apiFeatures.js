class APIFeature {
  constructor(query, queryObject) {
    this.query = query;
    this.queryObject = queryObject;
  }

  search() {
    const { search } = this.queryObject;
    if (search) {
      this.query = this.query.find({
        name: { $regex: new RegExp(search), $options: "i" },
      });
    }
    return this;
  }
  filter() {
    const queryObj = { ...this.queryObject };
    const excludeFields = ["page", "limit", "sort", "fields", "search"];
    excludeFields.forEach((el) => delete queryObj[el]);
    const queryString = JSON.stringify(queryObj).replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryString));

    return this;
  }

  sort() {
    if (this.queryObject.sort) {
      const sortBy = this.queryObject.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    }
    return this;
  }

  limit() {
    if (this.queryObject.fields) {
      const limitedFields = this.queryObject.fields.split(",").join(" ");
      this.query = this.query.select(limitedFields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  async paginate() {
    const totalDocs = await this.query.clone().countDocuments();
    const page =
      (this.queryObject.page * 1 <= 0 ? null : this.queryObject.page * 1) || 1;
    const limit = this.queryObject.limit * 1 || 20;
    const skip = (page - 1) * limit;

    this.totalPages = Math.ceil(totalDocs / limit);
    this.page = page;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeature;
