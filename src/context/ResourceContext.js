import { createContext, useState } from "@wordpress/element"

const ResourceContext = createContext()

export const ResourceProvider = ({ providedValues, children }) => {
  const [resourceName, setResourceName] = useState(providedValues.resourceName)
  const [resourceHuman, setResourceHuman] = useState(
    providedValues.resourceHuman
  )

  const [booksFa, setBooksFa] = useState(providedValues.booksFa)
  const [booksEn, setBooksEn] = useState(providedValues.booksEn)
  const [isBooksFaFetched, setIsBooksFaFetched] = useState(
    providedValues.isBooksFaFetched
  )
  const [isBooksEnFetched, setIsBooksEnFetched] = useState(
    providedValues.isBooksEnFetched
  )

  const [papersFa, setPapersFa] = useState(providedValues.papersFa)
  const [papersEn, setPapersEn] = useState(providedValues.papersEn)
  const [isPapersFaFetched, setIsPapersFaFetched] = useState(
    providedValues.isPapersFaFetched
  )
  const [isPapersEnFetched, setIsPapersEnFetched] = useState(
    providedValues.isBooksEnFetched
  )

  const [singlePostsFa, setSinglePostsFa] = useState(
    providedValues.singlePostsFa
  )
  const [singlePostsEn, setSinglePostsEn] = useState(
    providedValues.singlePostsEn
  )
  const [isSinglePostsFaFetched, setIsSinglePostsFaFetched] = useState(
    providedValues.isSinglePostsFaFetched
  )
  const [isSinglePostsEnFetched, setIsSinglePostsEnFetched] = useState(
    providedValues.isBooksEnFetched
  )
  const [aboutFa, setAboutFa] = useState(providedValues.aboutFa)
  const [aboutEn, setAboutEn] = useState(providedValues.aboutEn)
  const [isAboutFaFetched, setIsAboutFaFetched] = useState(
    providedValues.isAboutFaFetched
  )
  const [isAboutEnFetched, setIsAboutEnFetched] = useState(
    providedValues.isBooksEnFetched
  )

  const {
    bookRestUrlEn,
    bookRestUrlFa,
    paperRestUrlEn,
    paperRestUrlFa,
    mediaRestUrl,
    restNonce,
    aboutRestUrlEn,
    aboutRestUrlFa,
    singlePostRestUrlEn,
    singlePostRestUrlFa,
  } = providedValues

  const resources = {
    book: {
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
    },
    paper: {
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
    },
    singlePost: {
      fa: singlePostsFa,
      en: singlePostsEn,
      setEn: setSinglePostsEn,
      setFa: setSinglePostsFa,
      isFaFetched: isSinglePostsFaFetched,
      isEnFetched: isSinglePostsEnFetched,
      setIsFaFetched: setIsSinglePostsFaFetched,
      setIsEnFetched: setIsSinglePostsEnFetched,
      restUrlEn: singlePostRestUrlEn,
      restUrlFa: singlePostRestUrlFa,
    },
    about: {
      fa: aboutFa,
      en: aboutEn,
      setEn: setAboutEn,
      setFa: setAboutFa,
      isFaFetched: isAboutFaFetched,
      isEnFetched: isAboutEnFetched,
      setIsFaFetched: setIsAboutFaFetched,
      setIsEnFetched: setIsAboutEnFetched,
      restUrlEn: aboutRestUrlEn,
      restUrlFa: aboutRestUrlFa,
    },
  }

  return (
    <ResourceContext.Provider
      value={{
        resources, // all resources are now available simultaneously
        resourceName, // this can still be used if you need to know the "active" resource
        setResourceName,
        resourceHuman,
        setResourceHuman,
        mediaRestUrl,
        restNonce,
      }}
    >
      {children}
    </ResourceContext.Provider>
  )
}
export default ResourceContext
