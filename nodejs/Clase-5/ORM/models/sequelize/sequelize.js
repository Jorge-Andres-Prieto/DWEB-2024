import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('moviesdb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

export default sequelize;
