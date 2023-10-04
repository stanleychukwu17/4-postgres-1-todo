import { Express, Request, Response, NextFunction } from "express";
import {register_a_new_user, login_this_user} from './controllers/users.controller'
import {log, errorLogger} from './logger/'

const routes = (app: Express) => {
    // checks to see if our servers are running as they should
    app.get('/healthCheck', (req, res) => {
        const currentFilename = __filename;
        log.info({currentFilename}, 'checking my log')
        res.json('its all good')
    })

    //--START-- routes for users
    // this route registers a new user
    app.post('/users/new_user', async (req: Request, res: Response) => {
        const dts = await register_a_new_user(req.body)
        res.json(dts)
    })

    // this route registers a new user
    app.post('/users/login', async (req: Request, res: Response) => {
        const dts = await login_this_user(req.body)
        res.json(dts)
    })
    //--END--

    //--START-- routes for todo and everything that has to do with the todo
}

export default routes