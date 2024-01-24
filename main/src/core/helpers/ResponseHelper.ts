// --- Dependencies ---
import { v4 } from 'uuid'

// --- Helper ---
export const ResponseHelper = (
	success: boolean,
	status: number,
	message: string,
	data: Record<
		string,
		string | { [key: string]: string | number | object } | object
	> = {},
	disconnect: boolean = false,
): object => {
	return {
		success,
		status,
		message,
		data,
		disconnect,
		createdAt: Date.now(),
		id: v4(),
	}
}
