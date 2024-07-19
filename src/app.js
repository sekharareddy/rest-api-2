
/// /// REQUIRE DECLARATION SECTION //////
require("dotenv").config();
const express = require("express"); // Web server
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const RateLimit = require('express-rate-limit');

const sequelize = require("./utils/sequelize");
const logger = require("./utils/logger")(module);
const { returnStateHandler } = require("./utils/returnStateHandler");
const { ErrorResponse } = require("./utils/ErrorResponse");
const routes = require("./routes");

/// /// END REQUIRE DECLARATION SECTION //////

// set up rate limiter: maximum of five requests per minute
const limiter = RateLimit({
  windowMs: (process.env.RATE_LIMIT_DURATION_MINUTES || 15) * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

// CORS
const corsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"], // For legacy browser support
};

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// apply rate limiter to all requests
app.use(limiter);
app.use(cors(corsOptions));

// helmet
app.use(helmet());

//morgan - web server logs
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms"),
);

////// END WEB SERVER INSTANTIATION AND CONFIGURATION SECTION //////

try {
  app.use((req, res, next) => {
    res.header("Strict-Transport-Security", "max-age=63072000; includeSubdomains; preload");
    res.header("X-XSS-Protection", "1; mode=block");
    res.header("Cache-control", "no-store");
    res.header("Pragma", "no-cache");
    next();
  });

  /// /// DATABASE CONNECTION //////
  const connect = async () => {
    try {
      await sequelize.authenticate();
      logger.info("Connection has been established successfully.");
    } catch (error) {
      logger.error("Unable to connect to the database:", error);
    }
  };

  connect();

  app.use("/", routes);

  // UNHANDLED EXCEPTIONS
  app.use((err, req, res, next) => {
    logger.error("handling generic unhandled exceptions");
    logger.error(err);
    if (err) {
      const errResp = new ErrorResponse("500", "Unhandled Error", false, err.message);
      next(errResp);
    }
  }, returnStateHandler);

  // NOT FOUND
  app.use((req, res, next) => {
    next({ error: "ROUTE NOT FOUND", success: false, status: 401 });
  }, returnStateHandler);
} catch (error) {
    logger.error("Unable to connect to the database:", error);
}
/// /// END DATABASE CONNECTION //////
module.exports = app

/// /// END //////
