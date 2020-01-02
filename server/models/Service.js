const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    photo: {
      type: String
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      autopopulate: true
    },
    employees: [
      {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        autopopulate: true
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Service", serviceSchema.plugin(autopopulate));
