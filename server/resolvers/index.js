const Category = require("../models/Category");
const Service = require("../models/Service");
const Employee = require("../models/Employee");

const categoryResolvers = require("./category");
const serviceResolvers = require("./service");
const adminResolvers = require("./admin");
const employeeResolver = require("./employee");

module.exports = {
  // Roots
  Query: {
    ...adminResolvers.Query,
    ...categoryResolvers.Query,
    ...serviceResolvers.Query,
    ...employeeResolver.Query
  },
  Mutation: {
    ...adminResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...serviceResolvers.Mutation,
    ...employeeResolver.Mutation
  }
};
