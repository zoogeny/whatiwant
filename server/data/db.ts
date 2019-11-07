import path from "path";
import sqlite3 from "sqlite3";
export const db = new sqlite3.Database(path.resolve(__dirname, "wants.sqlite3"));
