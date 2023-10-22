const express = require("express");
const {
  registerUser,
  loginUser,
  getUserData,
  getAllDonorsData,
  getAllHospitalsData,
  getAllOrganizationsForADonor,
} = require("../../controllers/userController/userController");
const authMiddleWare = require("../../config/auth");
const userRouter = express.Router();

// Register a user
userRouter.post("/register-user", registerUser);

// Login a user
userRouter.post("/login-user", loginUser);

// get user Data
userRouter.get("/get-user-data", authMiddleWare, getUserData);

// get all unique donors
userRouter.get("/get-all-donors", authMiddleWare, getAllDonorsData);

// get all unique donors
userRouter.get("/get-all-hospitals", authMiddleWare, getAllHospitalsData);

// get all organizations for a donor
userRouter.get(
  "/get-all-organizations-for-donor",
  authMiddleWare,
  getAllOrganizationsForADonor
);

module.exports = userRouter;
