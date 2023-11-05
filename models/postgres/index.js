const Sequelize = require('sequelize');
const CONFIG = require('../../config/keys').CONFIG
const env = process.env.NODE_ENV || 'DEVELOPMENT';

const sequelize = new Sequelize(CONFIG[env].Postgres.database, CONFIG[env].Postgres.database, CONFIG[env].Postgres.password, {
    host: CONFIG[env].Postgres.host,
    dialect: CONFIG[env].Postgres.dialect,
    port: 5432, // Default PostgreSQL port
});

module.exports = sequelize;

