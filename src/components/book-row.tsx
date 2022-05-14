/** @jsx jsx */
import {jsx} from '@emotion/core'

import {Link} from 'react-router-dom'
import * as mq from 'styles/media-queries'
import * as colors from 'styles/colors'
import {User, BookData, BookProps} from 'types'
import {useListItem} from 'utils/list-items'
import {Rating} from './rating'

function BookRow({user, book}: {user: User; book: BookData | BookProps}) {
	const {title, author, coverImageUrl} = book as BookData
	const listItem = useListItem(user, (book as BookData).id)
	const id = `book-row-book-${(book as BookData).id}`

	return (
		<div
			css={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'flex-end',
				position: 'relative',
			}}
		>
			<Link
				aria-labelledby={id}
				to={`/book/${(book as BookData).id}`}
				css={{
					minHeight: 270,
					flexGrow: 2,
					display: 'grid',
					gridTemplateColumns: '140px 1fr',
					gridGap: 20,
					border: `1px solid ${colors.gray20}`,
					color: colors.text,
					padding: '1.25em',
					borderRadius: '3px',
					':hover,:focus': {
						textDecoration: 'none',
						boxShadow: '0 5px 15px -5px rgba(0,0,0,.08)',
						color: 'inherit',
					},
				}}
			>
				<div
					css={{
						width: 140,
						[mq.small]: {
							width: 100,
						},
					}}
				>
					<img
						src={coverImageUrl}
						alt={`${title} book cover`}
						css={{maxHeight: '100%', width: '100%'}}
					/>
				</div>
				<div css={{flex: 1}}>
					<div
						css={{display: 'flex', justifyContent: 'space-between'}}
					>
						<div css={{flex: 1}}>
							<h2
								id={id}
								css={{
									fontSize: '1.25em',
									margin: '0',
									color: colors.indigo,
								}}
							>
								{title}
							</h2>
							{listItem?.finishDate ? (
								<Rating user={user} listItem={listItem} />
							) : null}
						</div>
						<div css={{marginLeft: 10}}>
							<div
								css={{
									marginTop: '0.4em',
									fontStyle: 'italic',
									fontSize: '0.85em',
								}}
							>
								{author}
							</div>
							<small>{(book as BookData).publisher}</small>
						</div>
					</div>
					<small css={{whiteSpace: 'break-spaces', display: 'block'}}>
						{(book as BookData).synopsis.substring(0, 500)}...
					</small>
				</div>
			</Link>
		</div>
	)
}

export {BookRow}
