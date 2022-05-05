import { setupWorker } from 'msw'
import { handlers } from './server-handlers'

const fullUrl = new URL('https://exercises-03-data-fetching.bookshelf.lol/')

const server = setupWorker(...handlers)

server.start({
	quiet: true,
	onUnhandledRequest: 'bypass',
	serviceWorker: {
		url: fullUrl.pathname + 'mockServiceWorker.js',
	},
})

export * from 'msw'
export { server }
