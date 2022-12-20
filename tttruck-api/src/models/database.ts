import {Options, Sequelize} from 'sequelize';
import {dbconfig} from '../sql/dbconfig';

// export const sequelize = new Sequelize('typescript_test', 'root','Jaehyeon2!',{
//     host : 'localhost',
//     dialect : 'mysql',
// })
let config:Options;
if (process.env.NODE_ENV === "production") {
  config = dbconfig.production;
} else if (process.env.NODE_ENV === "test") {
  config = dbconfig.test;
} else {
  config = dbconfig.development;
}
export const sequelize = new Sequelize(
  config,
);
