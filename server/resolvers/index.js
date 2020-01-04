const categoryResolvers = require("./category");
const serviceResolvers = require("./service");
const adminResolvers = require("./admin");
const employeeResolvers = require("./employee");
const userResolvers = require("./user");
const scheduleResolvers = require("./schedule");

const Employee = require("../models/Employee");

module.exports = {
  // Roots
  Query: {
    ...adminResolvers.Query,
    ...categoryResolvers.Query,
    ...serviceResolvers.Query,
    ...employeeResolvers.Query
  },
  Mutation: {
    ...adminResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...serviceResolvers.Mutation,
    ...employeeResolvers.Mutation,
    ...userResolvers.Mutation
    // ...scheduleResolvers.Mutation
  }
  // Schedule: {
  //   dates: async (schedule, _) => {
  //     const sched = await Employee.find({ schedule });

  //     return sched;
  //   }
  // },
  // Date: {
  //   date: async (_, date ) => {
  //     const fetchDate = await Employee.aggregate();

  //     return fetchDate;
  //   }
  // }
};
