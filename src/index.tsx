import React from 'react'
import {createRoot} from 'react-dom/client'
import {QueryClient, QueryClientProvider} from 'react-query'
import reportWebVitals from './reportWebVitals'

import {loadDevTools} from 'dev-tools/load'
import './bootstrap'
import {ErrorResponse} from 'types'
import {App} from './App'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			useErrorBoundary: true,
			refetchOnWindowFocus: false,
			retry(failureCount, err) {
				const error = err as ErrorResponse
				if (error.status === 404) return false
				else if (failureCount < 2) return true
				else return false
			},
		},
		mutations: {
			onError: (_err, _variables, recover) =>
				typeof recover === 'function' ? recover() : null,
		},
	},
})

// ignore the rootRef in this file. I'm just doing it here to make
// the tests I write to check your work easier.
export const rootRef = {}
loadDevTools(() => {
	const root = createRoot(document.getElementById('root') as HTMLElement)

	root.render(
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</React.StrictMode>,
	)
	// @ts-expect-error
	rootRef.current = root
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
