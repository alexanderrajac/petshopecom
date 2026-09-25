import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle.jsx";
import OrderPrice from "../components/order/OrderPrice.jsx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ProgressBar,
  Badge,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { FiTruck, FiShield, FiArrowRight, FiShoppingBag } from "react-icons/fi";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty: Number(qty) }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/revieworder");
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.isOnSale ? item.salePrice : item.price;
    return acc + price * item.qty;
  }, 0);

  const freeShippingThreshold = 499.0;
  const progressPercent = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );
  const remainingForFreeShipping = (freeShippingThreshold - subtotal).toFixed(2);

  return (
    <div className="startup-cart-screen pb-5">
      <PageTitle title="Your Pet Care Cart" />

      {/* Free Shipping Progress Indicator */}
      {cartItems.length > 0 && (
        <Card className="border-0 bg-light rounded-4 p-3 mb-4 shadow-sm">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex align-items-center gap-2 small fw-bold text-dark">
              <FiTruck className="text-primary fs-5" />
              {subtotal >= freeShippingThreshold ? (
                <span className="text-success">
                  🎉 Congratulations! You qualify for <strong>FREE Fast Shipping</strong>!
                </span>
              ) : (
                <span>
                  Add <strong>₹{remainingForFreeShipping}</strong> more to unlock{" "}
                  <strong className="text-primary">FREE Fast Shipping</strong>!
                </span>
              )}
            </div>
            <span className="small text-muted fw-bold">{progressPercent}%</span>
          </div>
          <ProgressBar
            now={progressPercent}
            variant={subtotal >= freeShippingThreshold ? "success" : "primary"}
            style={{ height: "8px", borderRadius: "4px" }}
          />
        </Card>
      )}

      <Row className="g-4">
        {/* Cart Items List */}
        <Col lg={8}>
          {cartItems.length === 0 ? (
            <Card className="border-0 shadow-sm rounded-4 p-5 text-center my-4 bg-light">
              <div className="display-4 text-muted mb-3">🛒</div>
              <h4 className="fw-bold text-dark mb-2">Your cart is empty</h4>
              <p className="text-secondary small mb-4">
                Looks like you haven't added any fresh food, cute pets, or toys to your cart yet.
              </p>
              <Link to="/products" className="text-decoration-none">
                <Button
                  variant="primary"
                  className="rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
                >
                  <FiShoppingBag />
                  <span>Start Exploring Products</span>
                </Button>
              </Link>
            </Card>
          ) : (
            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
              <ListGroup variant="flush">
                {cartItems.map((item) => {
                  const itemPrice = item.isOnSale ? item.salePrice : item.price;
                  const isPet = item.category === "pets";
                  return (
                    <ListGroup.Item
                      key={item._id}
                      className="p-3 p-md-4 border-bottom"
                    >
                      <Row className="align-items-center g-3">
                        <Col xs={3} sm={2}>
                          <div className="rounded-3 overflow-hidden bg-light border">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              className="object-fit-cover"
                              style={{ height: "70px", width: "100%" }}
                            />
                          </div>
                        </Col>

                        <Col xs={9} sm={4}>
                          <div className="d-flex flex-column">
                            {isPet && (
                              <Badge bg="success" className="rounded-pill mb-1 align-self-start xx-small">
                                🐾 Adoptable Pet
                              </Badge>
                            )}
                            <Link
                              to={`/product/${item._id}`}
                              className="text-dark fw-bold text-decoration-none small line-clamp-2 hover-text"
                            >
                              {item.name}
                            </Link>
                            <span className="text-muted xx-small mt-1">
                              {item.brand || "Petizen Selection"}
                            </span>
                          </div>
                        </Col>

                        <Col xs={6} sm={3} className="text-sm-center">
                          <div className="d-inline-flex align-items-center gap-1 bg-light rounded-pill px-2 py-1 border">
                            <span className="text-muted xx-small fw-bold">Qty:</span>
                            <Form.Select
                              value={item.qty}
                              onChange={(e) => addToCartHandler(item, e.target.value)}
                              className="border-0 bg-transparent py-0 px-2 fw-bold small shadow-none"
                              style={{ width: "60px", cursor: "pointer" }}
                            >
                              {[...Array(Math.min(item.countInStock || 10, 10)).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </Form.Select>
                          </div>
                        </Col>

                        <Col xs={4} sm={2} className="text-end">
                          <div className="fw-extrabold text-dark">
                            ₹{(itemPrice * item.qty).toFixed(2)}
                          </div>
                          {item.isOnSale && (
                            <span className="text-decoration-line-through text-muted xx-small d-block">
                              ₹{(item.price * item.qty).toFixed(2)}
                            </span>
                          )}
                        </Col>

                        <Col xs={2} sm={1} className="text-end">
                          <Button
                            variant="light"
                            className="text-danger rounded-circle p-2 hover-danger"
                            onClick={() => removeFromCartHandler(item._id)}
                            title="Remove item"
                          >
                            <RiDeleteBin6Line className="fs-5" />
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card>
          )}
        </Col>

        {/* Order Summary Column */}
        {cartItems.length > 0 && (
          <Col lg={4}>
            <Card className="border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: "90px" }}>
              <h5 className="fw-extrabold text-dark mb-3">Order Summary</h5>
              <OrderPrice cart={cart} />

              <div className="mt-4 pt-3 border-top">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-100 rounded-pill py-3 fw-bold shadow-md d-flex align-items-center justify-content-center gap-2 hover-scale"
                  onClick={checkoutHandler}
                >
                  <span>Proceed to Checkout</span>
                  <FiArrowRight />
                </Button>
              </div>

              {/* Startup Guarantees */}
              <div className="mt-4 p-3 bg-light rounded-3 text-secondary xx-small d-flex flex-column gap-2">
                <div className="d-flex align-items-center gap-2">
                  <FiShield className="text-success fs-6" />
                  <span>256-Bit Bank-Grade Secure Payment</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <FiTruck className="text-primary fs-6" />
                  <span>Fast Insulated Climate-Controlled Delivery</span>
                </div>
              </div>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default CartScreen;
