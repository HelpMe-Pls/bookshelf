/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import {Input, Button, Spinner, FormGroup, ErrorMessage} from './components/lib'
import {Modal, ModalContents, ModalOpenButton} from './components/modal'
import {Logo} from './components/logo'
import {useAsync} from './utils/hooks'
import {UserInput} from 'types'

interface FormData extends HTMLFormControlsCollection {
	username: HTMLInputElement | string
	password: HTMLInputElement | string
}

interface FormElement extends HTMLFormElement {
	readonly elements: FormData
}

interface LoginProps {
	onSubmit: ({
		username,
		password,
	}: Pick<FormData, 'username' | 'password'>) => Promise<unknown>
	submitButton: React.ReactElement
}

function LoginForm({onSubmit, submitButton}: LoginProps) {
	const {isLoading, isError, error, run} = useAsync()
	function handleSubmit(event: React.FormEvent<FormElement>) {
		event.preventDefault()
		const {username, password} = event.currentTarget.elements

		run(
			onSubmit({
				username:
					typeof username === 'string' ? username : username.value,
				password:
					typeof password === 'string' ? password : password.value,
			}),
		)
	}

	return (
		<form
			onSubmit={handleSubmit}
			css={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'stretch',
				'> div': {
					margin: '10px auto',
					width: '100%',
					maxWidth: '300px',
				},
			}}
		>
			<FormGroup>
				<label htmlFor="username">Username</label>
				<Input id="username" />
			</FormGroup>
			<FormGroup>
				<label htmlFor="password">Password</label>
				<Input id="password" type="password" />
			</FormGroup>
			<div>
				{React.cloneElement(
					submitButton,
					{type: 'submit'},
					...(Array.isArray(submitButton.props.children)
						? submitButton.props.children
						: [submitButton.props.children]),
					isLoading ? <Spinner css={{marginLeft: 5}} /> : null,
				)}
			</div>
			{isError ? <ErrorMessage error={error} /> : null}
		</form>
	)
}

function UnauthenticatedApp({
	login,
	register,
}: {
	login: (form: UserInput) => Promise<unknown>
	register: (form: UserInput) => Promise<unknown>
}) {
	return (
		<div
			css={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '100vh',
			}}
		>
			<Logo width="80" height="80" />
			<h1>Bookshelf</h1>
			<div
				css={{
					display: 'grid',
					gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
					gridGap: '0.75rem',
				}}
			>
				<Modal>
					<ModalOpenButton>
						<Button variant="primary">Login</Button>
					</ModalOpenButton>
					<ModalContents aria-label="Login form" title="Login">
						<LoginForm
							onSubmit={login}
							submitButton={
								<Button variant="primary">Login</Button>
							}
						/>
					</ModalContents>
				</Modal>
				<Modal>
					<ModalOpenButton>
						<Button variant="secondary">Register</Button>
					</ModalOpenButton>
					<ModalContents
						aria-label="Registration form"
						title="Register"
					>
						<LoginForm
							onSubmit={register}
							submitButton={
								<Button variant="secondary">Register</Button>
							}
						/>
					</ModalContents>
				</Modal>
			</div>
		</div>
	)
}

export {UnauthenticatedApp}
