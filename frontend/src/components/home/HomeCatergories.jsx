import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CATEGORY_METADATA } from "../../constants.js";
import { FiArrowRight } from "react-icons/fi";

const HomeCatergories = () => {
  const categoriesList = [
    {
      key: "birds",
      ...CATEGORY_METADATA.birds,
      count: "Exotic Birds & Feed",
      badge: "Cockatiels & Parrots",
      badgeColor: "warning",
    },
    {
      key: "aquatics",
      ...CATEGORY_METADATA.aquatics,
      count: "Live Fish & Care",
      badge: "Betta & Tropical",
      badgeColor: "info",
    },
    {
      key: "tanks",
      ...CATEGORY_METADATA.tanks,
      count: "Glass Tanks & Cages",
      badge: "Aquariums & Habitats",
      badgeColor: "primary",
    },
    {
      key: "food",
      ...CATEGORY_METADATA.food,
      count: "All Pet Nutrition",
      badge: "Bird, Fish & Mammal",
      badgeColor: "success",
    },
    {
      key: "pets",
      ...CATEGORY_METADATA.pets,
      count: "Healthy Companions",
      badge: "Adoptable Pets",
      badgeColor: "danger",
    },
    {
      key: "accessories",
      ...CATEGORY_METADATA.accessories,
      count: "Full A to Z Supplies",
      badge: "Tanks, Cages & Gear",
      badgeColor: "secondary",
    },
  ];

  return (
    <section className="home-categories-section py-4 mb-5">
      <div className="section-header text-center mb-4">
        <span className="text-uppercase tracking-wider text-primary fw-bold small">
          Explore Everything For Your Pet
        </span>
        <h2 className="fw-extrabold text-dark mt-1">Shop By Category</h2>
        <p className="text-muted small mx-auto" style={{ maxWidth: "600px" }}>
          Curated selection of veterinary-grade nutrition, certified ethical pet adoptions,
          stimulating play items, and wellness essentials.
        </p>
      </div>

      <Row className="g-3 g-md-4">
        {categoriesList.map((cat) => (
          <Col key={cat.key} xs={6} md={4} lg={4}>
            <Link
              to={`/products?category=${cat.key}`}
              className="text-decoration-none text-dark"
            >
              <Card className="category-modern-card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">
                <div className="category-img-container position-relative overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-100 category-banner-img object-fit-cover"
                    style={{ height: "190px" }}
                  />
                  <div className="category-gradient-overlay position-absolute bottom-0 start-0 w-100 p-3 text-white">
                    <span className="badge bg-white bg-opacity-25 backdrop-blur text-white rounded-pill px-2 py-1 x-small fw-bold mb-1">
                      {cat.icon} {cat.badge}
                    </span>
                    <h5 className="fw-bold mb-0 text-white text-shadow-sm">
                      {cat.label}
                    </h5>
                  </div>
                </div>

                <Card.Body className="p-3 bg-white d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-muted xx-small text-uppercase fw-bold">
                      {cat.count}
                    </div>
                    <div className="text-secondary small text-truncate" style={{ maxWidth: "180px" }}>
                      {cat.desc}
                    </div>
                  </div>
                  <div className="category-arrow-circle rounded-circle bg-light d-flex align-items-center justify-content-center p-2 text-primary">
                    <FiArrowRight />
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default HomeCatergories;
