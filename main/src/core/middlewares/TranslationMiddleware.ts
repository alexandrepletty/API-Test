// --- Dependencies ---
import { Request, Response, NextFunction } from 'express'
import { I18n } from 'i18n'

// --- Middleware ---
export const InitTranslation = (
	request: Request,
	response: Response,
	next: NextFunction,
) => {
	// --- Config ---
	const i18n = new I18n({
		locales: ['en', 'fr'],
		directory: './translations',
		defaultLocale: 'fr',
		objectNotation: true,
	})

	// --- Initialize the translation ---
	return i18n.init(request, response, next)
}
