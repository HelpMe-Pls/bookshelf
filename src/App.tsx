/** @jsx jsx
 * @jsxFrag */
import {jsx} from '@emotion/core'

import * as React from 'react'
import ReactDOM from 'react-dom'
import VisuallyHidden from '@reach/visually-hidden'
import {CircleButton, Input, Button, FormGroup, Dialog} from './components/lib'
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
	buttonText: string
}

function Modal({
	button,
	label,
	children,
}: {
	button: React.ReactElement
	label: string
	children: any
}) {
	const [isOpen, setIsOpen] = React.useState(false)

	return (
		<>
			{React.cloneElement(button, {onClick: () => setIsOpen(true)})}
			<Dialog aria-label={label} isOpen={isOpen}>
				<div css={{display: 'flex', justifyContent: 'flex-end'}}>
					<CircleButton onClick={() => setIsOpen(false)}>
						<VisuallyHidden>Close</VisuallyHidden>
						<span aria-hidden>×</span>
					</CircleButton>
				</div>
				{children}
			</Dialog>
		</>
	)
}

function LoginForm({onSubmit, buttonText}: LoginProps) {
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
				<Button type="submit">{buttonText}</Button>
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
				<Modal label="Login form" button={<Button>Login</Button>}>
					<h3 css={{textAlign: 'center', fontSize: '2em'}}>Login</h3>
					<LoginForm onSubmit={login} buttonText="Login" />
				</Modal>
				<Modal
					label="Registration form"
					button={<Button variant="secondary">Register</Button>}
				>
					<h3 css={{textAlign: 'center', fontSize: '2em'}}>
						Register
					</h3>
					<LoginForm onSubmit={register} buttonText="Register" />
				</Modal>
			</div>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
