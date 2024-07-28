const { DataTypes, Model } = require("sequelize");
const  sequelize  = require("../utils/sequelize");

class Organization extends Model { }

Organization.init(
    {
        orgId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        orgName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apiBaseURL: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        azureStorageHostURL: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        uiReleasesURL: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        latestReleaseInstallerLink: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        inputContainerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        outputContainerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isDeleted: {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: 1
        },
    },
    {
        sequelize,
        modelName: "Organization",
        tableName: "organizations",
        schema: "dbo",
        timestamps: true,
    },
);

module.exports = { Organization };
