import express, { NextFunction } from 'express';
import cookieParser  from 'cookie-parser'
import config from 'config'
import cors from 'cors'

import connectDB from './utils/connect.db';
import AppRouter from './routes/routes';

const PORT = config.get<number>('port') || 5000

const app = express()
const router = new AppRouter(app)

// Express configuration
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

router.init()

app.listen(PORT, () => {
    console.log(`Server has been start on port ${PORT}...`)
    connectDB()
})
