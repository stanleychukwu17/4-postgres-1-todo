import { Express, Request, Response, NextFunction } from "express";

const routes = (app: Express) => {
    app.get('/', (req: Request, res: Response) => {
        res.json({msg:'we are good!'})
    })
}

export default routes