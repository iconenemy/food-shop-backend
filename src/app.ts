import express from 'express';
import cookieParser  from 'cookie-parser'
import config from 'config'

import connectDB from './utils/connect.db';
import AppRouter from './routes/routes';

const PORT = config.get<number>('port') || 5000

const app = express()
const router = new AppRouter(app)

// Express configuration
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())


router.init()

app.listen(PORT, () => {
    console.log(`Server has been start on port ${PORT}...`)
    connectDB()
})
