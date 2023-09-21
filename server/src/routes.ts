import { Express, Request, Response, NextFunction } from "express";
import {register_a_new_user} from './controllers/users.controller'

const routes = (app: Express) => {
    //--START-- routes for user and everything that has to do with the user
    app.post('/users/new_user', async (req: Request, res: Response) => {

        const dts = await register_a_new_user(req.body)
        console.log(dts)

        res.json({msg:'we are good!'})
    })


    //--START-- routes for todo and everything that has to do with the todo
}

export default routes