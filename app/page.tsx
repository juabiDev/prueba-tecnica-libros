import IndexPageComponent from "./client";
import type { Book } from "./types";


export default async function IndexPage() {
    const books: Book[] = await new Promise(
        (resolve) => {
            resolve(
                import("../public/book.json").then((data) => data.library.map((data) => data.book))
            )   
        }
    )
    
    const genres: string[] = Array.from(new Set(books.map(book => book.genre)))

    return <IndexPageComponent books={books} genres={genres} />
}