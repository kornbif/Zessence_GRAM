const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    empId: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    contact: String,
    email: {
      type: String,
      required: true,
      unique: true
    },
    photo: String,
    role: String,
    schedule: [
      {
        date: String,
        start: [String],
        break: [String]
      }
    ],
    certificates: [
      {
        name: String,
        photo: String
      }
    ],
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
        autopopulate: true
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Employee",
  employeeSchema.plugin(autopopulate)
);
