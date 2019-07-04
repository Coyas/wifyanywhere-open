const Sequelize = require("sequelize");
const sequelize = require("../config/db.js");

// class Pagamento extends Model {}
const Pagamento = sequelize.define('pagamento',{
    data:{
        type: Sequelize.DATE,
        allowNull:false
    },
    valor:{
        type: Sequelize.DOUBLE(5,2),
        allowNull:false
    },
    tipo:{ //0 - pagamento   / 1 - recaregar 
        type: Sequelize.SMALLINT,
        allowNull:false
    }
})
 
Pagamento.sync()


module.exports = Pagamento