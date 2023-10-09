const cors = require("cors");
const express = require("express");

const userRouter = require("./routes/userRoutes/userRoute");
const inventoryRouter = require("./routes/InventoryRoutes/inventoryRoute");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/v1/api/user", userRouter);
app.use("/v1/api/inventory", inventoryRouter);
module.exports = app;
