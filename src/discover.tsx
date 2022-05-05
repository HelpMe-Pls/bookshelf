/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import Tooltip from '@reach/tooltip'
import {FaSearch, FaTimes} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
import {client} from './utils/api-client'
import * as colors from './styles/colors'
import {useAsync} from './utils/hooks'
import {BooksData, BooksError} from 'types'

interface FormData extends HTMLFormControlsCollection {
	search: HTMLInputElement
}

interface FormElement extends HTMLFormElement {
	readonly elements: FormData
}

function DiscoverBooksScreen() {
	const {data, error, run, isLoading, isError, isSuccess} = useAsync<
		BooksData,
		BooksError
	>()
	const [query, setQuery] = React.useState('')
	const [queried, setQueried] = React.useState(false)

	React.useEffect(() => {
		if (!queried) {
			return
		}
		run(client(`books?query=${encodeURIComponent(query)}`))
	}, [query, queried, run])

	function handleSearchSubmit(event: React.FormEvent<FormElement>) {
		event.preventDefault()
		setQueried(true)
		setQuery(event.currentTarget.elements.search.value)
	}

	return (
		<div
			css={{
				maxWidth: 800,
				margin: 'auto',
				width: '90vw',
				padding: '40px 0',
			}}
		>
			<form onSubmit={handleSearchSubmit}>
				<Input
					placeholder="Search books..."
					id="search"
					css={{width: '100%'}}
				/>
				<Tooltip label="Search Books">
					<label htmlFor="search">
						<button
							type="submit"
							css={{
								border: '0',
								position: 'relative',
								marginLeft: '-35px',
								background: 'transparent',
							}}
						>
							{isLoading ? (
								<Spinner />
							) : isError ? (
								<FaTimes
									aria-label="error"
									css={{color: colors.danger}}
								/>
							) : (
								<FaSearch aria-label="search" />
							)}
						</button>
					</label>
				</Tooltip>
			</form>

			{isError ? (
				<div css={{color: colors.danger}}>
					<p>There was an error:</p>
					<pre>{(error as BooksError).message}</pre>
				</div>
			) : null}

			{isSuccess ? (
				data?.books?.length ? (
					<BookListUL css={{marginTop: 20}}>
						{data.books.map(book => (
							<li key={book.id} aria-label={book.title}>
								<BookRow key={book.id} book={book} />
							</li>
						))}
					</BookListUL>
				) : (
					<p>No books found. Try another search.</p>
				)
			) : null}
		</div>
	)
}

export {DiscoverBooksScreen}
