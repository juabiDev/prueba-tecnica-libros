"use client";

import { useEffect, useMemo, useState } from "react";
import type { Book } from "./types";

export default function IndexPageComponent({books, genres}: {books: Book[], genres:Book["genre"][]}) {

  const [genre, setGenre] = useState<Book["genre"]>("");
  const [readList, setReadList] = useState<Book["ISBN"][]>([]);
  const matches = useMemo(() => {
    if(!genre) return books;

    return books.filter((book) => {
      if(book.genre !== genre) return false;
      
      return true;
    })
  }, [genre, books])

  function handleBookClick(book: Book["ISBN"]) {
    const draft = readList?.includes(book)
    ? readList.filter((readbook) => readbook !== book)
    : [...readList, book]

    setReadList(draft)
    localStorage.setItem("readlist", JSON.stringify(draft));
  }

  function onReadListChange(callback: (readList: Book["ISBN"][]) => void) {
    function getReadList() {
      const readList =  JSON.parse(localStorage.getItem("readlist") ?? "[]")
      callback(readList);
    }

    window.addEventListener("storage", getReadList)

    getReadList();

    return () => window.removeEventListener("storage", getReadList)
  }

  useEffect(() => {
    const unsuscribe = onReadListChange(setReadList);

    return () => unsuscribe();
  }, []);


  return (
    <article className="grid gap-4">
      <nav>
        <select value={genre} name="" id="" onChange={(event) => {
            setGenre(event.target.value);
        }}>
          <option value="">Todos</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </nav>
      
      <ul className="grid grid-cols-3 gap-5">
        {matches.map(book => (
          <li key={book.ISBN} onClick={() => handleBookClick(book.ISBN)}>
            <img className="aspect-[9/14] object-cover" alt={book.title} src={book.cover} />
            <p>{book.title} <span>{readList.includes(book.ISBN) ? "⭐" : ""}</span></p>
          </li>
        ))}
      </ul>

    </article>
  );
}
