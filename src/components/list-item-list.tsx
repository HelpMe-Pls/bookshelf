//@ts-nocheck
/** @jsx jsx */
import {jsx} from '@emotion/core'

import {useListItems} from 'utils/list-items'
import {BookListUL} from './lib'
import {BookRow} from './book-row'

function ListItemList({
	user,
	filterListItems,
	noListItems,
	noFilteredListItems,
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
				<li key={listItem.id}>
					<BookRow user={user} book={listItem.book} />
				</li>
			))}
		</BookListUL>
	)
}

export {ListItemList}
