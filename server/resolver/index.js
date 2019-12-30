const Category = require("../models/Category");
const Service = require("../models/Service");
const Query = require("./queries/query");
const Mutation = require("./mutations/mutation");

module.exports = {
  // Roots
  Query,
  Mutation,
  //   Relations
  Category: {
    services: (category, _) => {
      return Service.find({ categoryId: category.id });
    }
  },
  Service: {
    category: (category, _) => {
      return Category.findById(category.categoryId);
    }
  }
};
