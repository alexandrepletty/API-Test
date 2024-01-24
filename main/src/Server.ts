// --- Dependencies ---
import http from 'http'
import mongoose from 'mongoose'

// --- App ---
import app from './App'

// --- Helpers ---
import { PortHelper } from './core/helpers/UtilsHelper'
import { ErrorServerHelper } from './core/helpers/ErrorServerHelper'
import { Ready, Error } from './core/helpers/LogHelper'
import { RedisConnect } from './core/helpers/CacheHelper'

// --- Modules ---
import { SocketModule } from './core/modules/SocketModule'

// --- Variables ---
const port: boolean | number = PortHelper(Number(process.env.PORT) || 3000) // --- Get port

// --- Middleware ---
app.set('port', port)

// --- Connect database ---
mongoose
	.connect(String(process.env.MONGO_CONNECT))
	.then(async () => {
		// --- Log
		Ready(
			`@Database/connect/${process.env.MONGO_DBNAME} :: Database connected`,
		)

		// --- Create server ---
		const server = http.createServer(app)
		server.on('error', ErrorServerHelper)
		server.on('listening', () => {
			// --- Variables ---
			let address = server.address()
			let bind =
				typeof address === 'string' ? `pipe ${address}` : `port ${port}`

			// --- Log ---
			Ready(
				`@Connected API ${process.env.APP_NAME}\nServer running at http://localhost:${port}/ [${bind}]`,
			)
		})

		// --- Connect to redis ---
		await RedisConnect()

		// --- Connect to socket.io ---
		const socket:SocketModule = SocketModule.instance
		socket.Start(() => Ready(
			`@Connected SOCKET ${process.env.APP_NAME}\nServer running at http://localhost:${process.env.SOCKET_PORT}/ [${process.env.SOCKET_PORT}]`,
		))

		// --- Start server ---
		server.listen(port)
	})
	.catch((err) => Error(`@Database/Error :: ${err.message}`))
