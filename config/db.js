const Sequelize = require("sequelize");
require('dotenv').config();

console.log("variaveis do hanbiente do dbjs")
console.log(process.env.DBNAME)
console.log(process.env.HOST)
console.log(process.env.USERS)
console.log(process.env.DB_PASSWORD)
console.log("fim variaveis do hanbiente do dbjs")

const sequelize = new Sequelize(
    process.env.DBNAME,
    process.env.USERS,
    process.env.DB_PASSWORD,
    {
        host: process.env.HOST,
        dialect: 'mysql'
    },
);

// const sequelize = new Sequelize(
//     'wifianywhere',
//     'root',
//     '',
//     {
//         host: 'localhost',
//         dialect: 'mysql'
//     }
// );

sequelize.authenticate().then(() => {
    console.log("conectado ao db com sucesso");
}).catch((erro) => {
    console.log("Falha ao conectar com o db(wifianywhere) " + erro);
});
module.exports = sequelize