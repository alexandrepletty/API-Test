// --- Dependencies
import express, {Application} from 'express'
import http from 'http'
import socketIO from 'socket.io'
import cors from 'cors'
import helmet from 'helmet'

// --- Middlewares
import {CheckSocketAccessToken} from "../middlewares/JWTSocketMiddleware";

// --- Instance ---
export class SocketModule {
	// --- Variables ---
	public static readonly PORT:number = Number(process.env.SOCKET_PORT)
	private static _instance:SocketModule
	private _app: Application | undefined
	private _server: http.Server | undefined

	// --- Getters
	public io: socketIO.Server | undefined
	public port: number | undefined

	// --- Constructor
	constructor() {
		this.App() // --- Initialize the express application
		this.Config() // --- Initialize the server configuration
		this.Socket() // --- Initialize the socket
		this.Middleware() // --- Initialize the socket middleware
		this.Listen() // --- Initialize the socket listener
	}

	// --- Initialize the server
	public static get instance():SocketModule {
		// --- Return the instance of the server
		return this._instance || (this._instance = new this())
	}

	// --- Application
	private App():void {
		// --- Initialize the express application
		this._app = express()

		// --- Middlewares
		this._app.use(cors())
		this._app.use(helmet())
	}

	// --- Configuration
	private Config():void {
		// --- Initialize the server configuration
		this._server = new http.Server(this._app)
		this.port = SocketModule.PORT
	}

	// --- Socket
	private Socket():void {
		// --- Initialize the socket
		this.io = new socketIO.Server(this._server, {
			cors: {
				origin: process.env.SOCKET_ORIGIN
			}
		}) as socketIO.Server
	}

	// --- Socket listener
	private Listen():void {
		// --- Socket connection
		this.io?.on('connection', async (socket:socketIO.Socket) => {
			// --- Initialize the socket
			console.log('Socket connected', socket.id)

			socket.on('chat_message', (message) => {
				console.log('Message received', message)
			})

			socket.emit('chat_message', 'Message received')
		})
	}

	private Middleware():void {
		this.io?.use(CheckSocketAccessToken)
	}

	// --- Start the server
	Start(callback:any):void {
		// --- Start the server
		this._server?.listen(this.port, callback)
	}
}
