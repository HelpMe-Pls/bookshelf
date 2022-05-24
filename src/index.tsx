import * as React from 'react'
import reportWebVitals from './reportWebVitals'

import {loadDevTools} from './dev-tools/load'
import './bootstrap'
import {createRoot} from 'react-dom/client'
import {Profiler} from 'components/profiler'
import {App} from './App'
import {AppProviders} from './context'

loadDevTools(() => {
	createRoot(document.getElementById('root') as HTMLElement).render(
		<Profiler id="App Root" phases={['mount']}>
			<AppProviders>
				<App />
			</AppProviders>
		</Profiler>,
	)
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
