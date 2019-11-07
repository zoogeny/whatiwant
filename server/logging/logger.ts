import winston from "winston";

export enum LogLevel {
    INFO = "info",
    DEBUG = "debug",
    WARN = "warn",
    ERROR = "error",
}

type LogFunction = (location: string, message: string, err?: Error, properties?: object) => void;
interface ILogger {
    debug: LogFunction;
    info: LogFunction;
    warn: LogFunction;
    error: LogFunction;
    localLogger: (location: string, localProperties?: object) => ILocalLogger;
}

type LocalLogFunction = (message: string, err?: Error, properties?: object) => void;
interface ILocalLogger {
    debug: LocalLogFunction;
    info: LocalLogFunction;
    warn: LocalLogFunction;
    error: LocalLogFunction;
}

type LoggerParams = {
    level?: LogLevel,
};

const logger = winston.createLogger({
    level: LogLevel.INFO,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
    ),
    transports: [
        new winston.transports.Console({}),
    ],
});

export const configureLogger = (params?: LoggerParams): void => {
    logger.level = params?.level ?? LogLevel.INFO;
};

const debug = (location: string, message: string, err?: Error, properties?: object) => {
    logger.debug(combineMessage(location, message, err, properties));
};

const info = (location: string, message: string, err?: Error, properties?: object) => {
    logger.info(combineMessage(location, message, err, properties));
};

const warn = (location: string, message: string, err?: Error, properties?: object) => {
    logger.warn(combineMessage(location, message, err, properties));
};

const error = (location: string, message: string, err?: Error, properties?: object) => {
    logger.error(combineMessage(location, message, err, properties));
};

const localLogger = (location: string, localProperties?: object): ILocalLogger => ({
    debug: (m: string, e?: Error, p?: object) => debug(location, m, e, { ...localProperties, ...p }),
    info: (m: string, e?: Error, p?: object) => info(location, m, e, { ...localProperties, ...p }),
    warn: (m: string, e?: Error, p?: object) => warn(location, m, e, { ...localProperties, ...p }),
    error: (m: string, e?: Error, p?: object) => error(location, m, e, { ...localProperties, ...p }),
});

const appLogger: ILogger = { debug, info, warn, error, localLogger };

export default appLogger;

const combineMessage = (location: string, message: string, err?: Error, properties?: object) => {
    const messageParts = [`${location}: ${message}`];
    if (err && err.stack) {
        messageParts.push(err.stack);
    }
    if (properties && Object.keys(properties).length > 0) {
        messageParts.push(JSON.stringify(properties));
    }
    return messageParts.join(" - ");
};
