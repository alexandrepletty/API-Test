// --- Port
export const PortHelper = (value: number): boolean | number => {
	// --- variables
	let port: number = parseInt(String(Number(value)), 10) // --- Get port

	// --- Check port
	if (isNaN(port)) {
		// --- Named pipe
		return value
	}

	// --- Check port
	if (port >= 0) {
		// --- Port number
		return port
	}

	// --- Error
	return false
}
