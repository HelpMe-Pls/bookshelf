/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'

import * as auth from 'auth-provider'
import {FullPageSpinner} from './components/lib'
import * as colors from './styles/colors'
import {client} from './utils/api-client'
import {useAsync} from './utils/hooks'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import {ErrorResponse, User, UserInput} from 'types'

async function getUser() {
	let user = null

	const token = await auth.getToken()
	if (token) {
		const data = await client('me', {token})
		user = data.user
	}

	return user
}

function App() {
	const {
		data: user,
		error,
		isLoading,
		isIdle,
		isSuccess,
		// isError,
		run,
		setData,
	} = useAsync<User | null, ErrorResponse>()

	React.useEffect(() => {
		run(getUser())
	}, [run])

	const login = (form: UserInput) => auth.login(form).then(u => setData(u))
	const register = (form: UserInput) =>
		auth.register(form).then(u => setData(u))
	const logout = () => {
		auth.logout()
		setData(null)
	}

	if (isLoading || isIdle) {
		return <FullPageSpinner />
	}

	if (isSuccess) {
		return user ? (
			<Router>
				<AuthenticatedApp user={user} logout={logout} />
			</Router>
		) : (
			<UnauthenticatedApp login={login} register={register} />
		)
	}

	// if this `return` here is put inside an `if` statement like:
	// `if (isError) return(...)` then the `App`'s return value will be
	// `JSX.Element | undefined` instead of just `JSX.Element`
	// Which causes TypeScript to catch that `undefined` return exception:
	/**
	 * 'App' cannot be used as a JSX component.
	 * Its return type 'Element | undefined' is not a valid JSX element.
	 * Type 'undefined' is not assignable to type 'Element | null'.
	 */
	return (
		<div
			css={{
				color: colors.danger,
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<p>Uh oh... There's a problem. Try refreshing the app.</p>
			<pre>{(error as ErrorResponse).message}</pre>
		</div>
	)
}

export {App}
