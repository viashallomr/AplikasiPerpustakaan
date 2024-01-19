import {Sequelize} from "sequelize";

const db = new Sequelize('db_tugasbesar', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db; 