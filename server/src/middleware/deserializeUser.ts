import { NextFunction, Request, Response } from "express";
import { signJWT, verifyJWT } from "../functions/jwt.utils";
import { get_this_session_details } from "../controllers/users.controller";

async function deserializeUser(req: Request, res: Response, next: NextFunction) {
    let { accessToken, refreshToken, session_fid } = req.query;

    // if the access token and refresh token are not in the req.query(GET request), then we try to see if we can get them from the req.body(POST request)
    if (!accessToken && !refreshToken) {
        accessToken = req.body.accessToken
        refreshToken = req.body.refreshToken
        session_fid = req.body.session_fid
    }

    // no access token, we move!
    if (!accessToken) {
        return next();
    }

    const { payload, expired } = verifyJWT(accessToken as string);

    // the session_fid received from the request should be the same as the one from the payload
    //@ts-ignore
    if (payload.session_fid != session_fid) {
        return next()
    }

    const session_dts = await get_this_session_details(session_fid as unknown as number)
    console.log(session_dts)
    return next()
    // use the session_fid to return the user id only if the accessToken is active
    // add the info returned to the req.loggedInDts
    // if payload has expired, then create new access token and let the return know that there is a new access token

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