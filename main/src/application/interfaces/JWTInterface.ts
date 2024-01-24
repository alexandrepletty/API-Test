export interface TokenPayload {
	session: string
	isAdmin: boolean
	refresh: string
	token: string
	iat: number
	exp: number
}
