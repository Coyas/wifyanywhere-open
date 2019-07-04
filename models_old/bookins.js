const Sequelize = require("sequelize");
const sequelize = require("../config/db.js")
const pagamento = require('./pagamento')


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
        type: Sequelize.STRING,
        allowNull:true
    }
})
 
Bookins.hasMany(pagamento)
Bookins.sync()


module.exports = Bookins