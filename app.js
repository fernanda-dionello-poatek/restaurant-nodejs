const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const app = express();
dotenv.config();
const port = process.env.PORT;

const usersRoutes = require("./routes/users_routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRoutes);

app.listen(port, () => {
  console.log("listening in port", port);
});
