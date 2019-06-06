const Sequelize = require("sequelize");


/*const sequelize = new Sequelize(
    process.env.DBNAME,
    process.env.USERS,
    process.env.DB_PASSWORD,
    {
        host: process.env.HOST,
        dialect: 'mysql'
    }
);*/
const sequelize = new Sequelize(
    'wifianywhere',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
    console.log("conectado ao db com sucesso");
}).catch((erro) => {
    console.log("Falha ao conectar com o db(wifianywhere) " + erro);
});
module.exports = sequelize