// --- Dependencies ---
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

// --- Helpers ---
import { ResponseHelper } from '../helpers/ResponseHelper'
import { PhraseTranslation } from '../helpers/TranslationHelper'
import {
	ParseAuthorization,
	VerifyRefreshToken,
	GenerateAccessToken
} from '../helpers/JWTHelper'
import { GetCache, DelCache, UpdateCache } from '../helpers/CacheHelper'

// --- Interfaces ---
import { TokenPayload } from '../../application/interfaces/JWTInterface'

// --- Middleware ---
export const CheckAccessToken = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// --- Check if authorization header exists ---
	if (req.headers.authorization) {
		// --- Variables ---
		let authorizationToken = ParseAuthorization(req.headers.authorization)

		// --- Check validity JWT token ---
		try {
			let payload: TokenPayload = verify(
				authorizationToken,
				process.env.JWT_SECRET!
			) as TokenPayload

			// --- Set headers ---
			res.locals.accessToken = authorizationToken

			// --- Check that refresh token has not expired ---
			if (Object.keys(payload).length === 0 || payload.exp * 1000 < Date.now()) {
				// --- Return error ---
				res.status(401).json(
					ResponseHelper(
						false,
						401,
						PhraseTranslation(res, 'error.invalidRefreshToken'),
						{},
						true
					)
				)

				// --- Return error ---
				return
			}

			next()
		}catch (err){
			// --- Variables ---
			let sessionID = req.headers.session as string

			// --- Find session ---
			let sessionFind: TokenPayload | null = (await GetCache(
				sessionID,
			)) as TokenPayload

			// --- Check validity refresh token ---
			try {
				let payload: TokenPayload = await VerifyRefreshToken(sessionFind.session)

				// --- Generate new tokens and set headers ---
				res.locals.accessToken = await GenerateAccessToken({
					isAdmin: payload.isAdmin,
					session: payload.session
				})
			} catch (err) {
				// --- Error handler ---
				res.status(401).json(
					ResponseHelper(
						false,
						401,
						PhraseTranslation(res, 'error.invalidToken'),
						{},
						true
					)
				)

				// --- Return error ---
				return
			}
		}

		// --- Next middleware ---
		next()
	} else {
		// --- Error handler ---
		res.status(401).json(
			ResponseHelper(
				false,
				401,
				PhraseTranslation(res, 'error.invalidToken'),
				{},
				true
			)
		)
	}
}
