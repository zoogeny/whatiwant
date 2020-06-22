import { db } from "./db";
import logger from "../logging/logger";

const localLogger = logger.localLogger("server/addWant");

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS wants;", err => {
        if (err) {
            localLogger.error("Unable to drop table", err);
        }
    });

    db.run(`
        CREATE TABLE wants (
            id INTEGER PRIMARY KEY,
            thing TEXT NOT NULL,
            category TEXT NOT NULL,
            cost INTEGER NOT NULL
        );
        `, err => {
        if (err) {
            localLogger.error("Error creating table", err);
        } else {
            localLogger.info("Database initialization success");
        }
    });
});
