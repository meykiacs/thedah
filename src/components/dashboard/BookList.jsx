import { useEffect } from "@wordpress/element"
import useBooksContext from "../../context/useBooksContext"
import useWPContext from "../../context/useWPContext"
import useLanguageContext from "../../context/useLanguageContext"
import { Stack } from "@mantine/core"
import { BookCard } from "./BookCard"

export default function BookList() {
  const {
    booksFa,
    booksEn,
    isBooksFaFetched,
    isBooksEnFetched,
    setIsBooksFaFetched,
    setIsBooksEnFetched,
    setBooksFa,
    setBooksEn,
  } = useBooksContext()
  const { lang } = useLanguageContext()
  const { bookRestUrlFa, bookRestUrlEn } = useWPContext()
  const books = lang === "fa" ? booksFa : booksEn

  // fetch books if not already fetched
  useEffect(() => {
    const fetchBooks = async (url, setBooks, setFetched) => {
      const response = await fetch(url)
      const data = await response.json()
      const books = data.map((book) => ({
        id: book.id,
        featured_media_urk: book.thumbnail,
        title: book.title.rendered,
        content: book.content.rendered,
        meta: book.meta
      }))
      setBooks(books)
      setFetched(true)
    }

    if (lang === "fa" && !isBooksFaFetched) {
      fetchBooks(bookRestUrlFa, setBooksFa, setIsBooksFaFetched)
    }

    if (lang === "en" && !isBooksEnFetched) {
      fetchBooks(bookRestUrlEn, setBooksEn, setIsBooksEnFetched)
    }
  }, [
    lang,
    bookRestUrlEn,
    bookRestUrlFa,
    isBooksEnFetched,
    isBooksFaFetched,
    setIsBooksEnFetched,
    setIsBooksFaFetched,
    setBooksEn,
    setBooksFa,
  ])

  return (
    <Stack maxW="container.md">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </Stack>
  )
}
