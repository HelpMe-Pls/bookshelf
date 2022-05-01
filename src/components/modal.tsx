/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import {Dialog, CircleButton} from './lib'

function callAll<Args extends Array<unknown>>(
	...fns: Array<((...args: Args) => unknown) | undefined>
) {
	return (...args: Args) => fns.forEach(fn => fn?.(...args))
}

type ModalValue = [boolean, (arg: boolean) => void]
const ModalContext = React.createContext<ModalValue | undefined>(undefined)

function Modal(props?: any) {
	const [isOpen, setIsOpen] = React.useState(false)

	return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />
}

function ModalDismissButton({children: child}: {children: React.ReactElement}) {
	const [, setIsOpen] = React.useContext(ModalContext)!
	return React.cloneElement(child, {
		onClick: callAll(() => setIsOpen(false), child.props.onClick),
	})
}

function ModalOpenButton({children: child}: {children: React.ReactElement}) {
	const [, setIsOpen] = React.useContext(ModalContext)!
	return React.cloneElement(child, {
		onClick: callAll(() => setIsOpen(true), child.props.onClick),
	})
}

function ModalContentsBase(props?: any) {
	const [isOpen, setIsOpen] = React.useContext(ModalContext)!
	return (
		<Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
	)
}

function ModalContents({
	title,
	children,
	...props
}: {
	title: string
	children: React.ReactElement
	props?: any
}) {
	return (
		<ModalContentsBase {...props}>
			<div css={{display: 'flex', justifyContent: 'flex-end'}}>
				<ModalDismissButton>
					<CircleButton>
						<VisuallyHidden>Close</VisuallyHidden>
						<span aria-hidden>×</span>
					</CircleButton>
				</ModalDismissButton>
			</div>
			<h3 css={{textAlign: 'center', fontSize: '2em'}}>{title}</h3>
			{children}
		</ModalContentsBase>
	)
}

export {Modal, ModalDismissButton, ModalOpenButton, ModalContents}
