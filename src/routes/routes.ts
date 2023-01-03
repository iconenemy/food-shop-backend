import { Application } from 'express';

import authRouter from './api/auth.route'
import adminRouter from './api/admin.route'
import foodRouter from './api/food.route'

class AppRouter {
    constructor(private app: Application){}
    init() {

        this.app.get('/', (req, res) =>{
            res.status(200)
        })

        this.app.use('/api/auth', authRouter)
        
        this.app.use('/api/admin', adminRouter)

        this.app.use('/api/food', foodRouter)
    }
}

export default AppRouter;