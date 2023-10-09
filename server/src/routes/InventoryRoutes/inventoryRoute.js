const express = require("express");
const authMiddleWare = require("../../config/auth");
const {
  addInventory,
  getInventory,
} = require("../../controllers/inventoryController/inventoryController");
const inventoryRouter = express.Router();

inventoryRouter.post("/add-inventory", authMiddleWare, addInventory);
inventoryRouter.get("/get-inventory", authMiddleWare, getInventory);
module.exports = inventoryRouter;
