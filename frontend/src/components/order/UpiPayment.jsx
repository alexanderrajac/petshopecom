import { useState } from "react";
import { Button, Form, Card, Spinner } from "react-bootstrap";
import { usePayOrderMutation } from "../../slices/ordersApiSlice";
import { toast } from "react-toastify";
import { FiCopy, FiCheck, FiExternalLink, FiSmartphone, FiShield } from "react-icons/fi";
import { SiGooglepay } from "react-icons/si";

const UPI_ID = "8248651695@ybl";
const MERCHANT_NAME = "PetShop";

const UpiPayment = ({ order, onPaid }) => {
  const [transactionId, setTransactionId] = useState("");
  const [copied, setCopied] = useState(false);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const orderAmount = Number(order.totalPrice).toFixed(2);
  const upiIntentUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(
    MERCHANT_NAME
  )}&am=${orderAmount}&cu=INR&tn=${encodeURIComponent(`Order_${order._id}`)}`;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    upiIntentUrl
  )}&margin=8`;

  const copyUpiIdHandler = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    toast.success("UPI ID copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const confirmPaymentHandler = async (e) => {
    if (e) e.preventDefault();
    try {
      await payOrder({
        orderId: order._id,
        details: {
          id: transactionId.trim() || `UPI-${Date.now()}`,
          transactionId: transactionId.trim() || `UPI-${Date.now()}`,
          upiId: UPI_ID,
          status: "COMPLETED",
          update_time: new Date().toISOString(),
          email_address: order.user?.email || "",
        },
      }).unwrap();

      toast.success("Payment recorded successfully!");
      if (onPaid) {
        onPaid();
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err?.error || "Failed to confirm payment");
    }
  };

  return (
    <Card className="border-0 bg-light p-3 rounded-4 shadow-sm mt-3">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
        <div className="d-flex align-items-center gap-2">
          <div className="p-2 bg-white rounded-3 shadow-xs border">
            <SiGooglepay className="fs-3 text-primary" />
          </div>
          <div>
            <h6 className="fw-bold mb-0 text-dark">Google Pay & UPI Payment</h6>
            <span className="xx-small text-muted">Scan QR or enter UPI ID to pay instantly</span>
          </div>
        </div>
        <div className="text-end">
          <span className="xx-small text-muted d-block">Amount Due</span>
          <span className="fs-5 fw-extrabold text-success">₹{orderAmount}</span>
        </div>
      </div>

      {/* QR Code and Instructions */}
      <div className="text-center py-2">
        <div className="d-inline-block p-2 bg-white rounded-4 shadow-sm border mb-3">
          <img
            src={qrCodeUrl}
            alt="UPI QR Code"
            width={180}
            height={180}
            className="img-fluid rounded-3"
          />
          <div className="xx-small text-muted mt-1 fw-bold">
            Scan with GPay / PhonePe / Paytm
          </div>
        </div>

        {/* UPI ID Box with 1-click Copy */}
        <div className="bg-white p-2 px-3 rounded-pill border d-inline-flex align-items-center justify-content-between gap-3 mb-3 shadow-xs">
          <span className="small text-muted">
            UPI ID: <strong className="text-dark font-monospace">{UPI_ID}</strong>
          </span>
          <Button
            variant={copied ? "success" : "outline-primary"}
            size="sm"
            className="rounded-pill px-3 py-1 xx-small fw-bold d-inline-flex align-items-center gap-1"
            onClick={copyUpiIdHandler}
          >
            {copied ? (
              <>
                <FiCheck /> Copied
              </>
            ) : (
              <>
                <FiCopy /> Copy
              </>
            )}
          </Button>
        </div>

        {/* Mobile Deep Link */}
        <div className="mb-3 d-md-none">
          <a
            href={upiIntentUrl}
            className="btn btn-primary w-100 rounded-pill py-2 fw-bold d-inline-flex align-items-center justify-content-center gap-2"
          >
            <FiSmartphone />
            <span>Pay ₹{orderAmount} via GPay / UPI App</span>
            <FiExternalLink />
          </a>
        </div>
      </div>

      {/* Payment Confirmation Form */}
      <div className="bg-white p-3 rounded-3 border">
        <h6 className="fw-bold small text-dark mb-2">Step 2: Confirm Payment</h6>
        <p className="xx-small text-muted mb-3">
          Once you complete the transfer on Google Pay or your UPI app, paste the 12-digit UPI Reference / UTR Number below to verify.
        </p>

        <Form onSubmit={confirmPaymentHandler}>
          <Form.Group className="mb-3">
            <Form.Label className="xx-small fw-bold text-secondary">
              UPI Reference / UTR Number (Optional)
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. 423589123456 or GPay Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="rounded-3 shadow-none border small"
            />
          </Form.Group>

          <Button
            type="submit"
            variant="success"
            className="w-100 rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
            disabled={loadingPay}
          >
            {loadingPay ? (
              <>
                <Spinner size="sm" animation="border" />
                <span>Verifying Payment...</span>
              </>
            ) : (
              <>
                <FiCheck />
                <span>I Have Paid ₹{orderAmount} via GPay</span>
              </>
            )}
          </Button>
        </Form>
      </div>

      {/* Security Note */}
      <div className="d-flex align-items-center justify-content-center gap-2 text-muted xx-small mt-3">
        <FiShield className="text-success fs-6" />
        <span>Instant UPI verification • 100% Encrypted & Safe</span>
      </div>
    </Card>
  );
};

export default UpiPayment;
