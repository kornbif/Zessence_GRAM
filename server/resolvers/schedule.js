const Schedule = require("../models/Schedule");
const Employee = require("../models/Employee");

module.exports = {
  Query: {},
  Mutation: {
    createSchedule: async (_, { employeeId }) => {
      try {
        const employee = await Employee.findById(employeeId);
        const existingEmployee = await Schedule.findOne({
          employeeId: employee
        });
        if (existingEmployee) {
          throw new Error("Employee have a schedule");
        }

        const newSchedule = new Schedule({
          employeeId
        });

        const result = await newSchedule.save();

        await Employee.updateOne(
          { _id: employeeId },
          { schedule: newSchedule }
        );

        return result;
      } catch (err) {
        throw err;
      }
    }
  }
};
