const categoryResolvers = require("./category");
const serviceResolvers = require("./service");
const adminResolvers = require("./admin");
const employeeResolvers = require("./employee");
const userResolvers = require("./user");
const scheduleResolvers = require("./schedule");
const appointmentResolvers = require("./appointment");

module.exports = {
  // Roots
  Query: {
    ...adminResolvers.Query,
    ...categoryResolvers.Query,
    ...serviceResolvers.Query,
    ...employeeResolvers.Query,
    ...appointmentResolvers.Query
  },
  Mutation: {
    ...adminResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...serviceResolvers.Mutation,
    ...employeeResolvers.Mutation,
    ...userResolvers.Mutation,
    ...scheduleResolvers.Mutation,
    ...appointmentResolvers.Mutation
  }
};
