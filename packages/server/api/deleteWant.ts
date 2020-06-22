import { RequestHandler } from "express";

import { Want } from "@wiw/types";
import { getWantById, removeWant } from "../data/want";
import { serverError } from "./helpers";
import logger from "../logging/logger";

const localLogger = logger.localLogger("server/deleteWant");

const deleteWant: RequestHandler = async (req, res) => {
    const requestId = req.params.id;

    let want: Want;
    try {
        want = await getWantById(requestId);
    } catch (error) {
        localLogger.error("Unable to find want", error, { requestId });
        serverError(res, `Unable to find want with id ${ requestId }: ${ error }`);
        return;
    }

    try {
        await removeWant(requestId);
    } catch (error) {
        localLogger.error("Unable to delete want", error, { requestId });
        serverError(res, `Unable to delete want from data store: ${ error }`);
        return;
    }

    res.json({
        error: null,
        ...want,
    });
};

export default deleteWant;
