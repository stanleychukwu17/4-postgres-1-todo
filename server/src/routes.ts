import { Express, Request, Response, NextFunction } from "express";

const routes = (app: Express) => {
    // routes for user and everything that has to do with the user
    app.post('/users/new_user', (req: Request, res: Response) => {
        const {name, password, gender} = req.body

        console.log(req.body)
        res.json({msg:'we are good!'})
    })


    // routes for todo and everything that has to do with the todo
}

export default routes