import React from 'react'
import { QueryClient, useQuery, useQueryClient } from 'react-query'
import { client } from './api-client'
import bookPlaceholderSvg from 'assets/book-placeholder.svg'
import { BookProps, BookData, User } from 'types'

const loadingBook = {
    title: 'Loading...',
    author: 'loading...',
    coverImageUrl: bookPlaceholderSvg,
    publisher: 'Loading Publishing',
    synopsis: 'Loading...',
    loadingBook: true,
}

const loadingBooks = Array.from({ length: 10 }, (_v, index) => ({
    id: `loading-book-${index}`,
    ...loadingBook,
}))

const getBookSearchConfig = (queryClient: QueryClient, query: string, user: User) => ({
    queryKey: ['bookSearch', { query }],
    queryFn: () =>
        client(`books?query=${encodeURIComponent(query)}`, {
            token: user.token,
        }).then(data => data.books),

    onSuccess(books: BookData[]) {
        for (const book of books) {
            setQueryDataForBookInSearch(queryClient, book)
        }
    },
})

export function useBookSearch(query: string, user: User) {
    const queryClient = useQueryClient()
    const result = useQuery(getBookSearchConfig(queryClient, query, user))
    return { ...result, books: result.data ?? loadingBooks }
}

export function useBook(bookId: Pick<BookProps, "bookId">["bookId"] | undefined, user: User) {
    const { data } = useQuery({
        queryKey: ['book', { bookId }],
        queryFn: () =>
            client(`books/${bookId}`, { token: user.token }).then(data => data.book),
    })
    return data ?? loadingBook
}


export function useRefetchBookSearchQuery(user: User) {
    const queryClient = useQueryClient()

    return React.useCallback(
        async function refetchBookSearchQuery() {
            queryClient.removeQueries('bookSearch')
            await queryClient.prefetchQuery(
                getBookSearchConfig(queryClient, '', user),
            )
        },
        [queryClient, user],
    )
}

export function setQueryDataForBookInList(queryClient: QueryClient, book: BookProps) {
    queryClient.setQueryData(['book', { bookId: book.bookId }], book)
}

export function setQueryDataForBookInSearch(queryClient: QueryClient, book: BookData) {
    queryClient.setQueryData(['book', { id: book.id }], book)
}
