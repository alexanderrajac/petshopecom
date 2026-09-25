import { Row, Col, Button } from "react-bootstrap";
import { FiArrowRight, FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import Product from "../product/Product.jsx";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import Loader from "../Loader";

const HomePopular = () => {
  const { data, isLoading, error } = useGetProductsQuery({
    keyword: "",
    pageNumber: 1,
    isPublished: true,
    isPopular: true,
    pageSize: 4,
  });

  return (
    <section className="home-popular-section py-4 my-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
        <div>
          <span className="badge bg-warning bg-opacity-10 text-dark rounded-pill px-3 py-1 fw-bold small mb-2 d-inline-flex align-items-center gap-1">
            <FiTrendingUp className="text-warning" />
            <span>Community Favorites</span>
          </span>
          <h2 className="fw-extrabold text-dark mb-1">Trending & Most Popular</h2>
          <p className="text-secondary small mb-0">
            Top-rated by thousands of pets, dogs, and cats across the nation.
          </p>
        </div>
        <Link to="/products" className="mt-3 mt-md-0 text-decoration-none">
          <Button
            variant="outline-dark"
            className="rounded-pill px-4 fw-bold d-flex align-items-center gap-2 hover-scale"
          >
            <span>View All Popular Items</span>
            <FiArrowRight />
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <p className="text-danger">Error: {error?.data?.message || error.error}</p>
      ) : (
        data?.products && (
          <Row className="g-3 g-md-4">
            {data?.products.map((product) => (
              <Col key={product._id} xs={6} sm={6} md={4} lg={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )
      )}
    </section>
  );
};

export default HomePopular;
