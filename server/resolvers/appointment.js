const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Service = require("../models/Service");
const Employee = require("../models/Employee");
const Auth = require("../util/check-auth");
const { UserInputError } = require("apollo-server");
const moment = require("moment");

const timelineLabels = (desiredStartTime, timeLength) => {
  // let tlength = timeLength * 60;
  // let inter = interval * 60;
  const periodsInADay = moment.duration(timeLength, "MINUTES").as("MINUTES");

  const timeLabels = [];
  const startTimeMoment = moment(desiredStartTime, "hh:mm A");
  for (let i = 0; i <= periodsInADay; i += 30) {
    startTimeMoment.add(i === 0 ? 0 : 30, "MINUTES");
    timeLabels.push(startTimeMoment.format("hh:mm A"));
  }

  return timeLabels;
};

module.exports = {
  Query: {
    appointments: async () => {
      try {
        const allAppointments = await Appointment.find();

        return allAppointments;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    createAppointment: async (
      _,
      { inputAppointment: { serviceId, employeeId, date, time, message } },
      context
    ) => {
      try {
        const { _id } = Auth(context);

        const user = await User.findById(_id);
        const service = await Service.findById(serviceId);
        const employee = await Employee.findById(employeeId);

        const checkAppointment = await Appointment.findOne({
          user,
          date,
          status: { $ne: "CANCELLED" }
        });
        const errors = {};
        if (checkAppointment) {
          errors.general = "You already set an appointment";
          throw new UserInputError("You already set an appointment", {
            errors
          });
        } else {
          // get the duration of the service
          const duration = await service.duration;
          //create an array of time ["9:00 AM","9:30 AM",...]
          const appointTime = await timelineLabels(time, duration);

          // SAVE NEW APPOINTMENT
          const newAppointment = new Appointment({
            user,
            service,
            aesthetician: employee,
            date,
            time,
            duration,
            message,
            status: "PENDING"
          });
          const result = await newAppointment.save();

          // ADD APPOINTMENT IN THE ARRAY
          await User.updateOne(
            { _id: user },
            { $addToSet: { appointments: newAppointment } }
          );

          //REMOVE TIME SLOT IN EMPLOYEE SCHEDULE
          await Employee.updateOne(
            { _id: employeeId, "schedule.date": date },
            {
              $pullAll: {
                "schedule.$.start": appointTime
              }
            }
          );

          return result;
        }
      } catch (err) {
        throw err;
      }
    },
    cancelAppointment: async (_, { _id }, context) => {
      const user = Auth(context);
      try {
        const appointment = await Appointment.findById(_id);

        // console.log(new Date(appointment.date).toDateString());
        const appointDate = appointment.date;
        const checkdate = moment(appointDate, "MM-DD-YYYY").format(
          "MM-DD-YYYY"
        );
        const now = moment().add(2, "days");
        const nowAdd = now.format("MM-DD-YYYY");

        if (nowAdd < checkdate) {
          await Appointment.updateOne(
            { _id },
            { $set: { status: "CANCELLED" } }
          );
          return appointment;
        } else {
          throw new Error(
            "Can not be cancelled. If you wish to cancel your appointment. Please call our hotline for more info"
          );
        }
      } catch (err) {
        throw err;
      }
    }
  }
};
