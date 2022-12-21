import {Sequelize} from 'sequelize';

// export const sequelize = new Sequelize('typescript_test', 'root','Jaehyeon2!',{
//     host : 'localhost',
//     dialect : 'mysql',
// })

export const sequelize = new Sequelize(
  process.env.DB_DATABASE ? process.env.DB_DATABASE : "",
  process.env.DB_USERNAME ? process.env.DB_USERNAME : "",
  process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "",
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
  },
);
