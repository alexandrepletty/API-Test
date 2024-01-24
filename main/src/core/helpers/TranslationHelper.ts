// --- Dependencies ---
import { I18n } from 'i18n'
import { Response } from 'express'

// --- Helper ---
export const PhraseTranslation = (
	response: Response,
	phrase: string,
	locale: string = 'en',
	option: {} = {},
): string => {
	return response.__({ phrase, locale }, option)
}
