/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import {useQueryClient, QueryClient} from 'react-query'
import * as auth from 'auth-provider'
import {client} from 'utils/api-client'
import {useAsync} from 'utils/hooks'
import {setQueryDataForBook} from 'utils/books'
import {FullPageSpinner, FullPageErrorFallback} from 'components/lib'
import {ClientConfigs, User, UserInput} from 'types'

async function bootstrapAppData(queryClient: QueryClient) {
	let user = null

	const token = await auth.getToken()
	if (token) {
		const data = await client('bootstrap', {token})
		queryClient.setQueryData('list-items', data.listItems)
		for (const listItem of data.listItems) {
			setQueryDataForBook(queryClient, listItem.book)
		}
		user = data.user
	}
	return user
}

type AuthValue = {
	login: ({username, password}: UserInput) => Promise<User>
	logout: () => void
	register: ({username, password}: UserInput) => Promise<User>
	user: User
}
const AuthContext = React.createContext<AuthValue | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

function AuthProvider(props: any) {
	const {
		data: user,
		status,
		error,
		isLoading,
		isIdle,
		isError,
		isSuccess,
		run,
		setData,
	} = useAsync()

	const queryClient = useQueryClient()

	React.useEffect(() => {
		const appDataPromise = bootstrapAppData(queryClient)
		run(appDataPromise)
	}, [run, queryClient])

	const login = React.useCallback(
		(form: UserInput) => auth.login(form).then(u => setData(u)),
		[setData],
	)
	const register = React.useCallback(
		(form: UserInput) => auth.register(form).then(u => setData(u)),
		[setData],
	)
	const logout = React.useCallback(() => {
		auth.logout()
		queryClient.clear()
		setData(null)
	}, [setData, queryClient])

	const value = React.useMemo(
		() => ({user, login, logout, register}),
		[login, logout, register, user],
	)

	if (isLoading || isIdle) {
		return <FullPageSpinner />
	}

	if (isError) {
		return <FullPageErrorFallback error={error as Error} />
	}

	if (isSuccess) {
		return <AuthContext.Provider value={value} {...props} />
	}

	throw new Error(`Unhandled status: ${status}`)
}

function useAuth() {
	const context = React.useContext(AuthContext)
	if (context === undefined) {
		throw new Error(`useAuth must be used within a AuthProvider`)
	}
	return context
}

function useClient() {
	const {user} = useAuth()
	const token = user?.token
	return React.useCallback(
		(
			endpoint: string,
			config?: {
				data?: unknown
				token?: string
				headers?: Record<string, string>
			} & Partial<ClientConfigs>,
		) => client(endpoint, {...config, token}),
		[token],
	)
}

export {AuthProvider, useAuth, useClient}
