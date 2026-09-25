import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Container,
  Badge,
  Card,
  Form,
} from "react-bootstrap";
import ImageContainer from "../components/ImageContainer";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import { CATEGORY_METADATA } from "../constants";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import {
  FiArrowLeft,
  FiShoppingCart,
  FiHeart,
  FiShield,
  FiTruck,
  FiCheckCircle,
  FiRefreshCw,
  FiCheck,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [purchaseType, setPurchaseType] = useState("onetime"); // 'onetime' | 'autoship'

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const {
    data: product,
    error,
    isLoading,
  } = useGetProductDetailsQuery(productId);

  const isInStock = product?.countInStock > 0;
  const isPet = product?.category === "pets";
  const isFood = product?.category === "food";
  const catMeta = CATEGORY_METADATA[product?.category];

  const effectivePrice = product?.isOnSale ? product.salePrice : product?.price;
  const autoshipPrice = effectivePrice ? (effectivePrice * 0.85).toFixed(2) : 0;

  const addToCartHandler = () => {
    if (!isInStock) return;
    dispatch(
      addToCart({
        ...product,
        qty: Number(qty),
        isAutoship: purchaseType === "autoship",
      })
    );
    toast.success(
      isPet
        ? `Adoption reservation for ${product.name} added to cart!`
        : `Added ${qty} × ${product.name} to cart!`,
      { autoClose: 2000 }
    );
  };

  return (
    <Container className="pt-3 pb-5 startup-product-screen">
      {/* Back button & Breadcrumbs */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline-secondary btn-sm rounded-pill px-3 d-flex align-items-center gap-1"
        >
          <FiArrowLeft />
          <span>Back to catalog</span>
        </button>

        {product && (
          <nav aria-label="breadcrumb" className="d-none d-md-block">
            <ol className="breadcrumb mb-0 small">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none text-muted">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link
                  to={`/products?category=${product.category}`}
                  className="text-decoration-none text-muted"
                >
                  {catMeta?.label || product.category}
                </Link>
              </li>
              <li className="breadcrumb-item active text-dark fw-bold" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>
        )}
      </div>

      {isLoading && <Loader />}
      {error && (
        <div className="alert alert-danger">
          Error: {error?.data?.message || error.error}
        </div>
      )}

      {product && (
        <Row className="g-4 g-lg-5">
          {/* Left Column: Product Gallery / Image */}
          <Col md={6} lg={5}>
            <div className="product-screen-gallery position-relative rounded-4 overflow-hidden shadow-sm bg-white p-3 border">
              {/* Badges Overlay */}
              <div className="position-absolute top-0 start-0 m-4 d-flex flex-column gap-2 z-2">
                {product.isOnSale && (
                  <Badge bg="danger" className="rounded-pill px-3 py-2 fw-bold shadow-sm">
                    Special Sale Deal
                  </Badge>
                )}
                {product.isPopular && (
                  <Badge bg="warning" text="dark" className="rounded-pill px-3 py-2 fw-bold shadow-sm">
                    ⭐ Community Favorite
                  </Badge>
                )}
                {isPet && (
                  <Badge bg="success" className="rounded-pill px-3 py-2 fw-bold shadow-sm">
                    🐾 Certified Healthy Pet
                  </Badge>
                )}
              </div>

              <div className="product-image-container rounded-3 overflow-hidden bg-light">
                <ImageContainer
                  size="100%"
                  src={product.image}
                  alt={product.name}
                  borderRadius="16px"
                />
              </div>

              {/* Startup Trust Guarantee Strip under image */}
              <div className="mt-3 p-3 bg-light rounded-3 d-flex justify-content-around text-center">
                <div>
                  <FiTruck className="text-primary fs-5 mb-1" />
                  <div className="x-small fw-bold text-dark">Fast Delivery</div>
                  <div className="xx-small text-muted">Free over ₹499</div>
                </div>
                <div>
                  <FiShield className="text-success fs-5 mb-1" />
                  <div className="x-small fw-bold text-dark">Vet Verified</div>
                  <div className="xx-small text-muted">100% Safe Recipe</div>
                </div>
                <div>
                  <FiCheckCircle className="text-info fs-5 mb-1" />
                  <div className="x-small fw-bold text-dark">Guaranteed</div>
                  <div className="xx-small text-muted">30-day returns</div>
                </div>
              </div>
            </div>
          </Col>

          {/* Right Column: Details, Pricing, Autoship, Action */}
          <Col md={6} lg={7}>
            <div className="product-screen-details">
              {/* Category & Brand */}
              <div className="d-flex align-items-center gap-2 mb-2">
                <Badge bg="light" text="dark" className="border rounded-pill px-3 py-1 fw-bold">
                  {catMeta?.icon} {catMeta?.label || product.category}
                </Badge>
                <span className="text-muted small">Brand: <strong>{product.brand || "Petizen Selection"}</strong></span>
              </div>

              {/* Title */}
              <h1 className="fw-extrabold text-dark display-6 mb-2">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="d-flex align-items-center gap-2 mb-4">
                <div className="d-flex text-warning">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <span className="fw-bold text-dark">{product.rating || "4.9"}</span>
                <span className="text-muted small">
                  ({product.numReviews || 24} verified customer reviews)
                </span>
              </div>

              {/* If Pet: Special Adoption Card */}
              {isPet ? (
                <Card className="adoption-details-card border-success border-opacity-50 bg-success bg-opacity-10 rounded-4 p-4 mb-4">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="fs-3">🐾</span>
                    <div>
                      <h5 className="fw-bold text-dark mb-0">Adoption & Companion Profile</h5>
                      <span className="text-muted xx-small">Registered with Loving Paws Rescue & Sanctuary</span>
                    </div>
                  </div>

                  <Row className="g-2 mb-3">
                    <Col xs={6}>
                      <div className="bg-white p-2 rounded-3 text-center border">
                        <span className="text-muted xx-small text-uppercase d-block">Status</span>
                        <strong className="text-success small">Ready for New Home</strong>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="bg-white p-2 rounded-3 text-center border">
                        <span className="text-muted xx-small text-uppercase d-block">Medical</span>
                        <strong className="text-dark small">Fully Vaccinated</strong>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="bg-white p-2 rounded-3 text-center border">
                        <span className="text-muted xx-small text-uppercase d-block">Microchip</span>
                        <strong className="text-dark small">Included & Registered</strong>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="bg-white p-2 rounded-3 text-center border">
                        <span className="text-muted xx-small text-uppercase d-block">Guarantee</span>
                        <strong className="text-dark small">30-Day Health Warranty</strong>
                      </div>
                    </Col>
                  </Row>
                  <p className="small text-secondary mb-0">
                    Includes initial veterinary inspection records, transition puppy/kitten food package, and adoption certificate.
                  </p>
                </Card>
              ) : isFood ? (
                /* If Food: Autoship Subscription Switcher */
                <Card className="autoship-selector-card border rounded-4 p-3 mb-4 bg-light">
                  <div
                    role="button"
                    onClick={() => setPurchaseType("autoship")}
                    className={`p-3 rounded-3 mb-2 d-flex justify-content-between align-items-center border ${
                      purchaseType === "autoship"
                        ? "bg-white border-primary shadow-sm"
                        : "bg-transparent border-transparent"
                    }`}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <Form.Check
                        type="radio"
                        name="purchaseType"
                        checked={purchaseType === "autoship"}
                        onChange={() => setPurchaseType("autoship")}
                        id="radio-autoship"
                      />
                      <div>
                        <div className="fw-bold text-dark small d-flex align-items-center gap-2">
                          <FiRefreshCw className="text-primary" />
                          <span>Autoship & Save 15%</span>
                          <Badge bg="success" className="rounded-pill">Best Value</Badge>
                        </div>
                        <div className="text-muted xx-small">
                          Flexible delivery every 2, 4, or 6 weeks. Cancel anytime.
                        </div>
                      </div>
                    </div>
                    <span className="fw-extrabold text-primary fs-5">
                      ₹{autoshipPrice}
                    </span>
                  </div>

                  <div
                    role="button"
                    onClick={() => setPurchaseType("onetime")}
                    className={`p-3 rounded-3 d-flex justify-content-between align-items-center border ${
                      purchaseType === "onetime"
                        ? "bg-white border-primary shadow-sm"
                        : "bg-transparent border-transparent"
                    }`}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <Form.Check
                        type="radio"
                        name="purchaseType"
                        checked={purchaseType === "onetime"}
                        onChange={() => setPurchaseType("onetime")}
                        id="radio-onetime"
                      />
                      <div>
                        <div className="fw-bold text-dark small">One-Time Purchase</div>
                        <div className="text-muted xx-small">Standard one-time delivery</div>
                      </div>
                    </div>
                    <span className="fw-bold text-dark fs-5">
                      ₹{effectivePrice?.toFixed(2)}
                    </span>
                  </div>
                </Card>
              ) : null}

              {/* Price & Stock Display */}
              {!isFood && (
                <div className="price-container mb-4 d-flex align-items-baseline gap-3">
                  {product.isOnSale ? (
                    <>
                      <span className="display-5 fw-extrabold text-primary">
                        ₹{product.salePrice.toFixed(2)}
                      </span>
                      <span className="fs-4 text-decoration-line-through text-muted">
                        ₹{product.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="display-5 fw-extrabold text-dark">
                      ₹{product.price.toFixed(2)}
                    </span>
                  )}
                  {isInStock ? (
                    <Badge bg="success" className="rounded-pill px-3 py-2">
                      ✓ In Stock ({product.countInStock} available)
                    </Badge>
                  ) : (
                    <Badge bg="danger" className="rounded-pill px-3 py-2">
                      Out of Stock
                    </Badge>
                  )}
                </div>
              )}

              {/* Qty & Add to Cart Controls */}
              {isInStock && (
                <div className="purchase-controls d-flex flex-wrap align-items-center gap-3 mb-4">
                  {!isPet && (
                    <div className="d-flex align-items-center gap-2 bg-light p-1 rounded-pill border">
                      <span className="ps-3 text-muted small fw-bold">Qty:</span>
                      <Form.Select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="border-0 bg-transparent fw-bold"
                        style={{ width: "70px" }}
                      >
                        {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  )}

                  <Button
                    variant="primary"
                    size="lg"
                    className="flex-grow-1 rounded-pill py-3 fw-bold shadow-md d-flex align-items-center justify-content-center gap-2 hover-scale"
                    onClick={addToCartHandler}
                  >
                    {isPet ? (
                      <>
                        <FiHeart />
                        <span>Reserve & Adopt {product.name.split(" ")[0]}</span>
                      </>
                    ) : (
                      <>
                        <FiShoppingCart />
                        <span>Add to Cart • ₹{(effectivePrice * qty).toFixed(2)}</span>
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Description & Key Highlights */}
              <div className="product-description-tab pt-3 border-top">
                <h6 className="fw-bold text-dark text-uppercase tracking-wider small mb-2">
                  Product Overview & Nutrition:
                </h6>
                <p className="text-secondary leading-relaxed mb-4" style={{ whiteSpace: "pre-line" }}>
                  {product.description}
                </p>

                {/* Highlights Checklist */}
                <div className="highlights-box bg-light p-3 rounded-4">
                  <div className="row g-2">
                    <div className="col-sm-6 d-flex align-items-center gap-2 small text-dark">
                      <FiCheck className="text-primary fw-bold" />
                      <span>100% Sourced & Crafted in USA</span>
                    </div>
                    <div className="col-sm-6 d-flex align-items-center gap-2 small text-dark">
                      <FiCheck className="text-primary fw-bold" />
                      <span>Zero Artificial Flavors or Preservatives</span>
                    </div>
                    <div className="col-sm-6 d-flex align-items-center gap-2 small text-dark">
                      <FiCheck className="text-primary fw-bold" />
                      <span>Formulated with Board-Certified Vets</span>
                    </div>
                    <div className="col-sm-6 d-flex align-items-center gap-2 small text-dark">
                      <FiCheck className="text-primary fw-bold" />
                      <span>Recyclable & Eco-Friendly Packaging</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductScreen;
