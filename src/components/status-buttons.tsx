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
import {CommonBook, ErrorResponse} from 'types'

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
		CommonBook,
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

export function StatusButtons({book}: {book: CommonBook}) {
	const listItem = useListItem(book.id!)

	const {mutateAsync: update} = useUpdateListItem()
	const {mutateAsync: remove} = useRemoveListItem()
	const {mutateAsync: create} = useCreateListItem()

	return (
		<React.Fragment>
			{listItem ? (
				Boolean(listItem.finishDate) ? (
					<TooltipButton
						label="Mark as unread"
						highlight={colors.yellow}
						onClick={() =>
							update({id: listItem.id!, finishDate: null})
						}
						icon={<FaBook />}
					/>
				) : (
					<TooltipButton
						label="Mark as read"
						highlight={colors.green}
						onClick={() =>
							update({
								id: listItem.id!,
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
					onClick={() => remove({id: listItem.id})}
					icon={<FaMinusCircle />}
				/>
			) : (
				<TooltipButton
					label="Add to list"
					highlight={colors.indigo}
					onClick={() => create({bookId: book.id!})}
					icon={<FaPlusCircle />}
				/>
			)}
		</React.Fragment>
	)
}
