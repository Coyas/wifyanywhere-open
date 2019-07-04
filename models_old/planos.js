const Sequelize = require("sequelize");
const sequelize = require("../config/db.js");


const Planos = sequelize.define('planos',{
    nome:{
        type: Sequelize.STRING,
        allowNull:false
    },
    qtd_megas:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    preco:{
        type: Sequelize.DOUBLE(9,2),
        allowNull: false
    },
    download:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    upload:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
    }
})
 
Planos.sync()


module.exports = Planos