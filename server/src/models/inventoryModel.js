const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: true,
      enum: ["in", "out"],
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    quantity: {
      type: Number,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization",
      required: true,
    },
    // If inventory type is "out" then hospital will be set
    // If inventory type is "in" then donor will be set

    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: () => (this.inventoryType === "out" ? true : false),
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: () => (this.inventoryType === "in" ? true : false),
    },
  },
  {
    timestamps: true,
  }
);

const inventoryModel = mongoose.model("inventory", inventorySchema);

module.exports = inventoryModel;
