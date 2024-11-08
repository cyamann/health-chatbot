const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./routes");
const path = require("path");

require("dotenv").config();

const app = express();

// Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(cors());

app.use(express.json());

// Rotalar
app.use("/api", routes);

// Hata Yönetimi Middleware'i
app.use((err, req, res, next) => {
  if (err.status >= 500) {
    global.logger.error(`Internal Server Error: ${err.message}`);
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
