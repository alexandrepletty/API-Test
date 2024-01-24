// --- Dependencies ---
import express from 'express'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'

// --- Dev Dependencies ---
import morgan from 'morgan'

// --- Import middleware ---
import { InitTranslation } from './core/middlewares/TranslationMiddleware'
import { CooldownMiddleware } from './core/middlewares/CooldownMiddleware'

// --- Files
import { version } from '../package.json'

// --- Variables
const app: express.Application = express() // --- Create express app
const routeVersion: string = `/v${version.split('.')[0]}` // --- Get version

// --- Middleware
app.use(cors({
	exposedHeaders: ['Authorization']
})) // --- Allow cross-origin
app.use(helmet()) // --- Security
app.use(morgan('dev')) // --- Log
app.use(express.json()) // --- Parse json
app.use(bodyParser.urlencoded({ extended: true })) // --- Parse urlencoded
app.use(bodyParser.json()) // --- Parse json
app.use(InitTranslation) // --- Translation middleware
app.use(CooldownMiddleware) // --- Cool down middleware

// --- Route
import TestRouter from './routes/TestRouter'

// --- Router
app.use(`${routeVersion}/test`, TestRouter())

// --- Return app
export default app
