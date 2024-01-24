// --- Dependencies ---
import { JwtPayload, sign, verify } from 'jsonwebtoken'

// --- Type ---
import { TokenPayload } from '../../application/interfaces/JWTInterface'

// --- Helpers ---
import { GetCache, SetCache, UpdateCache } from './CacheHelper'

// --- Generate access token ---
export const GenerateAccessToken = async (user: {
	isAdmin: boolean
	session: string | undefined
	socket?: string | null
}): Promise<string> => {
	// --- Variables ---
	let payload: JwtPayload = {
		session: user.session,
		isAdmin: user.isAdmin,
		socket: user.socket,
		refresh: GenerateRefreshToken({ session: user.session }),
	}
	let getCache = await GetCache(String(user.session))

	// --- Check if cache exists ---
	if(getCache === null) {
		// --- Set cache ---
		await SetCache(String(user.session), payload)
	}else {
		// --- Update cache ---
		await UpdateCache(String(user.session), {...getCache, refresh: payload.refresh})
	}

	// --- Return token ---
	return sign(payload, process.env.JWT_SECRET!, {
		expiresIn: process.env.JWT_EXPIRATION!,
	})
}

// --- Generate refresh token ---
export const GenerateRefreshToken = (user: {
	session: string | undefined
}): string => {
	// --- Variables ---
	let payload: JwtPayload = {
		session: user.session,
	}

	// --- Return token ---
	return sign(payload, process.env.JWT_REFRESH_SECRET!)
}

// --- Parse authorization ---
export const ParseAuthorization = (authorization: string): string => {
	return <string>authorization!.replace('Bearer ', '')
}

// --- Verify refresh token ---
export const VerifyRefreshToken = async (
	sessionID: string,
): Promise<TokenPayload> => {
	// --- Find session ---
	let sessionFind:TokenPayload | null = await GetCache(sessionID) as TokenPayload

	// --- Check if user exists ---
	return verify(String(sessionFind.refresh), process.env.JWT_REFRESH_SECRET!) as TokenPayload
}
