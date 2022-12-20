import {Options} from "sequelize";

export const dbconfig:{development:Options,test:Options,production:Options} = {
  development: {
    username: "tttruck",
    password: "haemin1234!",
    database: "tttruck_db",
    host: "db.tttruck.co.kr",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: "null",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "tttruck",
    password: "haemin1234!",
    database: "tttruck_db",
    host: "db.tttruck.co.kr",
    dialect: "mysql",
  },
};