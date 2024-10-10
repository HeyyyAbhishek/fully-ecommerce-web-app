const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../service/database/db");
const UserModel = require("./UserModel");

class Seller extends UserModel {
    constructor() {
        super();
        this.sellerSpecificField = DataTypes.STRING;
    }
}

Seller.init(
    {
        listedProducts: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true,
        },
        orderHistory: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "Seller",
    }
);

module.exports = Seller;