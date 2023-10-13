import { Express, Request, Response, NextFunction } from "express";
import {register_a_new_user, login_this_user, logout_this_user} from './controllers/users.controller'
import {log, errorLogger} from './logger/'
import {show_bad_message, show_good_message } from "./functions/utils";
import { requireUser } from "./middleware/requireUser";
import { add_a_new_item_to_this_user_todoList } from "./controllers/todo.controller";

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

    // this route logsIn a new user
    app.post('/users/login', async (req: Request, res: Response) => {
        const dts = await login_this_user(req.body)
        res.json(dts)
    })

    // this route logout the user
    app.post('/users/logout', async (req: Request, res: Response) => {
        const dts = await logout_this_user(req.body)
        res.json(dts)
    })
    //--END--

    //--START-- routes for todo and everything that has to do with the todo
    app.post('/todo/new_todo', requireUser, async (req: Request, res: Response) => {
        // console.log(req.body)
        //@ts-ignore
        const newTodo = await add_a_new_item_to_this_user_todoList({user_id:req.loggedInDts.user_id, details:req.body.details})
        res.json(newTodo)
    })
    //--END--
}

export default routes