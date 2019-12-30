const Category = require("../models/Category");
const Service = require("../models/Service");

const categoryResolvers = require("./category");
const serviceResolvers = require("./service");
const adminResolvers = require("./admin");

module.exports = {
  // Roots
  Query: {
    ...adminResolvers.Query,
    ...categoryResolvers.Query,
    ...serviceResolvers.Query
  },
  Mutation: {
    ...adminResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...serviceResolvers.Mutation
  },
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
