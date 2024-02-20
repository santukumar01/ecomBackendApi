
// import fs from 'fs'

// const fsPromise = fs.promises;

// async function log(logData) {
//     try {
//         logData = `\n ${new Date().toString()} -${logData}`;

//         fsPromise.appendFile('log.txt', logData);
//     }
//     catch (err) {
//         console.log(err);
//     }
// }


// const logMiddleware = async (req, res, next) => {
//     // log request body
//     // await log(req.body);

//     if (!req.url.includes('signin')) {
//         const logData = `${req.url} - ${JSON.stringify(req.body)} `
//         await log(logData);
//     }

//     next();
// }
//configure to use winston library

import winston from "winston";

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: 'logger.txt'
        })
    ]
})

const logMiddleware = async (req, res, next) => {
    // log request body
    // await log(req.body);

    const logData = `${req.url} - ${JSON.stringify(req.body)} `;
    logger.info(logData);

    next();
}


export default logMiddleware;
