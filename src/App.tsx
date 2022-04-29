import '@reach/dialog/styles.css'
import * as React from 'react'
import {Dialog} from '@reach/dialog'
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
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="username">Username</label>
				<input id="username" />
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input id="password" type="password" />
			</div>
			<div>
				<button type="submit">{buttonText}</button>
			</div>
		</form>
	)
}

export default function App() {
	const [openModal, setOpenModal] = React.useState('none')

	function login(formData: Pick<FormData, 'username' | 'password'>) {
		console.log('login', formData)
	}

	function register(formData: Pick<FormData, 'username' | 'password'>) {
		console.log('register', formData)
	}

	return (
		<div>
			<Logo width="69" height="69" />
			<h1>Bookshelf</h1>
			<div>
				<button onClick={() => setOpenModal('login')}>Login</button>
			</div>
			<div>
				<button onClick={() => setOpenModal('register')}>
					Register
				</button>
			</div>
			<Dialog aria-label="Login form" isOpen={openModal === 'login'}>
				<div>
					<button onClick={() => setOpenModal('none')}>Close</button>
				</div>
				<h3>Login</h3>
				<LoginForm onSubmit={login} buttonText="Login" />
			</Dialog>
			<Dialog
				aria-label="Registration form"
				isOpen={openModal === 'register'}
			>
				<div>
					<button onClick={() => setOpenModal('none')}>Close</button>
				</div>
				<h3>Register</h3>
				<LoginForm onSubmit={register} buttonText="Register" />
			</Dialog>
		</div>
	)
}
