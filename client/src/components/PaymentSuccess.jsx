import {Link} from "react-router-dom"

export default function PaymentSuccess() {

  return (
    <div style={{textAlign:"center", marginTop:"120px"}}>
      <h1>Payment Successful 🎉</h1>
      <h4>Thank you</h4>
      <Link to="/">Back to homepage</Link>
    </div>
  );

}