const factory = require("../utils/handleFactory");

const Category = require("../models/Category.model");

exports.getAllCategory = factory.getAll(Category);
exports.getCategory = factory.getOne(Category);
exports.createCategory = factory.createOne(Category);
exports.updateCategory = factory.updateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);
