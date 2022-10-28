import { Application } from 'express';

import authRouter from './api/auth.route'

class AppRouter {
    constructor(private app: Application){}
    init() {
        this.app.get('/', (req, res) =>{
            const a = 5
            const b = 10
            const result = a + b
            res.status(200).json({res: result})

        })
        this.app.use('/api/auth', authRouter)
    }
}

export default AppRouter;