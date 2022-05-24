import * as React from 'react'
import { useQuery, useQueryClient, QueryClient } from 'react-query'
import { useClient } from 'context/auth-context'
import bookPlaceholderSvg from 'assets/book-placeholder.svg'
import { BookResponse, BookProps, BookData, BooksData, CommonBook } from 'types'

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

const bookQueryConfig = {
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
}

const getBookSearchConfig = (queryClient: QueryClient, client: (endpoint: any, config?: any) => Promise<any>, query: string) => ({
    queryKey: ['bookSearch', { query }],
    queryFn: () =>
        client(`books?query=${encodeURIComponent(query)}`).then((data: BooksData) => data.books),

    onSuccess(books: BookData[]) {
        for (const book of books) {
            queryClient.setQueryData(
                ['book', { bookId: book.id }],
                book
            )
        }
    },
})

// TODO: something's wrong with this which leads to `discover` page infinitely loads on first render
export function useBookSearch(query: string) {
    const client = useClient()
    const queryClient = useQueryClient()
    const result = useQuery(getBookSearchConfig(queryClient, client, query))
    return { ...result, books: result.data ?? loadingBooks }
}

export function useBook(bookId: Pick<BookProps, "bookId">["bookId"] | undefined) {
    const client = useClient()
    const { data } = useQuery({
        queryKey: ['book', { bookId }],
        queryFn: () =>
            client(`books/${bookId}`).then((res: BookResponse) => res.book),
        ...bookQueryConfig,
    })
    return data ?? loadingBook
}


export function useRefetchBookSearchQuery() {
    const client = useClient()
    const queryClient = useQueryClient()

    return React.useCallback(
        async function refetchBookSearchQuery() {
            queryClient.removeQueries('bookSearch')
            await queryClient.prefetchQuery(
                getBookSearchConfig(queryClient, client, ''),
            )
        },
        [client, queryClient],
    )
}

export function setQueryDataForBook(queryClient: QueryClient, book: CommonBook) {
    queryClient.setQueryData(['book', { bookId: book.id }], book)
}

