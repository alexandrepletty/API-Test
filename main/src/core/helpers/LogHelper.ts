// --- Dependencies ---
import chalk from 'chalk'

// --- Helpers ---
import { TimeDay } from './DateHelper'

// --- Variables ---
const log = console.log
let Template = (content: string): string => {
	return `${chalk.grey.bold(
		'─────────────────────────────────',
	)}\n\n${chalk.blueBright(TimeDay())} [::] ${chalk.white.bold(
		`${process.env.APP_NAME?.toUpperCase()} [${process.env.PORT}]`,
	)} ${content}\n`
}

// --- Log
export const Log = (content: string) => {
	return log(
		Template(
			`${chalk.white.bgBlueBright(` LOG `)} ${chalk.blueBright.bold(
				`[?]`,
			)} » ${content}`,
		),
	)
}

// --- Error
export const Error = (content: string) => {
	return log(
		Template(
			`${chalk.white.bgRedBright(` ERROR `)} ${chalk.redBright.bold(
				`[x]`,
			)} » ${chalk.bold.white.redBright.bold(`${content}`)}`,
		),
	)
}

// --- Ready
export const Ready = (content: string) => {
	return log(
		Template(
			`${chalk.black.bgGreenBright(` READY `)} ${chalk.greenBright.bold(
				`[✓]`,
			)} » ${content}`,
		),
	)
}

// --- Warn
export const Warn = (content: string) => {
	return log(
		Template(
			`${chalk.black.bgYellow(` WARN `)} ${chalk.yellow.bold(
				`[!]`,
			)} » ${content}`,
		),
	)
}

// --- Dev
export const Dev = (content: string) => {
	return log(
		Template(
			`${chalk.black.bgYellowBright(` DEV `)} ${chalk.yellowBright.bold(
				`[▲]`,
			)} » ${content}`,
		),
	)
}

// --- Prod
export const Prod = (content: string) => {
	return log(
		Template(
			`${chalk.black.bgCyanBright(` PROD `)} ${chalk.cyanBright.bold(
				`[◆]`,
			)} » ${content}`,
		),
	)
}

// --- Email
export const Email = (content: string) => {
	return log(
		Template(
			`${chalk.black.bgCyan(` EMAIL `)} ${chalk.cyan.bold(
				`[@]`,
			)} » ${content}`,
		),
	)
}

// --- Database
export const Database = (content: string) => {
	return log(
		Template(
			`${chalk.black.bgBlueBright(` DATABASE `)} ${chalk.blueBright.bold(
				`[◇]`,
			)} » ${content}`,
		),
	)
}

// --- Socket Join
export const SocketJoin = (content: string) => {
	return log(
		Template(
			`${chalk.white.bgBlue(` SOCKET `)} ${chalk.greenBright.bold(
				`[+]`,
			)} » ${content}`,
		),
	)
}

// --- Socket Leave
export const SocketLeave = (content: string) => {
	return log(
		Template(
			`${chalk.white.bgBlue(` SOCKET `)} ${chalk.red.bold(
				`[-]`,
			)} » ${content}`,
		),
	)
}

// --- Cache Ready
export const CacheReady = (content: string) => {
	return log(
		Template(
			`${chalk.black.bgGreenBright(` CACHE `)} ${chalk.greenBright.bold(
				`[✓]`,
			)} » ${content}`,
		),
	)
}

// --- Cache Clear
export const CacheClear = (content: string) => {
	return log(
		Template(
			`${chalk.white.bgMagenta(` CACHE `)} ${chalk.greenBright.bold(
				`[✓]`,
			)} » ${content}`,
		),
	)
}

// --- Cache Clear
export const CacheCreate = (content: string) => {
	return log(
		Template(
			`${chalk.white.bgMagenta(` CACHE `)} ${chalk.green.bold(
				`[+]`,
			)} » ${content}`,
		),
	)
}

// --- Cache Clear
export const CacheRemove = (content: string) => {
	return log(
		Template(
			`${chalk.white.bgMagenta(` CACHE `)} ${chalk.red.bold(
				`[-]`,
			)} » ${content}`,
		),
	)
}
