import { Application } from 'express';

import userRouter from './api/user.route'

class AppRouter {
    constructor(private app: Application){}
    init() {
        this.app.get('/', (req, res) =>{
            res.send('Main page')
        })
        this.app.use('/api/user', userRouter)
    }
}

export default AppRouter;