import { Response } from "express";

export const serverError = (res: Response, description: string, status= 500): void => {
    res.status(status);
    res.json({ error: { description } });
};
