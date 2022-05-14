/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import {
	FaCheckCircle,
	FaPlusCircle,
	FaMinusCircle,
	FaBook,
	FaTimesCircle,
} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'
import {
	useListItem,
	useUpdateListItem,
	useRemoveListItem,
	useCreateListItem,
} from 'utils/list-items'
import * as colors from 'styles/colors'
import {useAsync} from 'utils/hooks'
import {CircleButton, Spinner} from './lib'
import {BookData, BookProps, ErrorResponse, User} from 'types'

function TooltipButton({
	label,
	highlight,
	onClick,
	icon,
	...rest
}: {
	label: string
	highlight: string
	onClick: any
	icon: React.ReactElement
}) {
	const {isLoading, isError, error, run, reset} = useAsync<
		BookData,
		ErrorResponse
	>()

	function handleClick() {
		if (isError) {
			reset()
		} else {
			run(onClick())
		}
	}

	return (
		<Tooltip label={isError ? (error as ErrorResponse).message : label}>
			<CircleButton
				css={{
					backgroundColor: 'white',
					':hover,:focus': {
						color: isLoading
							? colors.gray80
							: isError
							? colors.danger
							: highlight,
					},
				}}
				disabled={isLoading}
				onClick={handleClick}
				aria-label={isError ? (error as ErrorResponse).message : label}
				{...rest}
			>
				{isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
			</CircleButton>
		</Tooltip>
	)
}

function StatusButtons({user, book}: {user: User; book: BookProps | BookData}) {
	const listItem = useListItem(user, (book as BookProps).bookId)

	const {mutateAsync: update} = useUpdateListItem(user)
	const {mutateAsync: remove} = useRemoveListItem(user)
	const {mutateAsync: create} = useCreateListItem(user)

	return (
		<React.Fragment>
			{listItem ? (
				Boolean(listItem.finishDate) ? (
					<TooltipButton
						label="Unmark as read"
						highlight={colors.yellow}
						onClick={() =>
							update({bookId: listItem.bookId, finishDate: null})
						}
						icon={<FaBook />}
					/>
				) : (
					<TooltipButton
						label="Mark as read"
						highlight={colors.green}
						onClick={() =>
							update({
								bookId: listItem.bookId,
								finishDate: Date.now(),
							})
						}
						icon={<FaCheckCircle />}
					/>
				)
			) : null}
			{listItem ? (
				<TooltipButton
					label="Remove from list"
					highlight={colors.danger}
					onClick={() => remove({bookId: listItem.bookId})}
					icon={<FaMinusCircle />}
				/>
			) : (
				<TooltipButton
					label="Add to list"
					highlight={colors.indigo}
					onClick={() => create({bookId: (book as BookProps).bookId})}
					icon={<FaPlusCircle />}
				/>
			)}
		</React.Fragment>
	)
}

export {StatusButtons}
