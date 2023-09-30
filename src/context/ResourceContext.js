import { createContext, useState } from "@wordpress/element"
import useLanguageContext from "./useLanguageContext"

const ResourceContext = createContext()

export const ResourceProvider = ({ providedValues, children }) => {
  const { lang } = useLanguageContext()
  const [resourceName, setResourceName] = useState(providedValues.resourceName)
  const [resourceHuman, setResourceHuman] = useState(
    providedValues.resourceHuman,
  )

  const [booksFa, setBooksFa] = useState(providedValues.booksFa)
  const [booksEn, setBooksEn] = useState(providedValues.booksEn)
  const [isBooksFaFetched, setIsBooksFaFetched] = useState(
    providedValues.isBooksFaFetched,
  )
  const [isBooksEnFetched, setIsBooksEnFetched] = useState(
    providedValues.isBooksEnFetched,
  )

  const [papersFa, setPapersFa] = useState(providedValues.papersFa)
  const [papersEn, setPapersEn] = useState(providedValues.papersEn)
  const [isPapersFaFetched, setIsPapersFaFetched] = useState(
    providedValues.isPapersFaFetched,
  )
  const [isPapersEnFetched, setIsPapersEnFetched] = useState(
    providedValues.isBooksEnFetched,
  )

  const [singlePostsFa, setSinglePostsFa] = useState(
    providedValues.singlePostsFa,
  )
  const [singlePostsEn, setSinglePostsEn] = useState(
    providedValues.singlePostsEn,
  )
  const [isSinglePostsFaFetched, setIsSinglePostsFaFetched] = useState(
    providedValues.isSinglePostsFaFetched,
  )
  const [isSinglePostsEnFetched, setIsSinglePostsEnFetched] = useState(
    providedValues.isBooksEnFetched,
  )
  const [aboutFa, setAboutFa] = useState(providedValues.aboutFa)
  const [aboutEn, setAboutEn] = useState(providedValues.aboutEn)
  const [isAboutFaFetched, setIsAboutFaFetched] = useState(
    providedValues.isAboutFaFetched,
  )
  const [isAboutEnFetched, setIsAboutEnFetched] = useState(
    providedValues.isBooksEnFetched,
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
      rs: lang === 'fa' ? booksFa : booksEn,
      setR: lang === 'fa' ? setBooksFa : setBooksEn,
      restUrl: lang === 'fa' ? bookRestUrlFa : bookRestUrlEn,
      isFetched: lang === 'fa' ? isBooksFaFetched : isBooksEnFetched,
      setIsFetched: lang === 'fa' ? setIsBooksFaFetched : setIsBooksEnFetched,

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
      rs: lang === 'fa' ? papersFa : papersEn,
      setR: lang === 'fa' ? setPapersFa : setPapersEn,
      restUrl: lang === 'fa' ? paperRestUrlFa : paperRestUrlEn,
      isFetched: lang === 'fa' ? isPapersFaFetched : isPapersEnFetched,
      setIsFetched: lang === 'fa' ? setIsPapersFaFetched : setIsPapersEnFetched,
    },
    singlepost: {
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
      rs: lang === 'fa' ? singlePostsFa : singlePostsEn,
      setR: lang === 'fa' ? setSinglePostsFa : setSinglePostsEn,
      restUrl: lang === 'fa' ? singlePostRestUrlFa : singlePostRestUrlEn,
      isFetched: lang === 'fa' ? isSinglePostsFaFetched : isSinglePostsEnFetched,
      setIsFetched: lang === 'fa' ? setIsSinglePostsFaFetched : setIsSinglePostsEnFetched,

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
      rs: lang === 'fa' ? aboutFa : aboutEn,
      setR: lang === 'fa' ? setAboutFa : setAboutEn,
      restUrl: lang === 'fa' ? aboutRestUrlFa : aboutRestUrlEn,
      isFetched: lang === 'fa' ? isAboutFaFetched : isAboutEnFetched,
      setIsFetched: lang === 'fa' ? setIsAboutFaFetched : setIsAboutEnFetched,

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
