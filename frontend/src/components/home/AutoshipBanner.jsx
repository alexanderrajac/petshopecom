import { Card, Row, Col, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiRefreshCw, FiClock, FiPercent, FiArrowRight } from "react-icons/fi";

const AutoshipBanner = () => {
  return (
    <Card className="autoship-banner-card border-0 rounded-4 text-white overflow-hidden my-5 shadow-lg position-relative">
      <div className="autoship-bg-overlay position-absolute top-0 start-0 w-100 h-100"></div>

      <Card.Body className="p-4 p-md-5 position-relative z-1">
        <Row className="align-items-center g-4">
          <Col lg={8}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <Badge bg="warning" text="dark" className="rounded-pill px-3 py-2 fw-bold">
                ⭐ Petizen Repeat & Save
              </Badge>
              <span className="text-white-50 small">Automatic Pet Care</span>
            </div>

            <h2 className="display-6 fw-extrabold text-white mb-3">
              Never Run Out of Food Again. <br />
              <span className="text-warning">Save 15% on Every Autoship.</span>
            </h2>

            <p className="lead text-white-50 fs-6 mb-4" style={{ maxWidth: "620px" }}>
              Set your delivery schedule in 30 seconds. Swap flavors, pause, or cancel anytime with one click.
              Plus get priority access to certified veterinary telehealth support.
            </p>

            <div className="d-flex flex-wrap gap-4 mb-4">
              <div className="d-flex align-items-center gap-2 text-white small">
                <div className="icon-wrap bg-white bg-opacity-20 rounded-circle p-2">
                  <FiPercent className="fs-5 text-warning" />
                </div>
                <span>15% off first order + 5% off recurring</span>
              </div>

              <div className="d-flex align-items-center gap-2 text-white small">
                <div className="icon-wrap bg-white bg-opacity-20 rounded-circle p-2">
                  <FiRefreshCw className="fs-5 text-warning" />
                </div>
                <span>Pause or cancel anytime in 1 click</span>
              </div>

              <div className="d-flex align-items-center gap-2 text-white small">
                <div className="icon-wrap bg-white bg-opacity-20 rounded-circle p-2">
                  <FiClock className="fs-5 text-warning" />
                </div>
                <span>Scheduled exactly when you need it</span>
              </div>
            </div>
          </Col>

          <Col lg={4} className="text-lg-end">
            <Link to="/products?category=food">
              <Button
                variant="warning"
                size="lg"
                className="rounded-pill px-5 py-3 fw-bold text-dark shadow-lg hover-scale d-inline-flex align-items-center gap-2"
              >
                <span>Start Autoship & Save</span>
                <FiArrowRight />
              </Button>
            </Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default AutoshipBanner;
