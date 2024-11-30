//npm install pino pino-pretty
import pino from 'pino';

const logger = pino({
    transport:{
        target:'pino-pretty',
        options:{
            translateTime : 'SYS:dd-mm-yyyy HH:mm:ss'
        },
    }
});

export default logger;