type BookData = {
    books: Array<{
        id: string
        title: string
        author: string
        coverImageUrl: string
        pageCount: number
        publisher: string
        synopsis: string
    }>
    error?: {
        message: string
        status: number
    }
}

type BooksData = any
export { BookData, BooksData }
