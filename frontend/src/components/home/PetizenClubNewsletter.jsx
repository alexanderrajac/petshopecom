import { useState } from "react";
import { Card, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { FiMail, FiGift } from "react-icons/fi";
import { toast } from "react-toastify";

const PetizenClubNewsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubscribed(true);
    toast.success("Welcome to the Petizen Club! Check your inbox for $15 voucher.");
  };

  return (
    <Card className="newsletter-club-card border-0 rounded-4 overflow-hidden my-5 shadow-sm bg-primary text-white position-relative">
      <div className="newsletter-decor-circle position-absolute top-0 end-0 opacity-10"></div>

      <Card.Body className="p-4 p-md-5 position-relative z-1">
        <Row className="align-items-center g-4">
          <Col lg={7}>
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-white bg-opacity-20 text-white small fw-bold mb-3">
              <FiGift />
              <span>Join 120,000+ Petizen Club Members</span>
            </div>

            <h2 className="display-6 fw-extrabold text-white mb-2">
              Get $15 Off Your First Order
            </h2>
            <p className="text-white-50 small mb-0" style={{ maxWidth: "540px" }}>
              Plus unlock weekly nutrition tips from certified veterinarians, secret flash sales, and early access to adoptable pet listings.
            </p>
          </Col>

          <Col lg={5}>
            {subscribed ? (
              <div className="bg-white bg-opacity-20 p-4 rounded-4 text-center">
                <div className="display-5 text-warning mb-2">🎉</div>
                <h5 className="fw-bold text-white mb-1">You're on the list!</h5>
                <p className="text-white-50 x-small mb-0">
                  Use coupon code <strong className="text-warning">PETSTARTUP15</strong> at checkout for $15 off orders $40+.
                </p>
              </div>
            ) : (
              <Form onSubmit={handleSubmit}>
                <InputGroup className="shadow-lg rounded-pill overflow-hidden bg-white p-1">
                  <InputGroup.Text className="bg-white border-0 ps-3">
                    <FiMail className="text-muted" />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-0 shadow-none py-2"
                  />
                  <Button
                    type="submit"
                    variant="dark"
                    className="rounded-pill px-4 fw-bold"
                  >
                    Claim $15
                  </Button>
                </InputGroup>
                <div className="text-white-50 xx-small mt-2 ps-3">
                  No spam ever. Unsubscribe anytime with a single click.
                </div>
              </Form>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PetizenClubNewsletter;
