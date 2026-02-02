const express = require("express");
const cors = require("cors");

const app = express();

const productRoutes = require("./routes/productRoute");
const authRoutes = require("./routes/authRoute");
const orderRoutes = require("./routes/orderRoute");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = app;
