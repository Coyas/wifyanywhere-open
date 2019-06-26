const Sequelize = require("sequelize");
const keys = require('../config/keys.json')

console.log("variaveis do hanbiente do dbjs")
console.log(keys.server.host)
console.log(keys.server.dbname)
console.log(keys.server.user)
console.log(keys.server.pass)
console.log(keys.server.dialect)
console.log("fim variaveis do hanbiente do dbjs")

const sequelize = new Sequelize(
    keys.server.dbname,
    keys.server.user,
    keys.server.pass,
    {
        host: keys.server.host,
        dialect: keys.server.dialect
    },
);


sequelize.authenticate().then(() => {
    console.log("conectado ao db com sucesso");
}).catch((erro) => {
    console.log("Falha ao conectar com o db(wifianywhere) " + erro);
});
module.exports = sequelize