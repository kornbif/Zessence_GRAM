const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      autopopulate: true
    },
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      autopopulate: true
    },
    aesthetician: {
      type: Schema.Types.ObjectId,
      required: true,
      autopopulate: true
    },
    date: {
      type: Date,
      required: true
    },
    time: [
      {
        type: String,
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Appointment",
  appointmentSchema.plugin(autopopulate)
);
