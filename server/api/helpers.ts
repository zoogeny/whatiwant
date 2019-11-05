import { Response } from "express";

export const serverError = (res: Response, description: string, status: number= 500) => {
    res.status(status);
    res.json({ error: { description } });
};
