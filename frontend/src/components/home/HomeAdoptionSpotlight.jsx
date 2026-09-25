import { Row, Col, Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import { FiHeart, FiCheck, FiArrowRight } from "react-icons/fi";
import Loader from "../Loader";

const HomeAdoptionSpotlight = () => {
  const { data, isLoading } = useGetProductsQuery({
    category: "pets",
    pageSize: 3,
  });

  const adoptablePets = data?.products || [];

  return (
    <section className="adoption-spotlight-section py-5 my-4 bg-light rounded-4 p-4 p-md-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
        <div>
          <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-1 fw-bold small mb-2">
            🐾 Meet Our Furry Friends
          </span>
          <h2 className="fw-extrabold text-dark mb-1">
            Certified Adoptable Pets Looking for a Home
          </h2>
          <p className="text-secondary small mb-0">
            Every companion is vet-examined, fully vaccinated, microchipped, and socialized for loving families.
          </p>
        </div>
        <Link to="/products?category=pets" className="mt-3 mt-md-0 text-decoration-none">
          <Button variant="outline-primary" className="rounded-pill px-4 fw-bold d-flex align-items-center gap-2">
            <span>View All Adoptable Pets</span>
            <FiArrowRight />
          </Button>
        </Link>
      </div>

      {isLoading && <Loader />}

      <Row className="g-4">
        {adoptablePets.map((pet) => (
          <Col key={pet._id} xs={12} md={4}>
            <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden pet-adoption-card">
              <div className="pet-card-image-wrap position-relative">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-100 object-fit-cover"
                  style={{ height: "240px" }}
                />
                <div className="position-absolute top-0 end-0 m-3">
                  <Badge bg="danger" className="rounded-pill p-2 shadow-sm d-flex align-items-center gap-1">
                    <FiHeart className="fs-6" />
                  </Badge>
                </div>
                <div className="position-absolute bottom-0 start-0 m-3">
                  <Badge bg="success" className="rounded-pill px-3 py-1 shadow-sm">
                    ✓ Ready for Adoption
                  </Badge>
                </div>
              </div>

              <Card.Body className="p-4 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="fw-bold text-dark mb-0">{pet.name}</h5>
                  <span className="text-primary fw-bold fs-5">
                    ₹{pet.price}
                  </span>
                </div>

                <div className="text-muted small mb-3">
                  {pet.brand || "Certified Rescue"}
                </div>

                <p className="text-secondary small mb-3 line-clamp-3">
                  {pet.description}
                </p>

                <div className="pet-perks-list mb-4 mt-auto">
                  <div className="d-flex align-items-center gap-1 x-small text-dark mb-1">
                    <FiCheck className="text-success" />
                    <span>Up to date on all vaccinations</span>
                  </div>
                  <div className="d-flex align-items-center gap-1 x-small text-dark mb-1">
                    <FiCheck className="text-success" />
                    <span>Microchipped with lifetime registry</span>
                  </div>
                  <div className="d-flex align-items-center gap-1 x-small text-dark">
                    <FiCheck className="text-success" />
                    <span>Includes 30 days free health insurance</span>
                  </div>
                </div>

                <Link to={`/product/${pet._id}`} className="text-decoration-none mt-auto">
                  <Button variant="primary" className="w-100 rounded-pill py-2 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2">
                    <span>Meet & Adopt {pet.name.split(" ")[0]}</span>
                    <FiArrowRight />
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default HomeAdoptionSpotlight;
