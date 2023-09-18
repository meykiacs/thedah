import { createContext, useState } from "@wordpress/element"

const ResourceContext = createContext()

export const ResourceProvider = ({ providedValues, children }) => {
  const [resourceName, setResourceName] = useState("book")
  const [booksFa, setBooksFa] = useState(providedValues.booksFa)
  const [booksEn, setBooksEn] = useState(providedValues.booksEn)
  const [isBooksFaFetched, setIsBooksFaFetched] = useState(
    providedValues.isBooksFaFetched
  )
  const [isBooksEnFetched, setIsBooksEnFetched] = useState(
    providedValues.isBooksEnFetched
  )
  const { bookRestUrlEn, bookRestUrlFa } = providedValues

  const [papersFa, setPapersFa] = useState(providedValues.papersFa)
  const [papersEn, setPapersEn] = useState(providedValues.papersEn)
  const [isPapersFaFetched, setIsPapersFaFetched] = useState(
    providedValues.isPapersFaFetched
  )
  const [isPapersEnFetched, setIsPapersEnFetched] = useState(
    providedValues.isBooksEnFetched
  )
  const { paperRestUrlEn, paperRestUrlFa, mediaRestUrl, restNonce } = providedValues

  const bookResource = {
    fa: booksFa,
    en: booksEn,
    setEn: setBooksEn,
    setFa: setBooksFa,
    isFaFetched: isBooksFaFetched,
    isEnFetched: isBooksEnFetched,
    setIsFaFetched: setIsBooksFaFetched,
    setIsEnFetched: setIsBooksEnFetched,
    restUrlEn: bookRestUrlEn,
    restUrlFa: bookRestUrlFa,
  }

  const paperResource = {
    fa: papersFa,
    en: papersEn,
    setEn: setPapersEn,
    setFa: setPapersFa,
    isFaFetched: isPapersFaFetched,
    isEnFetched: isPapersEnFetched,
    setIsFaFetched: setIsPapersFaFetched,
    setIsEnFetched: setIsPapersEnFetched,
    restUrlEn: paperRestUrlEn,
    restUrlFa: paperRestUrlFa,
  }

  let resource
  switch (resourceName) {
    case "book":
      resource = bookResource
      break
    case "paper":
      resource = paperResource
      break
  }
  return (
    <ResourceContext.Provider value={{ resource, resourceName, setResourceName, mediaRestUrl, restNonce }}>
      {children}
    </ResourceContext.Provider>
  )
}

export default ResourceContext
