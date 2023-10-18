import { Express, Request, Response, NextFunction } from "express";
import {register_a_new_user, login_this_user, logout_this_user} from './controllers/users.controller'
import {log, errorLogger} from './logger/'
import {show_bad_message, show_good_message } from "./functions/utils";
import { requireUser } from "./middleware/requireUser";
import {
    add_a_new_item_to_this_user_todoList, get_all_of_this_user_todo_items, update_this_user_todo_item_to_completed, update_this_item_item_with_new_details, delete_this_item_from_the_todo_list
} from "./controllers/todo.controller";

const routes = (app: Express) => {
    // checks to see if our servers are running as they should
    app.get('/healthCheck', (req, res) => {
        const currentFilename = __filename;
        log.info({currentFilename}, 'checking my log')
        res.json('its all good')
    })

    // healthCheck for accessToken and refreshToken
    app.post('/healthCheck/accessToken', requireUser, (req, res) => {
        //@ts-ignore
        const new_token = req.body.loggedInDts.new_token || ''
        let returnMsg = {}

        if (new_token === 'yes') {
            returnMsg = {...show_good_message(), new_token, dts:req.body.loggedInDts}
        } else {
            returnMsg = show_good_message()
        }

        res.json(returnMsg)
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
    // adds a new item into a user todo list
    app.post('/todo/new_todo', requireUser, async (req: Request, res: Response) => {
        //@ts-ignore
        const newTodo = await add_a_new_item_to_this_user_todoList({user_id:req.loggedInDts.user_id, details:req.body.details})
        res.json(newTodo)
    })

    // returns all the items in a user todo list
    app.post('/todo/all_my_items', requireUser, async (req: Request, res: Response) => {
        // @ts-ignore
        const allTodo = await get_all_of_this_user_todo_items({user_id:req.loggedInDts.user_id, completed:'no'})
        res.json({...show_good_message(), ...allTodo})
    })

    // updates a todo to completed
    app.post('/todo/completed', requireUser, async (req: Request, res: Response) => {
        // @ts-ignore
        const allTodo = await update_this_user_todo_item_to_completed({user_id:req.loggedInDts.user_id, todo_id:req.body.id})
        res.json(show_good_message())
    })

    // updates an edited item in the list
    app.put('/todo/update_item', requireUser, async (req: Request, res: Response) => {
        //@ts-ignore
        const allTodo = await update_this_item_item_with_new_details({user_id:req.loggedInDts.user_id, todo_id:req.body.id, newDts:req.body.newDts})
        res.json(show_good_message())
    })

    // deletes an item from the list
    app.post('/todo/delete_item', requireUser, async (req: Request, res: Response) => {
        // @ts-ignore
        await delete_this_item_from_the_todo_list({user_id:req.loggedInDts.user_id, todo_id:req.body.id})
        res.json(show_good_message('successfully deleted'))
    })
    //--END--
}

export default routes