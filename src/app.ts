import express from 'express';
import config from 'config'

import AppRouter from './routes/routes';

const PORT = config.get<number>('port') || 5000

const app = express()
const router = new AppRouter(app)

// Express configuration
app.use(express.json())
app.use(express.urlencoded({extended: false}))


router.init()

app.listen(PORT, () => {
    console.log(`Server has been start on port ${PORT}...`)
})
