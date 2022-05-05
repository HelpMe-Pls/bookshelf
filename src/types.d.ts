type Book = {
    id: string;
    title: string;
    author: string;
    coverImageUrl: string;
    pageCount: number;
    publisher: string;
    synopsis: string;
}
interface BooksData {
    books: Book[];
}

type BooksError = {
    message: string;
    status: number;
}


export { Book, BooksData, BooksError }
