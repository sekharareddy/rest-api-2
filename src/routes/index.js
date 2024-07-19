'use strict';
const express = require('express');
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const path = require('path');

const specs = require("../utils/swagger");
const { returnStateHandler } = require("../utils/returnStateHandler");
const { auth } = require("../middleware/auth");

// Public routes (anonymous)
router.get('/api', function (req, res) { res.status(200).send("ResFrac API"); });
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
router.get("/health", (req, res) => res.status(200).send("ResFrac API - OK"));
router.use("/", express.static(path.join(__dirname, "../public"))); // added static html files in public folder to verify google registration
router.get('/', function (req, res) { res.status(200).send("OK"); });

// Secure Routes
// app.use("/organization", auth, routes.RoleRoute);


module.exports = router;


/**
 * @swagger
 * /health:
 *   get:
 *     summary: Retrieve health status of API.
 *     tags:
 *       - Health
 *     responses:
 *       '200':
 *         description: Health status.
 *         content:
 *           application/text:
 *       '500':
 *         description: Internal server error.
 */
