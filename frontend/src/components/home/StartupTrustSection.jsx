import { Row, Col, Card } from "react-bootstrap";
import { FaStar, FaShieldAlt, FaTruck, FaAward, FaUserMd } from "react-icons/fa";

const StartupTrustSection = () => {
  const trustPillars = [
    {
      icon: <FaAward className="fs-3 text-primary" />,
      title: "Clean Human-Grade Nutrition",
      desc: "Zero fillers, no corn/wheat/soy, and 100% real freeze-dried & organic ingredients.",
    },
    {
      icon: <FaShieldAlt className="fs-3 text-success" />,
      title: "Certified Ethical Adoptions",
      desc: "Every puppy and kitten is vet-inspected, fully vaccinated, and microchipped.",
    },
    {
      icon: <FaTruck className="fs-3 text-warning" />,
      title: "Free Fast Shipping Over $35",
      desc: "Delivered directly to your door in climate-friendly insulated packaging.",
    },
    {
      icon: <FaUserMd className="fs-3 text-info" />,
      title: "24/7 Licensed Vet Support",
      desc: "Free real-time advice from certified veterinary nurses on diet, training, and care.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Jenkins & Barnaby",
      pet: "Golden Retriever (3 yrs)",
      text: "Switching Barnaby to Petizen's Wild Harvest raw kibble completely cured his itchy coat and digestive issues within 2 weeks. The autoship feature is a lifesaver!",
      rating: 5,
      avatar: "👩",
    },
    {
      name: "Marcus Chen & Mochi",
      pet: "Scottish Fold Kitten (6 mos)",
      text: "We adopted Mochi through Petizen's partner rescue network. The entire process was transparent, all medical records were provided upfront, and she arrived healthy and so loving.",
      rating: 5,
      avatar: "👨",
    },
    {
      name: "Elena Rostova & Cooper",
      pet: "French Bulldog (2 yrs)",
      text: "The puzzle toys and Himalayan cheese chews keep my hyper Frenchie stimulated for hours while I work from home. Best pet startup out there!",
      rating: 5,
      avatar: "👩‍🦰",
    },
  ];

  return (
    <section className="startup-trust-section py-5 my-4">
      {/* Pillars Grid */}
      <div className="section-header text-center mb-5">
        <span className="text-uppercase tracking-wider text-primary fw-bold small">
          The Petizen Standard
        </span>
        <h2 className="fw-extrabold text-dark mt-1">Why Modern Pet Parents Trust Us</h2>
        <p className="text-muted small mx-auto" style={{ maxWidth: "600px" }}>
          We hold every recipe, adoptable pet, toy, and wellness product to the highest veterinary safety standards in the industry.
        </p>
      </div>

      <Row className="g-4 mb-5">
        {trustPillars.map((pillar, idx) => (
          <Col key={idx} xs={12} sm={6} lg={3}>
            <Card className="h-100 border-0 shadow-sm rounded-4 p-4 text-center trust-card hover-lift">
              <div className="trust-icon-wrap mx-auto mb-3 p-3 bg-light rounded-circle d-inline-flex">
                {pillar.icon}
              </div>
              <h5 className="fw-bold text-dark fs-6 mb-2">{pillar.title}</h5>
              <p className="text-secondary small mb-0">{pillar.desc}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Testimonials */}
      <div className="testimonials-wrap p-4 p-md-5 bg-light rounded-4">
        <div className="text-center mb-4">
          <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-1 fw-bold small">
            ✓ 50,000+ Verified Pet Parents
          </span>
          <h3 className="fw-extrabold text-dark mt-2">Loved by Pets & Their Humans</h3>
        </div>

        <Row className="g-4">
          {testimonials.map((test, idx) => (
            <Col key={idx} xs={12} md={4}>
              <Card className="h-100 border-0 shadow-sm rounded-4 p-4 bg-white">
                <div className="d-flex text-warning mb-3">
                  {[...Array(test.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-secondary small italic mb-4">
                  "{test.text}"
                </p>
                <div className="d-flex align-items-center gap-3 mt-auto pt-3 border-top">
                  <div className="avatar-circle fs-3">{test.avatar}</div>
                  <div>
                    <div className="fw-bold text-dark small">{test.name}</div>
                    <div className="text-muted xx-small">{test.pet}</div>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default StartupTrustSection;
