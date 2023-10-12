import { NextFunction, Request, Response } from "express";
// import { getSession } from "../db/index";
// import { signJWT, verifyJWT } from "../utils/jwt.utils";

function deserializeUser(req: Request, res: Response, next: NextFunction) {
    const { accessToken, refreshToken } = req.query;

    if (!accessToken) {
        return next();
    }

    const { payload, expired } = verifyJWT(accessToken as string);

    // For a valid access token
    if (payload) {
        // @ts-ignore
        req.user = payload;
        return next();
    }

    // expired but valid access token
    const { payload: refresh } = expired && refreshToken ? verifyJWT(refreshToken as string) : { payload: null };

    if (!refresh) {
        return next();
    }

    // @ts-ignore
    const session = getSession(refresh.sessionId);

    if (!session) {
        return next();
    }

    // creates a new access token
    const newAccessToken = signJWT(session, process.env.JWT_TIME_1 as string);

    // gets the user information from the new access token created
    const user = verifyJWT(newAccessToken).payload;

    // @ts-ignore
    user.accessToken = newAccessToken

    // @ts-ignore
    req.user = user;

    return next();
}
  
export default deserializeUser;