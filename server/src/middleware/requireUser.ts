import { NextFunction, Request, Response } from "express";

export function requireUser(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    if (!req.loggedInDts) {
        // @ts-ignore
        return res.json({'msg':'bad', 'from':'requireUser middleware', 'cause':'Please login to your account to continue'});
    }
  
    return next();
}