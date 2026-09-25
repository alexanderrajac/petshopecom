import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiArrowRight, FiShield, FiTruck, FiHeart, FiCheckCircle } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const StartupHero = () => {
  return (
    <section className="startup-hero-section py-4 py-lg-5 mb-5 rounded-4 overflow-hidden position-relative">
      <Container>
        <Row className="align-items-center g-4 g-lg-5">
          {/* Left Column: Value Prop */}
          <Col lg={6} className="text-start">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-primary bg-opacity-10 text-primary fw-bold small mb-3 border border-primary border-opacity-25 shadow-sm">
              <span className="live-dot"></span>
              <span>The #1 Modern Pet Ecosystem</span>
            </div>

            <h1 className="hero-headline display-4 fw-extrabold text-dark tracking-tight mb-3">
              Better Food. <br />
              Happy Pets. <br />
              <span className="text-gradient">Zero Compromise.</span>
            </h1>

            <p className="hero-subtext lead text-secondary mb-4 fs-6">
              From vet-crafted freeze-dried raw pet food to certified healthy adoptable puppies,
              enrichment toys, and wellness gear. Give your best friend the lifetime of health
              they deserve.
            </p>

            {/* CTAs */}
            <div className="d-flex flex-wrap gap-3 mb-4">
              <Link to="/products?category=food">
                <Button
                  variant="primary"
                  size="lg"
                  className="rounded-pill px-4 py-3 fw-bold shadow-sm d-flex align-items-center gap-2 hover-scale"
                >
                  <span>Shop Fresh Food</span>
                  <FiArrowRight />
                </Button>
              </Link>
              <Link to="/products?category=pets">
                <Button
                  variant="outline-dark"
                  size="lg"
                  className="rounded-pill px-4 py-3 fw-bold border-2 d-flex align-items-center gap-2 hover-scale"
                >
                  <FiHeart className="text-danger" />
                  <span>Adopt a Pet</span>
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="hero-trust-bar pt-3 border-top d-flex flex-wrap gap-4 align-items-center">
              <div className="d-flex align-items-center gap-2">
                <div className="trust-icon-box bg-success bg-opacity-10 text-success rounded-circle p-2">
                  <FiTruck className="fs-5" />
                </div>
                <div>
                  <div className="fw-bold x-small text-dark">Free 2-Day Delivery</div>
                  <div className="text-muted xx-small">On all orders over $35</div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <div className="trust-icon-box bg-warning bg-opacity-10 text-warning rounded-circle p-2">
                  <FiShield className="fs-5" />
                </div>
                <div>
                  <div className="fw-bold x-small text-dark">100% Vet Approved</div>
                  <div className="text-muted xx-small">Certified recipes & breeds</div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <div className="d-flex text-warning">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="small" />
                  ))}
                </div>
                <div>
                  <div className="fw-bold x-small text-dark">4.9 / 5 Rating</div>
                  <div className="text-muted xx-small">50,000+ Happy Pet Parents</div>
                </div>
              </div>
            </div>
          </Col>

          {/* Right Column: Hero Visual with Startup Badges */}
          <Col lg={6}>
            <div className="hero-visual-card position-relative rounded-4 overflow-hidden shadow-lg border border-light">
              <img
                src="/images/startup_hero.jpg"
                alt="Happy Golden Retriever and Cat at home"
                className="w-100 hero-img object-fit-cover rounded-4"
              />

              {/* Floating Badge 1: Vet Endorsement */}
              <div className="floating-stat-card card-top-right position-absolute top-0 end-0 m-3 p-3 bg-white bg-opacity-95 rounded-3 shadow-lg border border-light">
                <div className="d-flex align-items-center gap-2">
                  <div className="badge-avatar bg-success text-white rounded-circle p-2">
                    <FiCheckCircle className="fs-5" />
                  </div>
                  <div>
                    <div className="fw-bold small text-dark">100% Organic & Non-GMO</div>
                    <div className="text-muted xx-small">Lab tested for nutrition density</div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: Live Adoption */}
              <div className="floating-stat-card card-bottom-left position-absolute bottom-0 start-0 m-3 p-3 bg-white bg-opacity-95 rounded-3 shadow-lg border border-light">
                <div className="d-flex align-items-center gap-2">
                  <span className="fs-3">🐾</span>
                  <div>
                    <div className="fw-bold small text-dark">Certified Healthy Pets</div>
                    <div className="text-muted xx-small">Vaccinated • Microchipped • Vet-checked</div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default StartupHero;
