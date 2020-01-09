const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      autopopulate: true
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
      autopopulate: true
    },
    aesthetician: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      autopopulate: true
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    duration: Number,
    message: String,
    status: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Appointment",
  appointmentSchema.plugin(autopopulate)
);
