// --- Dependencies ---
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import socketIO from 'socket.io'

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
export const CheckSocketAccessToken = async (socket:socketIO.Socket, next:any) => {
	// --- Check if authorization header exists ---
	if (socket.handshake.auth.token) {
		// --- Variables ---
		let authorizationToken = ParseAuthorization(socket.handshake.auth.token)

		// --- Check validity JWT token ---
		try {
			let payload: TokenPayload = verify(
				authorizationToken,
				process.env.JWT_SECRET!
			) as TokenPayload

			// --- Set headers ---
			//res.set('authorization', authorizationToken)

			// --- Select refresh token ---
			let refreshToken = await VerifyRefreshToken(payload.session)

			// --- Check that refresh token has not expired ---
			if (!refreshToken || refreshToken.exp * 1000 < Date.now()) {
				console.log(1, 'error invalid refresh token')
				// --- Return error ---
				/*res.status(401).json(
					ResponseHelper(
						false,
						401,
						PhraseTranslation(res, 'error.invalidRefreshToken'),
						{},
						true
					)
				)*/

				// --- Return error ---
				return
			}
		} catch (err) {
			// --- Variables ---
			let sessionID = socket.handshake.auth.session as string

			// --- Find session ---
			let sessionFind: TokenPayload | null = (await GetCache(
				sessionID,
			)) as TokenPayload

			// --- Check validity refresh token ---
			try {
				let payload: TokenPayload = verify(
					String(sessionFind?.refresh) as string,
					process.env.JWT_REFRESH_SECRET!,
				) as TokenPayload

				// --- Delete cache ---
				await DelCache(sessionID)

				// --- Generate new tokens ---
				let accessToken = await GenerateAccessToken({
					isAdmin: payload.isAdmin,
					session: payload.session,
					socket: socket.id
				})

				// --- Set headers ---
				socket.emit('authorization', accessToken)

				console.log(-3.1, accessToken)
				console.log(-3.2, socket.id)
			} catch (err) {
				// --- Error handler ---
				console.log(2, 'error invalid token')
				/*res.status(401).json(
					ResponseHelper(
						false,
						401,
						PhraseTranslation(res, 'error.invalidToken'),
						{},
						true
					)
				)*/

				// --- Return error ---
				return
			}
		}

		// --- Update cache ---
		await UpdateCache(socket.handshake.auth.session, { socket: socket.id })

		// --- Return next ---
		next()
	} else {
		// --- Error handler ---
		console.log(3, 'error invalid token')
		/*res.status(401).json(
			ResponseHelper(
				false,
				401,
				PhraseTranslation(res, 'error.invalidToken'),
				{},
				true
			)
		)*/
	}
}
