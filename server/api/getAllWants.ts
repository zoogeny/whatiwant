import { RequestHandler } from "express";

import { serverError } from "./helpers";
import { getAllWants } from "../data/want";

const getAll: RequestHandler = async (req, res) => {
    let wants;
    try {
        wants = await getAllWants();
    } catch (err) {
        serverError(res, `Unable to load wants: ${ err.description }`);
        return;
    }

    res.json({
        error: null,
        wants,
    });
};

export default getAll;
