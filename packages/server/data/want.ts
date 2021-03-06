import { db } from "./db";
import { Want } from "@wiw/types";

export const getAllWants = (): Promise<Want[]> => {
    return new Promise((resolve, reject) => {
        db.all("SELECT id, thing, category, cost FROM  wants;", (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

export const getWantById = (id: string): Promise<Want> => {
    return new Promise((resolve, reject) => {
        db.all("SELECT id, thing, category, cost FROM  wants WHERE id=$id;", {
            $id: id,
        }, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows[0] as Want);
            }
        });
    });
};

export const addWant = (thing: string, category: string, cost: number): Promise<string> => {
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

export const removeWant = (id: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM wants WHERE id=$id;", {
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
