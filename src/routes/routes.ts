import { Application } from 'express';

class AppRouter {
    constructor(private app: Application){}
    init() {
        this.app.get('/', (req, res) =>{
            res.send('Main page')
        })
    }
}

export default AppRouter;