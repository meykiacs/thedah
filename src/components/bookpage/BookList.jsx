import { useEffect } from "@wordpress/element"
import useBooksContext from "../../context/useBooksContext"
import useWPContext from "../../context/useWPContext"
import useLanguageContext from "../../context/useLanguageContext"
import { BookCard } from "./BookCard"
import styled from "@emotion/styled"

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
        picture: book.thumbnail,
        title: book.title.rendered,
        description: book.content.rendered,
        meta: book.meta._thedah_book,
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
    <Wrapper>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </Wrapper>
  )
}


const Wrapper = styled.div`
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: space-between;
  align-items: center;
`