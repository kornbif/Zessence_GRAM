const Employee = require("../models/Employee");
const Appointment = require("../models/Appointment");
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
    addSchedule: async (
      _,
      {
        employeeId,
        date,
        timeInput: { startTime, timeLength },
        breakTimeInput: { startOfBreak, breakLength }
      },
      context
    ) => {
      Auth(context);
      try {
        const initalTime = await timelineLabels(startTime, timeLength);
        const breakTime = await timelineLabels(startOfBreak, breakLength);

        const finalTime = await initalTime.filter(item => {
          return !breakTime.includes(item);
        });

        const employee = await Employee.findById(employeeId);

        if (employee) {
          const dateExist = await Employee.findOne({
            _id: employeeId,
            schedule: { $elemMatch: { date: date } }
          });

          if (dateExist) {
            throw new UserInputError("Date already exist", {
              dateError: "Date exist"
            });
          }

          await employee.schedule.push({
            date: new Date(date),
            start: finalTime,
            break: breakTime
          });
          await employee.save();

          return employee;
        }
      } catch (err) {
        throw err;
      }
    },
    deleteSchedule: async (_, { employeeId, scheduleId }, context) => {
      Auth(context);
      try {
        const employee = Employee.findById(employeeId);
        await Employee.updateOne(
          { _id: employeeId },
          {
            $pullAll: { schedule: { _id: scheduleId } }
          }
        );
        return employee;
      } catch (err) {
        throw err;
      }
    },
    updateDate: async (_, { employeeId, scheduleId, date }, context) => {
      Auth(context);
      try {
        await Employee.updateOne(
          { _id: employeeId, "schedule._id": scheduleId },
          {
            $set: {
              "schedule.$.date": new Date(date)
            }
          }
        );
        const employee = await Employee.findById(employeeId);
        return employee;
      } catch (err) {}
    },
    updateTime: async (
      _,
      {
        employeeId,
        scheduleId,
        timeInput: { startTime, timeLength },
        breakTimeInput: { startOfBreak, breakLength }
      }
    ) => {
      Auth(context);
      try {
        const initalTime = await timelineLabels(startTime, timeLength);
        const breakTime = await timelineLabels(startOfBreak, breakLength);
        const finalTime = await initalTime.filter(item => {
          return !breakTime.includes(item);
        });
        //WORKING TIME
        await Employee.updateOne(
          { _id: employeeId, "schedule._id": scheduleId },
          {
            $set: {
              "schedule.$.start": finalTime
            }
          }
        );
        //BREAK
        await Employee.updateOne(
          { _id: employeeId, "schedule._id": scheduleId },
          {
            $set: {
              "schedule.$.break": breakTime
            }
          }
        );
        const employee = await Employee.findById(employeeId);
        return employee;
      } catch (err) {
        throw new Error("error");
      }
    }
  }
};
