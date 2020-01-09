const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const branchSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      autopopulate: true
    }
  ]
});

module.exports = mongoose.model("Branch", branchSchema.plugin(autopopulate));
