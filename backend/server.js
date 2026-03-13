const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const paystackRoute = require("./routes/paystack.js");


const app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json());

app.use("/api/paystack", paystackRoute);

app.listen(process.env.PORT, () => {
  console.log("Server running");
});