const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const paystackRoute = require("./routes/paystack.js");

const app = express();

// Fix: remove trailing slash
app.use(cors({
  origin: 'https://mini-pay2.vercel.app',
  credentials: true,
}));

app.use(express.json());
app.use("/api/paystack", paystackRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});