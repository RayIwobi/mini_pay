import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaymentPage from "./components/PaymentPage"
import PaymentSuccess from "./components/PaymentSuccess";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PaymentPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
