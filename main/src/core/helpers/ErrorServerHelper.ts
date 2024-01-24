// --- Helper
export const ErrorServerHelper = (error: NodeJS.ErrnoException) => {
	// --- Check listen
	if (error.syscall !== 'listen') {
		// --- Error
		throw error
	}

	// --- switch code error
	switch (error.code) {
		case 'EACCES':
			console.error(
				`Port ${process.env.PORT} requires elevated privileges`,
			)
			process.exit(1)
			break
		case 'EADDRINUSE':
			console.error(`Port ${process.env.PORT} is already in use`)
			process.exit(1)
			break
		default:
			throw error
	}
}
