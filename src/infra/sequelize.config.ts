import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

// local
const sequelizeConfig = new Sequelize({
  host: process.env.HOST,
  database: process.env.DATABASE,
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD,
  dialect: "postgres",
  ssl: false,
  logging: false,
});

export { sequelizeConfig };
