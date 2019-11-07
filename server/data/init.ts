import { db } from "./db";

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS wants;", err => {
        if (err) {
            console.error(err);
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
                console.error(err);
            } else {
                console.log("Database initialization success");
            }
        });
});
