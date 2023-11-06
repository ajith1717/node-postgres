const { logger } = require("./config/pino-config");
const { create, findAll } = require("./data-access/sampleDAO");
const { deleteAllUsers } = require("./data-access/user");
const sequelize = require("./models/postgres");
const app = require("./server")
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000;

sequelize
    // .sync() // Sync the models with the database
    .sync({ alter: true })
    .then(() => {
        console.log('Database and tables synced.');
    })
    .catch(err => {
        console.error('Error syncing the database:', err);
    });


app.listen(port, () => {
    logger.info(`Server is running on Port ${port}`)
    console.log(`Server is running on Port ${port}`,)
});


// deleteAllUsers()
