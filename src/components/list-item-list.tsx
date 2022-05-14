/** @jsx jsx */
import {jsx} from '@emotion/core'

import {useListItems} from 'utils/list-items'
import {BookListUL} from './lib'
import {BookRow} from './book-row'
import {BookProps, User} from 'types'

function ListItemList({
	user,
	filterListItems,
	noListItems,
	noFilteredListItems,
}: {
	user: User
	filterListItems: (li: BookProps) => boolean
	noListItems: React.ReactNode
	noFilteredListItems: React.ReactNode
}) {
	const listItems = useListItems(user)

	const filteredListItems = listItems.filter(filterListItems)

	if (!listItems.length) {
		return (
			<div css={{marginTop: '1em', fontSize: '1.2em'}}>{noListItems}</div>
		)
	}
	if (!filteredListItems.length) {
		return (
			<div css={{marginTop: '1em', fontSize: '1.2em'}}>
				{noFilteredListItems}
			</div>
		)
	}

	return (
		<BookListUL>
			{filteredListItems.map(listItem => (
				<li key={listItem.bookId}>
					<BookRow user={user} book={listItem} />
				</li>
			))}
		</BookListUL>
	)
}

export {ListItemList}
