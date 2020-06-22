import { RequestHandler } from "express";

import { serverError } from "./helpers";
import { getAllWants } from "../data/want";
import logger from "../logging/logger";

const localLogger = logger.localLogger("server/getAllWants");

const getAll: RequestHandler = async (req, res) => {
    let wants;
    try {
        wants = await getAllWants();
    } catch (err) {
        localLogger.error("Unable to load all wants:", err);
        serverError(res, `Unable to load wants: ${ err.description }`);
        return;
    }

    res.json({
        error: null,
        wants,
    });
};

export default getAll;
