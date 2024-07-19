const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.1.0",
    info: {
      title: "API Swagger Documentation.",
      version: "1.0.0",
      description:
        "Swagger documentation for REST-API",
    },
    servers: [
      {
        url: `http://localhost:${process.env.API_PORT || 5432}`,
        description: "Development Server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(options);

module.exports = specs;
