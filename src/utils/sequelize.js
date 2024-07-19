const { Sequelize } = require("sequelize");
const config = require("config");

const logging = process.env.DB_LOGGING==='true';
const sqlConfig = {
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 1433,
  dialect: process.env.DB_DIALECT || "mssql",
  logging: logging,
  pool: {
    max: config.sequelize_config.max,
    min: config.sequelize_config.min,
    acquire: config.sequelize_config.acquire,
    idle: config.sequelize_config.idle,
  },
};

if (process.env.API_ENV === "production") {
  sqlConfig["dialectOptions"] = {
    authentication: {
      type: "azure-active-directory-msi-app-service",
      options: {
        encrypt: true,
      },
    },
  }
} else {
  sqlConfig["username"] = process.env.DB_USER;
  sqlConfig["password"] = process.env.DB_PW;
}
const sequelize = new Sequelize(sqlConfig);

module.exports = sequelize;
