const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    autopopulate: true
  },
  schedDates: [
    {
      date: Date,
      times: [
        {
          start: [String],
          break: [String]
        }
      ]
    }
  ]
});

module.exports = mongoose.model(
  "Schedule",
  scheduleSchema.plugin(autopopulate)
);
