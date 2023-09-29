const http = require("http");
const dotenv = require("dotenv");
const app = require("./src/app");
dotenv.config();

const db = require("./src/config/db");

const PORT = process.env.PORT || 5002;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
