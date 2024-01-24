// --- Dependencies ---
import express from 'express'

// --- Controllers
import TestController from '../application/controllers/TestController'

// --- Middleware
import { CheckAccessToken } from '../core/middlewares/JWTMiddleware'

// --- Router
export default function TestRouter() {
	// --- Variables
	const app = express.Router()

	// --- Route
	app.get('/', TestController.Test)
	app.get('/token', TestController.Token)
	app.get('/protect', CheckAccessToken, TestController.Protected)

	// --- Return router
	return app
}
