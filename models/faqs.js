const Sequelize = require("sequelize");
const sequelize = require("../config/db.js");



const Categoria = sequelize.define('categoria',{
    nomept:{
        type: Sequelize.STRING,
        unique: true,
        allowNull:false
    },
    nomeen:{
        type: Sequelize.STRING,
        unique: true,
        allowNull:false
    },
    nomefr:{
        type: Sequelize.STRING,
        unique: true,
        allowNull:false
    }

})

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

Categoria.hasMany(Faqs)
// Faqs.hasMany(Categoria)

Categoria.sync()
Faqs.sync()


module.exports = Faqs

