'use strict';
const express = require('express');
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const path = require('path');

const specs = require("../utils/swagger");
const { returnStateHandler } = require("../utils/returnStateHandler");
const { auth } = require("../middleware/auth");

router.get('/api', function (req, res) { res.send("ResFrac API"); });
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
router.get("/health", (req, res) => res.sendStatus(200));
router.use("/", express.static(path.join(__dirname, "./public"))); // added static html files in public folder to verify google registration
router.get('/', function (req, res) { res.send("OK"); }, returnStateHandler);

// Secure Routes
// app.use("/organization", auth, routes.RoleRoute);


module.exports = router;

