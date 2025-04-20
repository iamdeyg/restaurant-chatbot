import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session"; // Import express-session

import { startOrder, checkoutOrder } from "./controllers/orderController.js";
import { initializePayment } from "./services/paystack.js";

const app = express();
const PORT = process.env.PORT || 9000;

// Set up __dirname with ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware for handling CORS
app.use(cors());

// Middleware for JSON parsing
app.use(bodyParser.json());

// Session middleware configuration.
app.use(
  session({
    secret: "your-secret-key", // Secret key to sign the session ID cookie
    resave: false, // Don't resave session if it's not modified
    saveUninitialized: true, // Create a session even if it's not modified
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Root route to serve the frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

// POST routes for starting an order and checking out
app.post("/start-order", startOrder);
app.post("/checkout", checkoutOrder);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
