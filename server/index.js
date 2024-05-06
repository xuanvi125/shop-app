const mongoose = require("mongoose");
require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.error("ERROR uncaught !! app is shuting down..", err);
  process.exit(1);
});

const app = require("./app");
const DB = process.env.DB_REMOTE.replace("<PASSWORD>", process.env.DB_PASSWORD);
const PORT = process.env.MAIN_PORT || 3000;
mongoose
  .connect(DB)
  .then(() => console.log("database connection successful"))
  .catch((err) => console.log(err));

const server = app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("ERROR !! app is shuting down..", err);
  server.close();
  process.exit(1);
});
