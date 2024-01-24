// --- Dependencies ---
import { Request, Response, NextFunction } from 'express'

// --- Helpers
import { PhraseTranslation } from '../helpers/TranslationHelper'
import { ResponseHelper } from '../helpers/ResponseHelper'

// --- Variables
let lastRequestTime: number = 0

// --- Middleware ---
export const CooldownMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// --- Variables ---
	let currentTime: number = Date.now() // --- Get current time
	let elapsedTime: number = currentTime - lastRequestTime // --- Get elapsed time
	let cooldown: number = 1000 // --- Cooldown in ms

	// --- Check cooldown ---
	if (elapsedTime > cooldown) {
		// --- Update last request time
		lastRequestTime = currentTime

		// --- Next ---
		next()
	} else {
		// --- Response ---
		res.status(429).json(
			ResponseHelper(
				false,
				429,
				PhraseTranslation(res, 'error.manyRequests'),
			),
		)
	}
}
