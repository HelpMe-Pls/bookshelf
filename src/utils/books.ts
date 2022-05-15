import React from 'react'
import { QueryClient, useQuery, useQueryClient } from 'react-query'
import { client } from './api-client'
import bookPlaceholderSvg from 'assets/book-placeholder.svg'
import { BookResponse, BookProps, BookData, BooksData, CommonBook, User } from 'types'

const loadingBook = {
    id: '',
    title: 'Loading...',
    author: 'loading...',
    coverImageUrl: bookPlaceholderSvg,
    publisher: 'Loading Publishing',
    synopsis: 'Loading...',
    loadingBook: true,
}

const loadingBooks = Array.from({ length: 10 }, (_v, index) => ({
    ...loadingBook,
    id: `loading-book-${index}`,
}))

const getBookSearchConfig = (queryClient: QueryClient, query: string, user: User) => ({
    queryKey: ['bookSearch', { query }],
    queryFn: () =>
        client(`books?query=${encodeURIComponent(query)}`, {
            token: user.token,
        }).then((data: BooksData) => data.books),

    onSuccess(books: BookData[]) {
        for (const book of books) {
            setQueryDataForBook(queryClient, book)
        }
    },
})

// TODO: something's wrong with this which leads to `discover` page infinitely loads on first render
export function useBookSearch(query: string, user: User) {
    const queryClient = useQueryClient()
    const result = useQuery(getBookSearchConfig(queryClient, query, user))
    return { ...result, books: result.data ?? loadingBooks }
}

export function useBook(bookId: Pick<BookProps, "bookId">["bookId"] | undefined, user: User) {
    const { data } = useQuery({
        queryKey: ['book', { bookId }],
        queryFn: () =>
            client(`books/${bookId}`, { token: user.token }).then((res: BookResponse) => res.book),
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

export function setQueryDataForBook(queryClient: QueryClient, book: CommonBook) {
    queryClient.setQueryData(['book', { bookId: book.id }], book)
}

