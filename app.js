const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const app = express();
dotenv.config();
const port = process.env.PORT;

const loginRoute = require("./routes/login_route");
const usersRoutes = require("./routes/users_routes");
const productsRoutes = require("./routes/products_routes");
const ordersRoutes = require("./routes/orders_routes");
const checkoutRoutes = require("./routes/checkout_routes");
const users_controller = require("./controllers/users_controller");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/login", loginRoute);
app.use(users_controller.tokenValidation);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use("/checkout", checkoutRoutes);

app.listen(port, () => {
  console.log("listening in port", port);
});
