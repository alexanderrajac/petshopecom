import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import { Row, Col, ListGroup, Image, Button, Card, Alert, Spinner } from "react-bootstrap";
import OrderShipping from "../components/order/OrderShipping";
import OrderPayment from "../components/order/OrderPayment";
import OrderPrice from "../components/order/OrderPrice";
import PayPalPayment from "../components/order/PayPalPayment";
import UpiPayment from "../components/order/UpiPayment";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems, saveShippingAddress } from "../slices/cartSlice";
import { toast } from "react-toastify";
import { FiCheckCircle, FiLogIn, FiPackage, FiTruck } from "react-icons/fi";
import { SiGooglepay } from "react-icons/si";

const ReviewOrderScreen = () => {
  const [order, setOrder] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth?.userInfo);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { shippingAddress } = cart;

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (Object.keys(order).length > 0) {
        dispatch(clearCartItems());
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [order, dispatch]);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    if (!userInfo) {
      toast.warning("Please log in to place your order");
      navigate("/login?redirect=/revieworder");
      return;
    }

    const isNoItemsInCart = cartItems.length === 0;
    if (isNoItemsInCart) {
      toast.error("Your cart is empty");
      return;
    }

    // Auto-fill and save shipping address if entered or default exists
    const currentAddr = shippingAddress || {};
    const defaultAddr = userInfo.shippingAddress || {};
    const addressToUse = {
      firstName:
        currentAddr.firstName ||
        defaultAddr.firstName ||
        userInfo.name?.split(" ")[0] ||
        "Customer",
      lastName:
        currentAddr.lastName ||
        defaultAddr.lastName ||
        userInfo.name?.split(" ")[1] ||
        "",
      address: currentAddr.address || defaultAddr.address || "Main Street",
      city: currentAddr.city || defaultAddr.city || "New Delhi",
      postalCode: currentAddr.postalCode || defaultAddr.postalCode || "110001",
      country: currentAddr.country || defaultAddr.country || "India",
      isSaved: true,
    };

    if (!shippingAddress?.isSaved) {
      dispatch(saveShippingAddress(addressToUse));
    }

    try {
      const paymentMethodToUse = cart.paymentMethod || "Google Pay / UPI";

      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: addressToUse,
        paymentMethod: paymentMethodToUse,
        itemsPrice: Number(cart.itemsPrice || 0),
        shippingPrice: Number(cart.shippingPrice || 0),
        taxPrice: Number(cart.taxPrice || 0),
        totalPrice: Number(cart.totalPrice || 0),
      }).unwrap();

      toast.success("Order created successfully!");
      setOrder(res);
    } catch (err) {
      console.error("Create order error:", err);
      const message =
        err?.data?.message || err?.error || "Failed to create order. Please try again.";
      toast.error(message);
    }
  };

  const orderIsCreated = Object.keys(order).length > 0;

  const isDisabledOrderBtn =
    cartItems.length === 0 || isLoading || orderIsCreated;

  const getItemPrice = (item) => {
    const unitPrice = item.isOnSale ? item.salePrice : item.price;
    return item.isOnSale ? (
      <>
        <span className="text-decoration-line-through text-black-50 me-1">
          ₹{item.price}
        </span>
        <span className="fw-bold text-dark">
          ₹{item.salePrice} × {item.qty} = ₹{(item.qty * unitPrice).toFixed(2)}
        </span>
      </>
    ) : (
      <span className="fw-bold text-dark">
        ₹{item.price} × {item.qty} = ₹{(item.qty * item.price).toFixed(2)}
      </span>
    );
  };

  const onPaidHandler = () => {
    dispatch(clearCartItems());
    navigate(`/ordersuccess/${order._id}`);
  };

  const onCodSuccessHandler = () => {
    dispatch(clearCartItems());
    navigate(`/ordersuccess/${order._id}`);
  };

  return (
    <>
      <PageTitle title="Review & Place Order" />

      {/* Guest Login Banner */}
      {!userInfo && (
        <Alert variant="warning" className="rounded-4 border-0 shadow-sm mb-4 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <FiLogIn className="fs-5" />
            <span>
              You are not logged in. Please <strong>sign in</strong> to link your order to your account.
            </span>
          </div>
          <Button
            variant="warning"
            size="sm"
            className="rounded-pill px-4 fw-bold"
            onClick={() => navigate("/login?redirect=/revieworder")}
          >
            Sign In Now
          </Button>
        </Alert>
      )}

      <Row className="pt-2 pb-5">
        <Col md={7} lg={8}>
          {/* Order Items */}
          <Card className="border-0 shadow-sm rounded-4 mb-4">
            <Card.Header className="bg-white border-bottom py-3 rounded-top-4">
              <h4 className="fs-5 fw-bold mb-0 text-dark d-flex align-items-center gap-2">
                <FiPackage className="text-primary" />
                <span>Order Items ({cart.itemsNumberText})</span>
              </h4>
            </Card.Header>
            <Card.Body className="p-0">
              {cartItems.length > 0 ? (
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item._id} className="p-3">
                      <Row className="align-items-center">
                        <Col xs={3} sm={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                            className="border"
                            style={{ height: "60px", width: "60px", objectFit: "cover" }}
                          />
                        </Col>
                        <Col xs={9} sm={6}>
                          <Link
                            to={`/product/${item._id}`}
                            className="text-dark fw-bold text-decoration-none small d-block hover-text"
                          >
                            {item.name}
                          </Link>
                          <span className="text-muted xx-small">Qty: {item.qty}</span>
                        </Col>
                        <Col xs={12} sm={4} className="text-sm-end mt-2 mt-sm-0">
                          {getItemPrice(item)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div className="p-4 text-center text-muted">Your cart is empty</div>
              )}
            </Card.Body>
          </Card>

          {/* Shipping Address */}
          <Card className="border-0 shadow-sm rounded-4 mb-4">
            <Card.Header className="bg-white border-bottom py-3 rounded-top-4">
              <h4 className="fs-5 fw-bold mb-0 text-dark d-flex align-items-center gap-2">
                <FiTruck className="text-primary" />
                <span>Shipping Address</span>
              </h4>
            </Card.Header>
            <Card.Body className="p-4">
              <OrderShipping />
            </Card.Body>
          </Card>

          {/* Payment Method Selection */}
          <Card className="border-0 shadow-sm rounded-4 mb-4">
            <Card.Header className="bg-white border-bottom py-3 rounded-top-4">
              <h4 className="fs-5 fw-bold mb-0 text-dark d-flex align-items-center gap-2">
                <SiGooglepay className="text-primary fs-4" />
                <span>Payment Method</span>
              </h4>
            </Card.Header>
            <Card.Body className="p-4">
              <OrderPayment />
            </Card.Body>
          </Card>
        </Col>

        {/* Right Summary Column */}
        <Col md={5} lg={4}>
          <Card className="border-0 shadow-sm rounded-4 p-3 sticky-top" style={{ top: "90px" }}>
            <h5 className="fw-extrabold text-dark px-2 pt-2 mb-3">Order Summary</h5>
            <ListGroup variant="flush">
              <OrderPrice />

              <ListGroup.Item className="px-0 pt-3 border-top">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-100 rounded-pill py-3 fw-bold shadow-md hover-scale d-flex align-items-center justify-content-center gap-2"
                  disabled={isDisabledOrderBtn}
                  onClick={placeOrderHandler}
                >
                  {isLoading ? (
                    <>
                      <Spinner size="sm" animation="border" />
                      <span>Creating Order...</span>
                    </>
                  ) : orderIsCreated ? (
                    <>
                      <FiCheckCircle />
                      <span>Order Created!</span>
                    </>
                  ) : (
                    <span>Place Order for ₹{cart.totalPrice}</span>
                  )}
                </Button>
              </ListGroup.Item>

              {/* Once Order Is Created: Render Payment Flow */}
              {orderIsCreated && (
                <div className="mt-3">
                  <Alert variant="success" className="rounded-3 py-2 px-3 small mb-2 d-flex align-items-center gap-2">
                    <FiCheckCircle className="fs-5" />
                    <div>
                      <strong>Order #{order?._id?.substring(order._id.length - 8)} Placed!</strong>
                      <div className="xx-small">Complete payment to finalize delivery.</div>
                    </div>
                  </Alert>

                  {/* UPI / GPay Payment Flow */}
                  {(Boolean(order.paymentMethod?.includes("Google Pay")) ||
                    Boolean(order.paymentMethod?.includes("UPI")) ||
                    !order.paymentMethod ||
                    (order.paymentMethod !== "PayPal" &&
                      order.paymentMethod !== "Cash on Delivery")) && (
                    <UpiPayment order={order} onPaid={onPaidHandler} />
                  )}

                  {/* Cash on Delivery Flow */}
                  {order.paymentMethod === "Cash on Delivery" && (
                    <Card className="border-0 bg-light p-3 rounded-4 mt-3 text-center">
                      <h6 className="fw-bold text-dark mb-1">Cash on Delivery</h6>
                      <p className="xx-small text-muted mb-3">
                        Pay ₹{order.totalPrice} in cash or via GPay / UPI to the courier upon delivery.
                      </p>
                      <Button
                        variant="success"
                        className="rounded-pill py-2 fw-bold"
                        onClick={onCodSuccessHandler}
                      >
                        Confirm COD Order
                      </Button>
                    </Card>
                  )}

                  {/* PayPal Flow */}
                  {order.paymentMethod === "PayPal" && (
                    <div className="mt-3">
                      <PayPalPayment order={order} onPaid={onPaidHandler} />
                    </div>
                  )}
                </div>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ReviewOrderScreen;
