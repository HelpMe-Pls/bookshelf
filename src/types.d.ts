// Do this:
export type Book = {
    id: string;
    title: string;
    author: string;
    coverImageUrl: string;
    pageCount: number;
    publisher: string;
    synopsis: string;
}
export interface BooksData {
    books: Book[];
}

export type ErrorResponse = {
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

export type User = {
    id: string;
    token: string;
    username: string;
}

export interface UserInput {
    username: HTMLInputElement | string
    password: HTMLInputElement | string
}


