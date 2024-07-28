const httpCodes = require("http-codes");
const { validate } = require('uuid');

const { Organization } = require('../models/orgnization');
const logger = require("../utils/logger")(module);

const getById = async (orgId) => {
  try {
    if (!validate(orgId)){
      let error = new Error("Invalid orgId");
      error.status = httpCodes.BAD_REQUEST;
      throw error;
    }
    const data = await Organization.findOne({
      where: { orgId },
      attributes: ["orgId", "orgName"],
    });

    if (!data) {
      let error = new Error("Org not found");
      error.status = httpCodes.NOT_FOUND;
      throw error;
    }
    return data;
  } catch (error) {
    logger.error("Error getting org by Id:", error);
    throw error;
  }
};

module.exports = {
  getById,
};
