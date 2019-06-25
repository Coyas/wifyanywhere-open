const Sequelize = require("sequelize");
const sequelize = require("../config/db.js");


const Bookins = sequelize.define('bookins',{
    pickupDate:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    },
    numDias: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    flynumber:{
        tye: Sequelize.STRING,
        allowNull:true
    }
})
 
Bookins.sync()


module.exports = Bookins