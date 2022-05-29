import * as React from 'react'
import {QueryClient, QueryClientProvider as RQProvider} from 'react-query'
import {ErrorResponse} from 'types'

/**
 * This is a clever little "hack" to make sure we make only one instance of
 * something for a given instance of the component. We store it in
 * lazily-initialized state and only return the state value and ignore the
 * state updater. This is the simplest way to do this.
 *
 * @param {Function} initializer A callback to initialize the value
 * @returns a constant value returned from the initializer
 */
function useConstant(initializer: Function) {
	return React.useState(initializer)[0]
}

export function QueryClientProvider({children}: any) {
	const queryClient = useConstant(() => {
		const client = new QueryClient({
			defaultOptions: {
				queries: {
					useErrorBoundary: true,
					refetchOnWindowFocus: false,
					retry(failureCount, error) {
						if ((error as ErrorResponse).status === 404)
							return false
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
		// let the devtools know about our new query client
		// if the devtools are installed:
		//@ts-expect-error
		window.__devtools?.setQueryClient?.(client)
		return client
	})
	//@ts-expect-error
	return <RQProvider client={queryClient}>{children}</RQProvider>
}
