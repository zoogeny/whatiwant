import winston from "winston";

export enum LogLevel {
    INFO = "info",
    DEBUG = "debug",
    WARN = "warn",
    ERROR = "error",
}

type PropBag = Record<string, unknown>;

type LogFunction = (location: string, message: string, err?: Error, properties?: PropBag) => void;
interface ILogger {
    debug: LogFunction;
    info: LogFunction;
    warn: LogFunction;
    error: LogFunction;
    localLogger: (location: string, localProperties?: PropBag) => ILocalLogger;
}

type LocalLogFunction = (message: string, err?: Error, properties?: PropBag) => void;
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

const debug = (location: string, message: string, err?: Error, properties?: PropBag): void => {
    logger.debug(combineMessage(location, message, err, properties));
};

const info = (location: string, message: string, err?: Error, properties?: PropBag): void => {
    logger.info(combineMessage(location, message, err, properties));
};

const warn = (location: string, message: string, err?: Error, properties?: PropBag): void => {
    logger.warn(combineMessage(location, message, err, properties));
};

const error = (location: string, message: string, err?: Error, properties?: PropBag): void => {
    logger.error(combineMessage(location, message, err, properties));
};

const localLogger = (location: string, localProperties?: PropBag): ILocalLogger => ({
    debug: (m: string, e?: Error, p?: PropBag) => debug(location, m, e, { ...localProperties, ...p }),
    info: (m: string, e?: Error, p?: PropBag) => info(location, m, e, { ...localProperties, ...p }),
    warn: (m: string, e?: Error, p?: PropBag) => warn(location, m, e, { ...localProperties, ...p }),
    error: (m: string, e?: Error, p?: PropBag) => error(location, m, e, { ...localProperties, ...p }),
});

const appLogger: ILogger = { debug, info, warn, error, localLogger };

export default appLogger;

const combineMessage = (location: string, message: string, err?: Error, properties?: PropBag) => {
    const messageParts = [`${location}: ${message}`];
    if (err && err.stack) {
        messageParts.push(err.stack);
    }
    if (properties && Object.keys(properties).length > 0) {
        messageParts.push(JSON.stringify(properties));
    }
    return messageParts.join(" - ");
};
