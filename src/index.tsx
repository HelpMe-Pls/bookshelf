import React from 'react'
import {createRoot} from 'react-dom/client'
import reportWebVitals from './reportWebVitals'

import {loadDevTools} from 'dev-tools/load'
import './bootstrap'
import {App} from './App'

// ignore the rootRef in this file. I'm just doing it here to make
// the tests I write to check your work easier.
export const rootRef = {}
loadDevTools(() => {
	const root = createRoot(document.getElementById('root') as HTMLElement)

	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	)
	// @ts-expect-error
	rootRef.current = root
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
