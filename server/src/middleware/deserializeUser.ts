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
    if (expired === false) {
        //@ts-ignore
        if (payload.session_fid != session_fid) {
            return next()
        }
    
        // get the session details and makes sure the session is active
        const session_dts = await get_this_session_details(session_fid as unknown as number, 'no')
        const user_id = session_dts.user_id
    
        // For a valid access token
        if (payload && user_id > 0) {
            // @ts-ignore
            req.loggedInDts = {session_fid, user_id}
            return next()
        }
    }

    // expired but valid refresh token
    // FAILED: uncomment the below
    // const { payload: refresh } = expired && refreshToken ? verifyJWT(refreshToken as string) : { payload: null };
    // if (!refresh) {
    //     return next();
    // }


    // FAILED: delete the below
    const { payload: refresh } = verifyJWT(refreshToken as string)

    // @ts-ignore
    const session = await get_this_session_details(refresh.session_fid as unknown as number)
    if (session.num_rows <= 0 || session.user_id <= 0) {
        return next();
    }

    // NOTE:
    // if payload has expired, then create new access token and let the return know that there is a new access token

    console.log(process.env.JWT_TIME_2 as string)
    return next();
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