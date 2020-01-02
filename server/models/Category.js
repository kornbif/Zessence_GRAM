const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    photo: {
      type: String
    },
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
  "Category",
  categorySchema.plugin(autopopulate)
);
