const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
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
  schedule: [
    {
      Date: {
        type: String,
        Time: [
          {
            Slot: [String],
            Break: [String]
          }
        ]
      }
    }
  ],
  credentials: [
    {
      name: String,
      photo: String
    }
  ]
});

module.exports = mongoose.model("Employee", employeeSchema);
