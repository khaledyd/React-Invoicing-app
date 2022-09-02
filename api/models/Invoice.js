const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    price: {
      type: String,
      required: true,
    },
    descount: {
      type: String,
      required: true,
    },
    numberofitems: {
      type: String,
      required: true,
    },
    customername: {
      type: String,
      required: true,
    },
    servicetype: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", PostSchema);
