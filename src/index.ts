import './pre-start'; // Must be the first import
import logger from 'jet-logger';

import EnvVars from '@src/declarations/major/EnvVars';
import server from './server';
import { sequelize } from "./models/database";
import { initModels } from "./models/init-models";

// **** Start server **** //

const msg = ('Express server started on port: ' + EnvVars.port.toString());
server.listen(EnvVars.port, async () => {
    logger.info(msg)
    await sequelize.authenticate()
        .then(async () => {
            console.log("connection success");
        })
        .catch((e) => {
            console.log('TT : ', e);
        })
    let models = initModels(sequelize);
    let value = await models.tt_product.findAll();
    logger.info(value)
});
