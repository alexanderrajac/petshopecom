import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items in cart");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized. Please log in to complete your order.");
  }

  const items = orderItems.map((item) => ({
    name: item.name,
    qty: Number(item.qty),
    image: item.image || "/images/placeholder.jpg",
    price: Number(item.price || 0),
    isOnSale: Boolean(item.isOnSale),
    salePrice: item.salePrice ? Number(item.salePrice) : undefined,
    product: item._id || item.product,
  }));

  const order = new Order({
    orderItems: items,
    user: req.user._id,
    shippingAddress: {
      firstName: shippingAddress?.firstName || req.user.name?.split(" ")[0] || "Customer",
      lastName: shippingAddress?.lastName || req.user.name?.split(" ")[1] || "",
      address: shippingAddress?.address || "Delivery Address",
      city: shippingAddress?.city || "City",
      postalCode: shippingAddress?.postalCode || "000000",
      country: shippingAddress?.country || "India",
    },
    paymentMethod: paymentMethod || "Google Pay / UPI",
    itemsPrice: Number(itemsPrice || 0),
    taxPrice: Number(taxPrice || 0),
    shippingPrice: Number(shippingPrice || 0),
    totalPrice: Number(totalPrice || 0),
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

// @desc    Get logged in user orders
// @route   GET /api/orders/mine
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(orders);
});

const getOrdersByUserId = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id }).sort({
    createdAt: -1,
  });
  res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id || req.body.transactionId || `UPI-${Date.now()}`,
      status: req.body.status || "COMPLETED",
      update_time: req.body.update_time || new Date().toISOString(),
      email_address:
        req.body.payer?.email_address ||
        req.body.email_address ||
        req.user?.email ||
        "",
      upiId: req.body.upiId || "8248651695@ybl",
      transactionId:
        req.body.transactionId || req.body.id || `UPI-${Date.now()}`,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "id name")
    .sort({ createdAt: -1 });
  res.json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrdersByUserId,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
