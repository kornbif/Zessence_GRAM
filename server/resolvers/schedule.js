const Employee = require("../models/Employee");
const { UserInputError } = require("apollo-server");
const Auth = require("../util/check-auth");
const { validateEmployeeCreateInput } = require("../util/validators");
const moment = require("moment");

const timelineLabels = (
  desiredStartTime,
  timeLength
  // timeTokenString, //"hours"
  // interval
  // period
) => {
  let tlength = timeLength * 60;
  // let inter = interval * 60;
  const periodsInADay = moment.duration(tlength, "MINUTES").as("MINUTES");

  const timeLabels = [];
  const startTimeMoment = moment(desiredStartTime, "hh:mm A");
  for (let i = 0; i <= periodsInADay; i += 30) {
    startTimeMoment.add(i === 0 ? 0 : 30, "MINUTES");
    timeLabels.push(startTimeMoment.format("hh:mm A"));
  }

  return timeLabels;
};

module.exports = {
  Mutation: {
    addDate: async (_, { id, date }, context) => {
      const admin = Auth(context);
      try {
        const employee = await Employee.findById(id);

        if (employee) {
          const dateExist = await Employee.findOne({
            _id: id,
            schedule: { $elemMatch: { date: date } }
          });

          if (dateExist) {
            throw new UserInputError("Date already exist", {
              dateError: "Date exist"
            });
          }

          await employee.schedule.push({
            date: new Date(date).toLocaleDateString()
          });
          await employee.save();
          return employee;
        } else throw new Error("Employee not found");
      } catch (err) {
        throw err;
      }
    },
    addTime: async (
      _,
      {
        _id,
        schedId,
        timeInput: { startTime, timeLength },
        breakTimeInput: { startOfBreak, breakLength }
      },
      context
    ) => {
      const admin = Auth(context);
      try {
        const initalTime = await timelineLabels(startTime, timeLength);
        const breakTime = await timelineLabels(startOfBreak, breakLength);

        const finalTime = await initalTime.filter(item => {
          return !breakTime.includes(item);
        });
        //WORKING TIME
        await Employee.updateOne(
          { _id: _id, "schedule._id": schedId },
          {
            $set: {
              "schedule.$.start": finalTime
            }
          }
        );
        //BREAK
        await Employee.updateOne(
          { _id: _id, "schedule._id": schedId },
          {
            $set: {
              "schedule.$.break": breakTime
            }
          }
        );
        const employee = await Employee.findById(_id);
        return employee;

        // // Using push can cause duplication
        // const schedIndex = employee.schedule.findIndex(
        //   sched => sched.id === schedId
        // );
        // await employee.schedule[schedIndex].start.push("9:30 AM");
        // employee.save();
      } catch (err) {
        throw err;
      }
    }
  }
};
