const Sequelize = require("sequelize");
const sequelize = require("../config/db.js");


const Faqs = sequelize.define('faqs',{
    title:{
        type: Sequelize.STRING,
        unique: true,
        allowNull:false
    },

    descricao:{
        type: Sequelize.STRING,
    },

    lingua:{
        type: Sequelize.STRING,
    }
})

// Faqs.belongsTo(Categoria);
// Faqs.sync();

module.exports = Faqs

