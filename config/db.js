const Sequelize = require("sequelize");
const keys = require('../config/keys.json')

console.log("variaveis do hanbiente do dbjs")
console.log(keys.mysql.host)
console.log(keys.mysql.dbname)
console.log(keys.mysql.user)
console.log(keys.mysql.pass)
console.log(keys.mysql.dialect)
console.log("fim variaveis do hanbiente do dbjs")

const sequelize = new Sequelize(
    keys.mysql.dbname,
    keys.mysql.user,
    keys.mysql.pass,
    {
        host: keys.mysql.host,
        dialect: keys.mysql.dialect
    },
);


sequelize.authenticate().then(() => {
    console.log("conectado ao db com sucesso");
}).catch((erro) => {
    console.log("Falha ao conectar com o db(wifianywhere) " + erro);
});
module.exports = sequelize