// Do this:
export type BookData = {
    id: string;
    title: string | number;
    author: string;
    coverImageUrl: string;
    pageCount?: number;
    publisher: string;
    synopsis: string;
}
export type BooksData = {
    books: BookData[];
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
// type BookData = BooksData["books"][number];

export type BookProps = {
    bookId: string,
    ownerId?: string,
    rating?: number,
    notes?: string,
    startDate?: Date | number,
    finishDate?: Date | number | null,
}
export type BooksList = BookProps[] | undefined

export type Book = { book: BookData }

export type ErrorResponse = {
    message: string;
    status: number;
}

export type User = {
    id: string;
    token: string;
    username: string;
}

export interface UserInput {
    username: HTMLInputElement | string
    password: HTMLInputElement | string
}

export type ClientConfigs = {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
    body: string | undefined
    headers: {
        Authorization: string | undefined;
        'Content-Type': string | undefined;
    }
}
