import { Response } from "express";

export const serverError = (res: Response, description: string, status= 500) => {
    res.status(status);
    res.json({ error: { description } });
};
