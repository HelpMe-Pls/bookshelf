/** @jsx jsx */
import {jsx} from '@emotion/core'

import 'bootstrap/dist/css/bootstrap-reboot.css'
import '@reach/dialog/styles.css'
import * as React from 'react'

import {Button, Input, FormGroup, Spinner} from './components/lib'
import {Modal, ModalContents, ModalOpenButton} from './components/modal'
import {Logo} from './components/logo'

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
	}: Pick<FormData, 'username' | 'password'>) => void
	submitButton: React.ReactElement
}

function LoginForm({onSubmit, submitButton}: LoginProps) {
	function handleSubmit(event: React.FormEvent<FormElement>) {
		event.preventDefault()
		const {username, password} = event.currentTarget.elements

		onSubmit({
			username: typeof username === 'string' ? username : username.value,
			password: typeof password === 'string' ? password : password.value,
		})
	}

	return (
		<form
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
			onSubmit={handleSubmit}
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
				{React.cloneElement(submitButton, {type: 'submit'})}
				<Spinner css={{marginLeft: 5}} />
			</div>
		</form>
	)
}

export default function App() {
	function login(formData: Pick<FormData, 'username' | 'password'>) {
		console.log('login', formData)
	}

	function register(formData: Pick<FormData, 'username' | 'password'>) {
		console.log('register', formData)
	}

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
