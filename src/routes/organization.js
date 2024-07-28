const express = require("express");

const httpCodes = require("http-codes");
const logger = require("../utils/logger")(module);
const QueryResult = require("../utils/queryResult").QueryResult;
const { returnStateHandler } = require("../utils/returnStateHandler");
const { getById } = require("../controllers/organization");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/:id", auth, async function (req, res, next) {
  logger.info("/organization GET call.", req.params.id);
  try {
      const data = await getById(req.params.id);
      next(new QueryResult(data));
  } catch (error) {
    logger.error(18, error);
    next(new QueryResult(data=null, success=false, error={
        message: error.message,
        status: error.status || httpCodes.BAD_REQUEST
    }));
  }
}, returnStateHandler);

module.exports = router;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *     tokenSource:
 *       type: apiKey
 *       in: header
 *       name: tokenSource
 *
 *   schemas:
 *     Organization:
 *       type: object
 *       properties:
 *         orgId:
 *           type: string
 *           format: uuid
 *           description: The auto-generated ID.
 *         orgName:
 *           type: string
 *           description: Organization Name.
 *         apiBaseURL:
 *           type: string
 *           description: ResFrac API URL
 *         azureStorageHostURL:
 *           type: string
 *           description: Storage account URL 
 *         uiReleasesURL:
 *           type: string
 *           description: CDN link of ResFracPro Releases
 *         latestReleaseInstallerLink:
 *           type: string
 *           description: link to download latest version of ResFracPro
 *         inputContainerName:
 *           type: string
 *           description: Simulation input files container name
 *         outputContainerName:
 *           type: string
 *           description: Simulation results container name
 *         isDeleted:
 *           type: boolean
 *           description: soft delete flag
 *
 * security:
 *   - BearerAuth: []
 *   - tokenSource: []
 *
 * /Organization/{id}:
 *   get:
 *     summary: Retrieve an organization by ID.
 *     tags:
 *       - Organization
 *     security:
 *       - BearerAuth: []
 *       - tokenSource: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the organization to retrieve.
 *     responses:
 *       '200':
 *         description: Organization found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       '404':
 *         description: Organization / route not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '401':
 *         description: unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '400':
 *         description: Bad Request / Invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Interrnal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
