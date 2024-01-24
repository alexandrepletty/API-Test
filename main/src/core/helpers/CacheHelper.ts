// --- Dependencies ---
import * as redis from 'redis'

// --- Helpers ---
import { CacheReady } from './LogHelper'

// --- Redis client ---
const client: redis.RedisClientType = redis.createClient({
	socket: {
		host: String(process.env.REDIS_HOST),
		port: Number(process.env.REDIS_PORT),
	},
	password: process.env.REDIS_PASSWORD,
})

// --- Connect ---
client.connect()

// --- Connect to redis ---
export const RedisConnect = async (): Promise<redis.RedisClientType> => {
	// --- Log ---
	CacheReady(`@Cache/Started :: Cache initialized.`)

	// --- Connect to redis ---
	return client
}

// --- Clear cache ---
export const ClearCache = async (): Promise<boolean> => {
	// --- Get the keys
	let keys: string = await client.flushAll()

	// --- Return the keys
	return keys === 'OK'
}

// --- Set cache ---
export const SetCache = async (
	key: string,
	value: object,
): Promise<boolean> => {
	// --- Set the value
	//let result:string | null = await client.set(key, Hash(JSON.stringify(value)))
	let result: string | null = await client.set(key, JSON.stringify(value))

	// --- Return the result
	return result === 'OK'
}

// --- Get cache ---
export const GetCache = async (key: string): Promise<object | null> => {
	// --- Get the value
	let result: string | null = await client.get(key)

	// --- Return the result
	//return result ? JSON.parse(Digest(result)) : null
	return result ? JSON.parse(result) : null
}

// --- Get all cache ---
export const GetAllCache = async (): Promise<any> => {
	// --- Get the value
	let keys: Array<string> | null = await client.keys('*')

	// --- Check the keys
	if (keys?.length !== 0) {
		// --- Get the value
		let data: (string | null)[] = await client.mGet(keys)

		// --- Return the result
		return data.map((element: string | null): object => {
			// --- Return array of objects from the cache
			return JSON.parse(String(element))
		})
	} else {
		// --- Return empty array
		return []
	}
}

// --- Delete cache ---
export const DelCache = async (key: string): Promise<boolean> => {
	// --- Delete the value
	let result: number = await client.del(key)

	// --- Return the result
	return result === 1
}

// --- Update cache ---
export const UpdateCache = async (
	key: string,
	value: object,
): Promise<boolean> => {
	// --- Get the cache
	let cache: object | null = await GetCache(key)

	// --- Check the cache
	if (cache) {
		// --- Update the cache
		await SetCache(key, { ...cache, ...value })

		// --- Return true
		return true
	} else {
		// --- Return false
		return false
	}
}
