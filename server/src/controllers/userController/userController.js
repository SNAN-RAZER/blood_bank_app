const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const inventoryModel = require("../../models/inventoryModel");
dotenv.config();

// Register a user
const registerUser = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const user = new userModel({
        ...req.body,
        password: hashedPassword,
      });
      await user.save();
      return res.status(201).send({
        success: true,
        message: "User successfully registered",
      });
    } else {
      throw Error("User already exists, Login Please");
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

// Login a user
const loginUser = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    const user = await userModel.findOne({ email, userType });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        const token = await jwt.sign(
          { userId: user._id },
          process.env.SECRET_KEY,
          {
            expiresIn: "365d",
          }
        );

        return res.status(200).send({
          success: true,
          message: "User found successfully",
          data: token,
        });
      } else {
        return res.status(401).send({
          success: false,
          message: `Wrong password!`,
        });
      }
    } else {
      return res.status(404).send({
        success: false,
        message: `User doesn't exists`,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

// Get user Data
const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      throw Error("user don't exists");
    } else {
      return res.status(200).send({
        success: true,
        message: "User data successfully fetched",
        data: {
          ...user._doc,
          password: "",
        },
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

// Get all unique donors
const getAllDonorsData = async (req, res) => {
  try {
    const organization = new mongoose.Types.ObjectId(req.body.userId);
    const uniqueDonorIds = await inventoryModel.distinct("donor", {
      organization,
    });

    const donars = await userModel.find({
      _id: { $in: uniqueDonorIds },
    });

    return res.send({
      success: true,
      message: "Donars fetched successfully",
      data: donars,
    });
  } catch (error) {
    return res.status(500).send({
      success: true,
      message: `Error ${error.message}`,
    });
  }
};

// Get all unique donors
const getAllHospitalsData = async (req, res) => {
  try {
    const organization = new mongoose.Types.ObjectId(req.body.userId);
    const uniqueHospitalsIds = await inventoryModel.distinct("hospital", {
      organization,
    });

    const hospitals = await userModel.find({
      _id: { $in: uniqueHospitalsIds },
    });

    return res.send({
      success: true,
      message: "Hospitals fetched successfully",
      data: hospitals,
    });
  } catch (error) {
    return res.status(500).send({
      success: true,
      message: `Error ${error.message}`,
    });
  }
};

// Get add unique organizations for a donor
const getAllOrganizationsForADonor = async (req, res) => {
  try {
    const donor = new mongoose.Types.ObjectId(req.body.userId);
    const uniqueOrganizationIds = await inventoryModel.distinct(
      "organization",
      {
        donor,
      }
    );

    const hospitals = await userModel.find({
      _id: { $in: uniqueOrganizationIds },
    });

    return res.send({
      success: true,
      message: "Organizations fetched successfully",
      data: hospitals,
    });
  } catch (error) {
    return res.status(500).send({
      success: true,
      message: `Error ${error.message}`,
    });
  }
};
module.exports = {
  registerUser,
  loginUser,
  getUserData,
  getAllDonorsData,
  getAllHospitalsData,
  getAllOrganizationsForADonor,
};
