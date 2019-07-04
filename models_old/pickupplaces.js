const Sequelize = require("sequelize");
const sequelize = require("../config/db.js");

const   PickupPlaces = sequelize.define('pickupplaces',{

    place:{
        type: Sequelize.STRING,
        allowNull: false
    }
})
PickupPlaces.sync()

module.exports = PickupPlaces