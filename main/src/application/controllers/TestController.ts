// --- Dependencies ---
import { Response, Request } from 'express'

// --- Helpers ---
import {
	GenerateAccessToken,
} from '../../core/helpers/JWTHelper'
import { ResponseHelper } from '../../core/helpers/ResponseHelper'

// --- Class & Function: TestController ---
export default class TestController {
	// --- Method: Test
	static async Test(req: Request, res: Response) {
		// --- Return
		return res.json({
			message: 'Hello World!',
		})
	}

	static async Token(req: Request, res: Response) {
		let obj = {
			session: '263dc7b9-8019-48f9-9d27-3dedfff543e8',
			isAdmin: false,
		}

		// --- Return
		return res.json(
			ResponseHelper(true, 200, 'OK', {
				token: await GenerateAccessToken(obj),
			}),
		)
	}

	static async Protected(req: Request, res: Response) {
		res.set('authorization', res.locals.accessToken)
		console.log('TOKEN CONTROLLER', res.locals.accessToken)

		// --- Return
		return res.json(
			ResponseHelper(true, 200, 'OK', {
				id: '263dc7b9-8019-48f9-9d27-3dedfff543e8',
			}),
		)
	}
}
