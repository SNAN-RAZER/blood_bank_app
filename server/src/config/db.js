const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

// On successful connection
connection.on("connected", () => {
  console.log("MongoDB successfully connected");
});

// On Error in  connection
connection.on("error", (error) => {
  console.log(`Error in connecting to MongoDB ${error}`);
});
