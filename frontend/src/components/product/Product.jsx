import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ImageContainer from "../ImageContainer";
import { addToCart } from "../../slices/cartSlice";
import { CATEGORY_METADATA } from "../../constants";
import { toast } from "react-toastify";
import { FiShoppingCart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const isInStock = product && product.countInStock > 0;
  const isPet = product?.category === "pets";
  const catMeta = CATEGORY_METADATA[product?.category];

  const addToCartHandler = (e) => {
    e.preventDefault();
    if (!isInStock) return;
    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success(
      isPet
        ? `Added reservation for ${product.name} to inquiry list!`
        : `Added ${product.name} to cart!`,
      { autoClose: 2000 }
    );
  };

  const discountPercent =
    product?.isOnSale && product?.price > 0 && product?.salePrice
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : null;

  return (
    <Card className="h-100 startup-product-card border-0 shadow-sm rounded-4 overflow-hidden position-relative">
      {/* Badges Overlay */}
      <div className="product-badges-overlay position-absolute top-0 start-0 w-100 p-2 d-flex justify-content-between align-items-start pointer-events-none">
        <div className="d-flex flex-column gap-1">
          {discountPercent && (
            <Badge bg="danger" className="rounded-pill px-2 py-1 fw-bold shadow-sm">
              -{discountPercent}% OFF
            </Badge>
          )}
          {product.isPopular && (
            <Badge bg="warning" text="dark" className="rounded-pill px-2 py-1 fw-bold shadow-sm">
              🔥 Best Seller
            </Badge>
          )}
          {isPet && (
            <Badge bg="success" className="rounded-pill px-2 py-1 fw-bold shadow-sm">
              🐾 Adoptable
            </Badge>
          )}
        </div>
        <span className="category-pill-badge bg-white bg-opacity-90 backdrop-blur text-dark rounded-pill px-2 py-1 small fw-semibold shadow-sm">
          {catMeta?.icon} {catMeta?.label?.split(" ")[0] || product.category}
        </span>
      </div>

      {/* Product Image Link */}
      <Link to={`/product/${product._id}`} className="text-decoration-none">
        <div className="product-img-wrapper overflow-hidden bg-light position-relative">
          <ImageContainer
            size="100%"
            src={product.image}
            alt={product.name}
            className="product-card-img"
          />
        </div>
      </Link>

      <Card.Body className="p-3 d-flex flex-column">
        {/* Brand & Rating */}
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="text-muted text-uppercase x-small fw-bold tracking-wider">
            {product.brand || "Petizen Choice"}
          </span>
          <div className="d-flex align-items-center gap-1 text-warning small">
            <FaStar className="fs-6" />
            <span className="fw-bold text-dark">{product.rating || "5.0"}</span>
            <span className="text-muted x-small">
              ({product.numReviews || 12})
            </span>
          </div>
        </div>

        {/* Product Title */}
        <Card.Title
          as={Link}
          to={`/product/${product._id}`}
          className="text-dark text-decoration-none fw-bold fs-6 mb-2 line-clamp-2 title-link"
          title={product.name}
        >
          {product.name}
        </Card.Title>

        {/* Pet-specific micro-tag or stock status */}
        <div className="mb-3 mt-auto">
          {isPet ? (
            <span className="badge bg-emerald-light text-success fw-medium small">
              ✓ Health Verified & Vaccinated
            </span>
          ) : isInStock ? (
            <span className="text-success x-small fw-semibold">
              ● In Stock ({product.countInStock} available)
            </span>
          ) : (
            <span className="text-danger x-small fw-semibold">
              ● Currently Out of Stock
            </span>
          )}
        </div>

        {/* Price & Action Button */}
        <div className="d-flex align-items-center justify-content-between pt-2 border-top">
          <div className="price-block">
            {product.isOnSale ? (
              <div>
                <span className="fw-bold fs-5 text-primary">
                  ₹{product.salePrice.toFixed(2)}
                </span>
                <span className="text-decoration-line-through text-muted small ms-2">
                  ₹{product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="fw-bold fs-5 text-dark">
                ₹{product.price.toFixed(2)}
              </span>
            )}
          </div>

          <Button
            variant={isPet ? "primary" : "outline-primary"}
            size="sm"
            className="rounded-pill px-3 py-1 fw-bold d-flex align-items-center gap-1 add-btn-hover"
            disabled={!isInStock}
            onClick={addToCartHandler}
          >
            {isPet ? (
              <span>Adopt Me</span>
            ) : (
              <>
                <FiShoppingCart className="fs-6" />
                <span>Add</span>
              </>
            )}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
