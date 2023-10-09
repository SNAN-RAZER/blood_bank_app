const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: true,
      enum: ["donor", "organization", "hospital", "admin"],
    },
    // is required if userType is donor or admin
    name: {
      type: String,
      required: () => {
        if (this.userType === "admin" || this.userType === "donor") {
          return true;
        }
        return false;
      },
    },
    // is required if userType is hospital
    hospitalName: {
      type: String,
      required: () => {
        if (this.userType === "hospital") {
          return true;
        }
        return false;
      },
    },
    // is required if userType is organization
    organizationName: {
      type: String,
      required: () => {
        if (this.userType === "organization") {
          return true;
        }
        return false;
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: () => {
        if (this.userType === "organization" || this.userType === "hospital") {
          return true;
        }
        return false;
      },
    },
    address: {
      type: String,
      required: () => {
        if (this.userType === "organization" || this.userType === "hospital") {
          return true;
        }
        return false;
      },
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
