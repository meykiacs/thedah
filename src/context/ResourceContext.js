import { createContext, useState } from "@wordpress/element"
import useLanguageContext from "./useLanguageContext"

const ResourceContext = createContext()

export const ResourceProvider = ({ providedValues, children }) => {
  const { lang } = useLanguageContext()
  const [resourceName, setResourceName] = useState(providedValues.resourceName)
  
  // const { resourceNames } = providedValues.resourceNames
  const [resourceHuman, setResourceHuman] = useState(
    providedValues.resourceHuman,
  )


  const {
    bookEnRestUrl,
    bookFaRestUrl,
    paperEnRestUrl,
    paperFaRestUrl,
    quoteEnRestUrl,
    quoteFaRestUrl,
    mediaRestUrl,
    restNonce,
    aboutEnRestUrl,
    aboutFaRestUrl,
    blogEnRestUrl,
    blogFaRestUrl,
    courseEnRestUrl,
    courseFaRestUrl,
    galleryEnRestUrl,
    galleryFaRestUrl,
    sliderEnRestUrl,
    sliderFaRestUrl,
    newsletterRestUrl,
    socialRestUrl,
    unapprovedCommentsFaRestUrl,
    unapprovedCommentsEnRestUrl,
    approvedCommentsFaRestUrl,
    approvedCommentsEnRestUrl,
  } = providedValues


  const [booksFa, setBooksFa] = useState(providedValues.bookFa)
  const [booksEn, setBooksEn] = useState(providedValues.bookEn)
  const [bookFaFetched, setBookFaFetched] = useState(
    providedValues.bookFaFetched,
  )
  const [bookEnFetched, setBookEnFetched] = useState(
    providedValues.bookEnFetched,
  )

  const [papersFa, setPapersFa] = useState(providedValues.paperFa)
  const [papersEn, setPapersEn] = useState(providedValues.paperEn)
  const [paperFaFetched, setPaperFaFetched] = useState(
    providedValues.paperFaFetched,
  )
  const [paperEnFetched, setPaperEnFetched] = useState(
    providedValues.paperEnFetched,
  )

  const [quotesFa, setQuotesFa] = useState(providedValues.quoteFa)
  const [quotesEn, setQuotesEn] = useState(providedValues.quoteEn)
  const [quoteFaFetched, setQuoteFaFetched] = useState(
    providedValues.quoteFaFetched,
  )
  const [quoteEnFetched, setQuoteEnFetched] = useState(
    providedValues.quoteEnFetched,
  )

  const [blogsFa, setBlogsFa] = useState(
    providedValues.blogFa,
  )
  const [blogsEn, setBlogsEn] = useState(
    providedValues.blogEn,
  )
  const [blogFaFetched, setBlogFaFetched] = useState(
    providedValues.blogFaFetched,
  )
  const [blogEnFetched, setBlogEnFetched] = useState(
    providedValues.blogEnFetched,
  )
  
  const [coursesFa, setCoursesFa] = useState(
    providedValues.courseFa,
  )
  const [coursesEn, setCoursesEn] = useState(
    providedValues.courseEn,
  )
  const [courseFaFetched, setCourseFaFetched] = useState(
    providedValues.courseFaFetched,
  )
  const [courseEnFetched, setCourseEnFetched] = useState(
    providedValues.courseEnFetched,
  )
  
  const [galleriesFa, setGalleriesFa] = useState(
    providedValues.galleryFa,
  )
  const [galleriesEn, setGalleriesEn] = useState(
    providedValues.galleryEn,
  )
  const [galleryFaFetched, setGalleryFaFetched] = useState(
    providedValues.galleryFaFetched,
  )
  const [galleryEnFetched, setGalleryEnFetched] = useState(
    providedValues.galleryEnFetched,
  )

  const [sliderFa, setSliderFa] = useState(
    providedValues.sliderFa,
  )
  const [sliderEn, setSliderEn] = useState(
    providedValues.sliderEn,
  )
  const [sliderFaFetched, setSliderFaFetched] = useState(
    providedValues.sliderFaFetched,
  )
  const [sliderEnFetched, setSliderEnFetched] = useState(
    providedValues.sliderEnFetched,
  )


  const [unapprovedCommentsFa, setUnapprovedCommentsFa] = useState(
    providedValues.unapprovedCommentsFa,
  )
  const [unapprovedCommentsEn, setUnapprovedCommentsEn] = useState(
    providedValues.unapprovedCommentsEn,
  )
  const [unapprovedCommentsFaFetched, setUnapprovedCommentsFaFetched] = useState(
    providedValues.unapprovedCommentsFaFetched,
  )
  const [unapprovedCommentsEnFetched, setUnapprovedCommentsEnFetched] = useState(
    providedValues.unapprovedCommentsEnFetched,
  )

  const [approvedCommentsFa, setApprovedCommentsFa] = useState(
    providedValues.approvedCommentsFa,
  )
  const [approvedCommentsEn, setApprovedCommentsEn] = useState(
    providedValues.approvedCommentsEn,
  )
  const [approvedCommentsFaFetched, setApprovedCommentsFaFetched] = useState(
    providedValues.approvedCommentsFaFetched,
  )
  const [approvedCommentsEnFetched, setApprovedCommentsEnFetched] = useState(
    providedValues.approvedCommentsEnFetched,
  )

  const [aboutFa, setAboutFa] = useState(providedValues.aboutFa)
  const [aboutEn, setAboutEn] = useState(providedValues.aboutEn)
  const [aboutFaFetched, setAboutFaFetched] = useState(
    providedValues.aboutFaFetched,
  )
  const [aboutEnFetched, setAboutEnFetched] = useState(
    providedValues.aboutEnFetched,
  )

  const [newsletter, setNewsletter] = useState(providedValues.newsletter)
  const [newsletterFetched, setNewsletterFetched] = useState(providedValues.newsletterFetched)
  const [social, setSocial] = useState(providedValues.social)
  const [socialFetched, setSocialFetched] = useState(providedValues.socialFetched)

  const resources = {
    book: {
      fa: booksFa,
      en: booksEn,
      setEn: setBooksEn,
      setFa: setBooksFa,
      faFetched: bookFaFetched,
      enFetched: bookEnFetched,
      setFaFetched: setBookFaFetched,
      setEnFetched: setBookEnFetched,
      restUrlEn: bookEnRestUrl,
      restUrlFa: bookFaRestUrl,
      rs: lang === "fa" ? booksFa : booksEn,
      setR: lang === "fa" ? setBooksFa : setBooksEn,
      restUrl: lang === "fa" ? bookFaRestUrl : bookEnRestUrl,
      fetched: lang === "fa" ? bookFaFetched : bookEnFetched,
      setFetched: lang === "fa" ? setBookFaFetched : setBookEnFetched,
    },
    paper: {
      fa: papersFa,
      en: papersEn,
      setEn: setPapersEn,
      setFa: setPapersFa,
      faFetched: paperFaFetched,
      enFetched: paperEnFetched,
      setFaFetched: setPaperFaFetched,
      setEnFetched: setPaperEnFetched,
      restUrlEn: paperEnRestUrl,
      restUrlFa: paperFaRestUrl,
      rs: lang === "fa" ? papersFa : papersEn,
      setR: lang === "fa" ? setPapersFa : setPapersEn,
      restUrl: lang === "fa" ? paperFaRestUrl : paperEnRestUrl,
      fetched: lang === "fa" ? paperFaFetched : paperEnFetched,
      setFetched: lang === "fa" ? setPaperFaFetched : setPaperEnFetched,
    },
    quote: {
      fa: quotesFa,
      en: quotesEn,
      setEn: setQuotesEn,
      setFa: setQuotesFa,
      faFetched: quoteFaFetched,
      enFetched: quoteEnFetched,
      setFaFetched: setQuoteFaFetched,
      setEnFetched: setQuoteEnFetched,
      restUrlEn: quoteEnRestUrl,
      restUrlFa: quoteFaRestUrl,
      rs: lang === "fa" ? quotesFa : quotesEn,
      setR: lang === "fa" ? setQuotesFa : setQuotesEn,
      restUrl: lang === "fa" ? quoteFaRestUrl : quoteEnRestUrl,
      fetched: lang === "fa" ? quoteFaFetched : quoteEnFetched,
      setFetched: lang === "fa" ? setQuoteFaFetched : setQuoteEnFetched,
    },
    blog: {
      fa: blogsFa,
      en: blogsEn,
      setEn: setBlogsEn,
      setFa: setBlogsFa,
      faFetched: blogFaFetched,
      enFetched: blogEnFetched,
      setFaFetched: setBlogFaFetched,
      setEnFetched: setBlogEnFetched,
      restUrlEn: blogEnRestUrl,
      restUrlFa: blogFaRestUrl,
      rs: lang === "fa" ? blogsFa : blogsEn,
      setR: lang === "fa" ? setBlogsFa : setBlogsEn,
      restUrl: lang === "fa" ? blogFaRestUrl : blogEnRestUrl,
      fetched: lang === "fa" ? blogFaFetched : blogEnFetched,
      setFetched: lang === "fa" ? setBlogFaFetched : setBlogEnFetched,
    },
    course: {
      fa: coursesFa,
      en: coursesEn,
      setEn: setCoursesEn,
      setFa: setCoursesFa,
      faFetched: courseFaFetched,
      enFetched: courseEnFetched,
      setFaFetched: setCourseFaFetched,
      setEnFetched: setCourseEnFetched,
      restUrlEn: courseEnRestUrl,
      restUrlFa: courseFaRestUrl,
      rs: lang === "fa" ? coursesFa : coursesEn,
      setR: lang === "fa" ? setCoursesFa : setCoursesEn,
      restUrl: lang === "fa" ? courseFaRestUrl : courseEnRestUrl,
      fetched: lang === "fa" ? courseFaFetched : courseEnFetched,
      setFetched: lang === "fa" ? setCourseFaFetched : setCourseEnFetched,
    },
    gallery: {
      fa: galleriesFa,
      en: galleriesEn,
      setEn: setGalleriesEn,
      setFa: setGalleriesFa,
      faFetched: galleryFaFetched,
      enFetched: galleryEnFetched,
      setFaFetched: setGalleryFaFetched,
      setEnFetched: setGalleryEnFetched,
      restUrlEn: galleryEnRestUrl,
      restUrlFa: galleryFaRestUrl,
      rs: lang === "fa" ? galleriesFa : galleriesEn,
      setR: lang === "fa" ? setGalleriesFa : setGalleriesEn,
      restUrl: lang === "fa" ? galleryFaRestUrl : galleryEnRestUrl,
      fetched: lang === "fa" ? galleryFaFetched : galleryEnFetched,
      setFetched: lang === "fa" ? setGalleryFaFetched : setGalleryEnFetched,
    },
    slider: {
      fa: sliderFa,
      en: sliderEn,
      setEn: setSliderEn,
      setFa: setSliderFa,
      faFetched: sliderFaFetched,
      enFetched: sliderEnFetched,
      setFaFetched: setSliderFaFetched,
      setEnFetched: setSliderEnFetched,
      restUrlEn: sliderEnRestUrl,
      restUrlFa: sliderFaRestUrl,
      rs: lang === "fa" ? sliderFa : sliderEn,
      setR: lang === "fa" ? setSliderFa : setSliderEn,
      restUrl: lang === "fa" ? sliderFaRestUrl : sliderEnRestUrl,
      fetched: lang === "fa" ? sliderFaFetched : sliderEnFetched,
      setFetched: lang === "fa" ? setSliderFaFetched : setSliderEnFetched,
    },
    unapprovedComments: {
      fa: unapprovedCommentsFa,
      en: unapprovedCommentsEn,
      setEn: setUnapprovedCommentsEn,
      setFa: setUnapprovedCommentsFa,
      faFetched: unapprovedCommentsFaFetched,
      enFetched: unapprovedCommentsEnFetched,
      setFaFetched: setUnapprovedCommentsFaFetched,
      setEnFetched: setUnapprovedCommentsEnFetched,
      restUrlEn: unapprovedCommentsEnRestUrl,
      restUrlFa: unapprovedCommentsFaRestUrl,
      rs: lang === "fa" ? unapprovedCommentsFa : unapprovedCommentsEn,
      setR: lang === "fa" ? setUnapprovedCommentsFa : setUnapprovedCommentsEn,
      restUrl: lang === "fa" ? unapprovedCommentsFaRestUrl : unapprovedCommentsEnRestUrl,
      fetched: lang === "fa" ? unapprovedCommentsFaFetched : unapprovedCommentsEnFetched,
      setFetched: lang === "fa" ? setUnapprovedCommentsFaFetched : setUnapprovedCommentsEnFetched,
    },
    approvedComments: {
      fa: approvedCommentsFa,
      en: approvedCommentsEn,
      setEn: setApprovedCommentsEn,
      setFa: setApprovedCommentsFa,
      faFetched: approvedCommentsFaFetched,
      enFetched: approvedCommentsEnFetched,
      setFaFetched: setApprovedCommentsFaFetched,
      setEnFetched: setApprovedCommentsEnFetched,
      restUrlEn: approvedCommentsEnRestUrl,
      restUrlFa: approvedCommentsFaRestUrl,
      rs: lang === "fa" ? approvedCommentsFa : approvedCommentsEn,
      setR: lang === "fa" ? setApprovedCommentsFa : setApprovedCommentsEn,
      restUrl: lang === "fa" ? approvedCommentsFaRestUrl : approvedCommentsEnRestUrl,
      fetched: lang === "fa" ? approvedCommentsFaFetched : approvedCommentsEnFetched,
      setFetched: lang === "fa" ? setApprovedCommentsFaFetched : setApprovedCommentsEnFetched,
    },
    about: {
      fa: aboutFa,
      en: aboutEn,
      setEn: setAboutEn,
      setFa: setAboutFa,
      faFetched: aboutFaFetched,
      enFetched: aboutEnFetched,
      setFaFetched: setAboutFaFetched,
      setEnFetched: setAboutEnFetched,
      restUrlEn: aboutEnRestUrl,
      restUrlFa: aboutFaRestUrl,
      rs: lang === "fa" ? aboutFa : aboutEn,
      setR: lang === "fa" ? setAboutFa : setAboutEn,
      restUrl: lang === "fa" ? aboutFaRestUrl : aboutEnRestUrl,
      fetched: lang === "fa" ? aboutFaFetched : aboutEnFetched,
      setFetched: lang === "fa" ? setAboutFaFetched : setAboutEnFetched,
    },
    recent: {
      fa: providedValues.recentFa,
      en: providedValues.recentEn
    },
    newsletter: {
      rs : newsletter,
      setR: setNewsletter,
      restUrl: newsletterRestUrl,
      fetched: newsletterFetched,
      setFetched: setNewsletterFetched
    },
    social: {
      rs : social,
      setR: setSocial,
      restUrl: socialRestUrl,
      fetched: socialFetched,
      setFetched: setSocialFetched
    }
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
        singleResources: ['about', 'social', 'slider', 'quote']
      }}
    >
      {children}
    </ResourceContext.Provider>
  )
}
export default ResourceContext
