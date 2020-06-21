import express from "express";
import path from "path";

import logger, { configureLogger, LogLevel } from "./logging/logger";
import api from "./api/api";

const localLogger = logger.localLogger("server/index");
if (process.env.NODE_ENV === "production") {
    configureLogger({ level: LogLevel.WARN });
}

const app = express();
const PORT = process.env.PORT || 4000;

// serve static files
app.use(express.static(path.join(__dirname, "..", "build/")));

// serve client app
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

// add API
app.use("/api", api);

app.listen(PORT, () => {
    localLogger.info(`Check out the app at http://localhost:${PORT}`);
});
