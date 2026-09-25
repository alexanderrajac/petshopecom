import { useState } from "react";
import { Form, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../slices/cartSlice";
import { FiCheckCircle, FiEdit2 } from "react-icons/fi";
import { SiGooglepay } from "react-icons/si";

const OrderPayment = () => {
  const currentPaymentMethod = useSelector(
    (state) => state.cart?.paymentMethod || "Google Pay / UPI"
  );
  const [paymentMethod, setPaymentMethod] = useState(currentPaymentMethod);
  const [isSaved, setIsSaved] = useState(true);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    setIsSaved(true);
  };

  const getMethodBadge = (method) => {
    if (method.includes("UPI") || method.includes("Google Pay")) {
      return (
        <span className="d-inline-flex align-items-center gap-1 fw-bold text-success">
          <SiGooglepay className="fs-4 text-primary" /> Google Pay / UPI (8248651695@ybl)
        </span>
      );
    }
    return method;
  };

  return (
    <>
      {isSaved ? (
        <div className="p-3 bg-light rounded-3 border">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex align-items-center gap-2">
              <FiCheckCircle className="text-success fs-5" />
              <span className="fw-bold text-dark">Selected Payment Method:</span>
            </div>
            <Button
              variant="outline-primary"
              size="sm"
              className="rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1"
              onClick={() => setIsSaved(false)}
            >
              <FiEdit2 size={12} />
              <span>Change</span>
            </Button>
          </div>

          <div className="mt-1 ps-4">
            <div className="fs-6 fw-bold mb-1">{getMethodBadge(paymentMethod)}</div>
            {paymentMethod.includes("Google Pay") && (
              <div className="text-muted small">
                ⚡ Direct UPI payment to <strong>8248651695@ybl</strong> with QR scan & instant order confirmation.
              </div>
            )}
            {paymentMethod === "Cash on Delivery" && (
              <div className="text-muted small">
                💵 Pay in cash to the delivery executive when your pet care package arrives.
              </div>
            )}
            {paymentMethod === "PayPal" && (
              <div className="text-muted small">
                💳 Secure checkout via PayPal balance or debit/credit card.
              </div>
            )}
          </div>
        </div>
      ) : (
        <Form onSubmit={submitHandler} className="p-3 bg-light rounded-3 border">
          <h6 className="fw-bold mb-3 text-dark">Select Payment Method:</h6>

          <div
            className={`p-3 rounded-3 mb-2 border cursor-pointer ${
              paymentMethod === "Google Pay / UPI"
                ? "border-success bg-white shadow-sm"
                : "bg-white"
            }`}
            onClick={() => setPaymentMethod("Google Pay / UPI")}
            style={{ cursor: "pointer" }}
          >
            <Form.Check
              type="radio"
              id="GooglePayUPI"
              name="paymentMethod"
              value="Google Pay / UPI"
              checked={paymentMethod === "Google Pay / UPI"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              label={
                <div className="d-flex align-items-center justify-content-between w-100 ps-2">
                  <div className="d-flex align-items-center gap-2">
                    <SiGooglepay className="fs-3 text-primary" />
                    <div>
                      <strong className="d-block text-dark">Google Pay / UPI</strong>
                      <span className="text-muted xx-small">
                        Pay to UPI ID: <strong>8248651695@ybl</strong> via GPay, PhonePe, Paytm or BHIM
                      </span>
                    </div>
                  </div>
                  <Badge bg="success" className="rounded-pill px-2 py-1 ms-2">
                    RECOMMENDED
                  </Badge>
                </div>
              }
            />
          </div>

          <div
            className={`p-3 rounded-3 mb-2 border cursor-pointer ${
              paymentMethod === "Cash on Delivery"
                ? "border-primary bg-white shadow-sm"
                : "bg-white"
            }`}
            onClick={() => setPaymentMethod("Cash on Delivery")}
            style={{ cursor: "pointer" }}
          >
            <Form.Check
              type="radio"
              id="COD"
              name="paymentMethod"
              value="Cash on Delivery"
              checked={paymentMethod === "Cash on Delivery"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              label={
                <div className="ps-2">
                  <strong className="d-block text-dark">Cash on Delivery (COD)</strong>
                  <span className="text-muted xx-small">Pay in cash or UPI at delivery doorstep</span>
                </div>
              }
            />
          </div>

          <div
            className={`p-3 rounded-3 mb-3 border cursor-pointer ${
              paymentMethod === "PayPal"
                ? "border-primary bg-white shadow-sm"
                : "bg-white"
            }`}
            onClick={() => setPaymentMethod("PayPal")}
            style={{ cursor: "pointer" }}
          >
            <Form.Check
              type="radio"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              label={
                <div className="ps-2">
                  <strong className="d-block text-dark">PayPal / Credit Card</strong>
                  <span className="text-muted xx-small">International payment via PayPal</span>
                </div>
              }
            />
          </div>

          <div className="d-flex justify-content-end">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="rounded-pill px-4"
            >
              Save Payment Method
            </Button>
          </div>
        </Form>
      )}
    </>
  );
};

export default OrderPayment;
