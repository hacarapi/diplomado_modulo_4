//npm install --save-dev nodemon
//npm install -g nodemon
import app from './app.js';
import sequelize from './database/database.js';
//npm install dotenv
import 'dotenv/config';
import logger from "./logs/logger.js";

async function main(){
    console.log(process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD)
    //const port = app.get('port');
    //await sequelize.sync();
    await sequelize.sync({force: true});
    //await sequelize.sync({force: false});
    const port = process.env.PORT;
    app.listen(port);
    console.log('listening on port', port);
    logger.info(`Server started on port ${port}`);
    logger.error(`Server started on port ${port}`);
    logger.warn(`Server started on port ${port}`);
    logger.fatal(`Server stopped on port ${port}`);
}

main();