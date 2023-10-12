import { NextFunction, Request, Response } from "express";

export function requireUser(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    if (!req.user) {
        // @ts-ignore
        return res.json({'msg':'bad', 'from':'requireUser.ts'});
    }
  
    return next();
}