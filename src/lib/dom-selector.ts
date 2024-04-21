export const $ = (selector: string, context: Document | HTMLElement = document): HTMLElement =>
	context.querySelector(selector) as HTMLElement

export const $$ = (
	selector: string,
	context: Document | HTMLElement = document
): NodeListOf<HTMLElement> => context.querySelectorAll(selector)
