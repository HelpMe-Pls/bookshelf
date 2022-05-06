// Do this:
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

// Instead of:
// interface BooksData {
//     books: {
//         id: string;
//         title: string;
//         author: string;
//         coverImageUrl: string;
//         pageCount: number;
//         publisher: string;
//         synopsis: string;
//     }[];
//     error?: {
//         message: string;
//         status: number;
//     };
// }
// type BookType = BooksData["books"][number];

export { Book, BooksData, BooksError }
