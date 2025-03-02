const express = require("express");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const { getCategories,searchCategory } = require("./controllers/categoryController");

const app = express();
const PORT = process.env.PORT;
const API_RATE_LIMIT = process.env.API_RATE_LIMIT;
const API_KEY = process.env.API_KEY;

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: API_RATE_LIMIT,
  message: { status: "error", message: "Rate limit exceeded. Try again later.", status_code: 429 },
});

app.use(limiter);

// Middleware for API Key Authentication
app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(403).json({ status: "error", message: "Forbidden: Invalid API Key", status_code: 403 });
  }
  next();
});

// GET /courses - Fetch courses with pagination
app.get("/categories", getCategories); // Use the course controller function
app.get("/categories-search", searchCategory); // Use the course controller function
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});