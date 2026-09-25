import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo-white.png";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import { FiCheckCircle, FiShield, FiTruck, FiPhoneCall } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="startup-footer bg-dark text-white pt-5 pb-4 mt-5">
      {/* Top Value Banner in Footer */}
      <div className="footer-top-strip border-bottom border-secondary border-opacity-25 pb-4 mb-4">
        <Container>
          <Row className="g-3 text-center text-md-start">
            <Col xs={12} sm={6} md={3} className="d-flex align-items-center justify-content-center justify-content-md-start gap-3">
              <FiTruck className="fs-3 text-primary" />
              <div>
                <div className="fw-bold small text-white">Free Fast Delivery</div>
                <div className="text-secondary xx-small">On all orders over ₹499</div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={3} className="d-flex align-items-center justify-content-center justify-content-md-start gap-3">
              <FiShield className="fs-3 text-success" />
              <div>
                <div className="fw-bold small text-white">100% Health Guarantee</div>
                <div className="text-secondary xx-small">Vet-approved food & pets</div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={3} className="d-flex align-items-center justify-content-center justify-content-md-start gap-3">
              <FiPhoneCall className="fs-3 text-info" />
              <div>
                <div className="fw-bold small text-white">24/7 Vet Support</div>
                <div className="text-secondary xx-small">Licensed veterinary nurses</div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={3} className="d-flex align-items-center justify-content-center justify-content-md-start gap-3">
              <FiCheckCircle className="fs-3 text-warning" />
              <div>
                <div className="fw-bold small text-white">Autoship & Save 15%</div>
                <div className="text-secondary xx-small">Pause or cancel anytime</div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="px-4">
        <Row className="g-4 mb-5">
          {/* Brand Info */}
          <Col xs={12} md={4} className="pe-md-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img
                src={logo}
                alt="Petizen multi-pet logo"
                className="rounded-circle shadow-sm border border-light"
                style={{ height: "46px", width: "46px", objectFit: "cover" }}
              />
              <span className="fw-extrabold fs-4 tracking-tight text-white">PETIZEN</span>
            </div>
            <p className="text-secondary small mb-3">
              The modern pet health & adoption startup. We provide human-grade nutrition,
              certified ethical pet rehoming, and durable enrichment products so pets live longer,
              happier lives.
            </p>
            <div className="d-flex gap-3 fs-5 text-secondary">
              <a href="#instagram" className="text-secondary hover-primary" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#facebook" className="text-secondary hover-primary" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#twitter" className="text-secondary hover-primary" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#youtube" className="text-secondary hover-primary" aria-label="YouTube">
                <FaYoutube />
              </a>
              <a href="#pinterest" className="text-secondary hover-primary" aria-label="Pinterest">
                <FaPinterest />
              </a>
            </div>
          </Col>

          {/* Shop Categories */}
          <Col xs={6} md={2}>
            <h6 className="fw-bold text-white text-uppercase tracking-wider small mb-3">
              Shop Supplies
            </h6>
            <ul className="list-unstyled text-secondary small d-flex flex-column gap-2 mb-0">
              <li>
                <Link to="/products?category=food" className="text-secondary text-decoration-none hover-white">
                  🍖 Pet Food & Nutrition
                </Link>
              </li>
              <li>
                <Link to="/products?category=pets" className="text-secondary text-decoration-none hover-white">
                  🐾 Adoptable Pets
                </Link>
              </li>
              <li>
                <Link to="/products?category=treats" className="text-secondary text-decoration-none hover-white">
                  🥓 Treats & Chews
                </Link>
              </li>
              <li>
                <Link to="/products?category=toys" className="text-secondary text-decoration-none hover-white">
                  🎾 Toys & Brain Puzzles
                </Link>
              </li>
              <li>
                <Link to="/products?category=care" className="text-secondary text-decoration-none hover-white">
                  🛁 Grooming & Care
                </Link>
              </li>
              <li>
                <Link to="/products?category=accessories" className="text-secondary text-decoration-none hover-white">
                  🦮 Beds & Gear
                </Link>
              </li>
            </ul>
          </Col>

          {/* Startup Perks & Programs */}
          <Col xs={6} md={3}>
            <h6 className="fw-bold text-white text-uppercase tracking-wider small mb-3">
              Programs & Perks
            </h6>
            <ul className="list-unstyled text-secondary small d-flex flex-column gap-2 mb-0">
              <li>
                <Link to="/products?category=food" className="text-secondary text-decoration-none hover-white">
                  ⭐ Autoship Subscription (15% Off)
                </Link>
              </li>
              <li>
                <Link to="/products?category=pets" className="text-secondary text-decoration-none hover-white">
                  🏡 Pet Rehoming & Adoption
                </Link>
              </li>
              <li>
                <Link to="/sales" className="text-secondary text-decoration-none hover-white">
                  🔥 Weekly Flash Sales
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary text-decoration-none hover-white">
                  🩺 24/7 Vet Advisory Board
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary text-decoration-none hover-white">
                  🌿 Sustainability & Sourcing
                </Link>
              </li>
            </ul>
          </Col>

          {/* Account & Support */}
          <Col xs={12} md={3}>
            <h6 className="fw-bold text-white text-uppercase tracking-wider small mb-3">
              Customer Support
            </h6>
            <div className="text-secondary small d-flex flex-column gap-2">
              <div>
                <strong>Support Hours:</strong> <br />
                Mon – Sun: 24/7 Live Chat & Vet Line
              </div>
              <div>
                <strong>Email:</strong> <br />
                hello@petizen.com
              </div>
              <div className="mt-2">
                <span className="badge bg-secondary text-light px-3 py-2 rounded-pill small">
                  🔒 256-Bit SSL Encrypted Checkout
                </span>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="border-top border-secondary border-opacity-25 pt-4 text-center text-md-start">
          <Col md={6}>
            <p className="text-secondary small mb-0">
              © {currentYear} Petizen, Inc. All rights reserved. Built with love for pets everywhere.
            </p>
          </Col>
          <Col md={6} className="text-md-end mt-2 mt-md-0">
            <span className="text-secondary xx-small">
              Privacy Policy • Terms of Service • Adoption Guidelines • Vet Disclaimer
            </span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
