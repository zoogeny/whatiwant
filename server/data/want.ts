import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./server/data/wants.sqlite3");

export const getAllWants = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT id, thing, category, cost FROM  wants;`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

export const getWantById = (id: string) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT id, thing, category, cost FROM  wants WHERE id=$id;`, {
            $id: id,
        }, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows[0]);
            }
        });
    });
};

export const addWant = (thing: string, category: string, cost: number) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`
                INSERT INTO wants (thing, category, cost)
                    VALUES ($thing, $category, $cost);`,
                {
                    $thing: thing,
                    $category: category,
                    $cost: cost,
                }, err => {
                    if (err) {
                        reject(err);
                    }
                });

            db.all("SELECT last_insert_rowid()", {}, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const id = rows[0]["last_insert_rowid()"];
                    resolve(id);
                }
            });
        });
    });
};

export const removeWant = (id: string) => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM wants WHERE id=$id;`, {
            $id: id,
        }, err => {
            if (err) {
                reject(err);
            } else {
                resolve(id);
            }
        });
    });
};
