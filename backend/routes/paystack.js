// routes/paystack.js
const express = require("express");
const axios = require("axios");

const router = express.Router();

// Safe function to get GBP → NGN rate
async function getLiveGBPtoNGN() {
  try {
    // Replace with your API URL
    const res = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.exchange_api}/latest/GBP`
    );

    // ExchangeRate-API returns the rates object under res.data.conversion_rates
    const rate = res.data?.conversion_rates?.NGN;

    if (!rate) throw new Error("NGN rate not available");

    return rate;

  } catch (err) {
    console.error("Failed to fetch GBP → NGN rate:", err.message);

    // fallback rate for testing
    return 1838.91; // £1 → ₦1050
  }
}


router.post("/create-payment", async (req, res) => {
  try {
    const { email, amountGBP } = req.body;

    // 1. Convert GBP → NGN
    const rate = await getLiveGBPtoNGN();
    const amountNGN = Math.ceil(amountGBP * rate); // round up

    // 2. Initialize Paystack transaction with metadata
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: email,
        amount: amountNGN * 100, // kobo
        currency: "NGN",
        callback_url: "http://localhost:5174/payment-success",
        metadata: {
          original_currency: "GBP",
          original_amount: amountGBP,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    // 3. Send Paystack checkout URL to frontend
    res.json({ url: response.data.data.authorization_url });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Payment initialization failed" });
  }
});

module.exports = router;
