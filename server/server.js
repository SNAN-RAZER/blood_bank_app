const http = require("http");
const PORT = 5001;

const app = http.createServer();

app.listen(PORT, () => {
  console.log("Server is running");
});
