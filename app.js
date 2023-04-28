const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log("listening in port", port);
});
