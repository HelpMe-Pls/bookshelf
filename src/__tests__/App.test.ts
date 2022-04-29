import { screen, act } from '@testing-library/react'
import { Root } from 'react-dom/client'

test('renders the app', () => {
	const root = document.createElement('div')
	root.id = 'root'
	document.body.append(root)

	let reactRoot: Root
	act(() => {
		reactRoot = require('..').root
	})

	screen.getByTitle('Bookshelf')
	screen.getByRole('heading', { name: /Bookshelf/i })
	screen.getByRole('button', { name: /Login/i })
	screen.getByRole('button', { name: /Register/i })

	// cleanup
	act(() => reactRoot.unmount())
	document.body.removeChild(root)
})
