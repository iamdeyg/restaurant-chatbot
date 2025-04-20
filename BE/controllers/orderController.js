import { menu } from "../menu.js";
import { initializePayment } from "../services/paystack.js";

// controllers/orderController.js

export const startOrder = (req, res) => {
  const { itemId } = req.body; // Get itemId from the request body

  // If the session doesn't exist yet, initialize it
  if (!req.session.order) {
    req.session.order = []; // Create a new order array if it doesn't exist
  }

  // Add the item to the user's session order
  if (itemId === 1) {
    req.session.order.push("Burger");
  } else if (itemId === 2) {
    req.session.order.push("Pizza");
  } else if (itemId === 3) {
    req.session.order.push("Pasta");
  } else {
    return res.status(400).json({ message: "Invalid item selected" });
  }

  res.json({
    message: `${
      req.session.order[req.session.order.length - 1]
    } added to your order.`,
    order: req.session.order,
  });
};

export const checkoutOrder = async (req, res) => {
  const { sessionId } = req.body;

  // Check if the user has an order in their session
  if (!req.session.order || req.session.order.length === 0) {
    return res.status(400).json({ message: "No order to checkout." });
  }

  const totalAmount = req.session.order.length * 5; // Example: each item is $5

  // Simulate payment processing (Paystack integration would go here)
  try {
    const paymentUrl = await initializePayment(totalAmount); // Placeholder for Paystack integration
    res.json({
      message: "Checkout successful. Please complete payment.",
      paymentUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Payment initialization failed" });
  }
};
