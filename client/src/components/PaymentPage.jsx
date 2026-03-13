import axios from "axios"
import { useState } from "react"

export default function PaymentPage() {
  const [amountGBP, setAmountGBP] = useState(10)

  const pay = async () => {
    try {
      const res = await axios.post(
        "https://mini-pay-1.onrender.com/api/paystack/create-payment",
        { email: "customer@email.com", amountGBP }
      )

      window.location.href = res.data.url
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Pay £{amountGBP}</h1>
      <p style={{color: "gray"}}>Equivalent to ₦15,000 (that is if you were paying £10)</p>
      <input
        type="number"
        value={amountGBP}
        onChange={(e) => setAmountGBP(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", marginRight: "10px" }}
      />
      <button
        onClick={pay}
        style={{
          padding: "12px 30px",
          fontSize: "16px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Pay with Paystack
      </button>
    </div>
  )
}