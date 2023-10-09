const express = require("express");
const {
  registerUser,
  loginUser,
  getUserData,
} = require("../../controllers/userController/userController");
const authMiddleWare = require("../../config/auth");
const userRouter = express.Router();

// Register a user
userRouter.post("/register-user", registerUser);

// Login a user
userRouter.post("/login-user", loginUser);

// get user Data
userRouter.get("/get-user-data", authMiddleWare, getUserData);

module.exports = userRouter;
