import { Row, Col, Button } from "react-bootstrap";
import { FiArrowRight, FiPercent } from "react-icons/fi";
import { Link } from "react-router-dom";
import Product from "../product/Product.jsx";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import Loader from "../Loader";

const HomeSales = () => {
  const { data, isLoading, error } = useGetProductsQuery({
    keyword: "",
    pageNumber: 1,
    isPublished: true,
    isOnSale: true,
    pageSize: 4,
  });

  return (
    <section className="home-sales-section py-4 my-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
        <div>
          <span className="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-1 fw-bold small mb-2 d-inline-flex align-items-center gap-1">
            <FiPercent />
            <span>Limited Time Offers</span>
          </span>
          <h2 className="fw-extrabold text-dark mb-1">Weekly Flash Deals & Savings</h2>
          <p className="text-secondary small mb-0">
            Stock up on freeze-dried meals, treats, and pet gear with up to 35% discount.
          </p>
        </div>
        <Link to="/sales" className="mt-3 mt-md-0 text-decoration-none">
          <Button
            variant="outline-danger"
            className="rounded-pill px-4 fw-bold d-flex align-items-center gap-2 hover-scale"
          >
            <span>View All Sale Deals</span>
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

export default HomeSales;
