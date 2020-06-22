import { RequestHandler } from "express";

import { addWant } from "../data/want";
import { serverError } from "./helpers";
import logger from "../logging/logger";

const localLogger = logger.localLogger("server/addWant");

const add: RequestHandler = async (req, res) => {
    const { thing, category, cost } = req.body;

    let id;
    try {
        id = await addWant(thing, category, cost);
    } catch (error) {
        localLogger.error("Unable to add want", error, { thing, category, cost });
        serverError(res, `Unable to add want to data store: ${ error }`);
        return;
    }

    res.json({
        error: null,
        id,
    });
};

export default add;
