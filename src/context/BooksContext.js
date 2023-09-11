import { createContext, useState } from "@wordpress/element"

const BooksContext = createContext()

export const BooksProvider = ({ providedValues, children }) => {
  const [booksFa, setBooksFa] = useState(providedValues.booksFa)
  const [booksEn, setBooksEn] = useState(providedValues.booksEn)
  const [isBooksFaFetched, setIsBooksFaFetched] = useState(
    providedValues.isBooksFaFetched
  )
  const [isBooksEnFetched, setIsBooksEnFetched] = useState(
    providedValues.isBooksEnFetched
  )
  return (
    <BooksContext.Provider
      value={{
        booksFa,
        booksEn,
        setBooksFa,
        setBooksEn,
        isBooksFaFetched,
        isBooksEnFetched,
        setIsBooksEnFetched,
        setIsBooksFaFetched,
      }}
    >
      {children}
    </BooksContext.Provider>
  )
}

export default BooksContext
