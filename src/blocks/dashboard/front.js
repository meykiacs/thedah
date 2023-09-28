import { render } from "@wordpress/element"
import { LanguageProvider } from "../../context/LanguageContext"
import Dashboard from "./Dashboard"
import "./front.css"

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("thedah-dashboard")
  document.documentElement.setAttribute("lang", "fa")
  document.body.dir = "rtl"

  const providedValues = {
    homeUrl: root.dataset.homeUrl,
    siteTitle: root.dataset.siteTitle,
    restNonce: root.dataset.restNonce,
    mediaRestUrl: root.dataset.mediaRestUrl,
    assetsFontsUrl: root.dataset.assetsFontsUrl,
    assetsImagesUrl: root.dataset.assetsImagesUrl,
    bookRestUrlEn: root.dataset.bookRestUrlEn,
    bookRestUrlFa: root.dataset.bookRestUrlFa,
    paperRestUrlEn: root.dataset.paperRestUrlEn,
    paperRestUrlFa: root.dataset.paperRestUrlFa,
    aboutRestUrlEn: root.dataset.aboutRestUrlEn,
    aboutRestUrlFa: root.dataset.aboutRestUrlFa,
    singlePostRestUrlEn: root.dataset.singlepostRestUrlEn,
    singlePostRestUrlFa: root.dataset.singlepostRestUrlFa,
    isBooksFaFetched: !!root.dataset.booksFaFetched,
    isBooksEnFetched: !!root.dataset.booksEnFetched,
    isPapersFaFetched: !!root.dataset.papersFaFetched,
    isPapersEnFetched: !!root.dataset.papersEnFetched,
    isAboutFaFetched: !!root.dataset.aboutFaFetched,
    isAboutEnFetched: !!root.dataset.aboutEnFetched,
    isSinglePostsFaFetched: !!root.dataset.singlepostsFaFetched,
    isSinglePostsEnFetched: !!root.dataset.singlepostsEnFetched,
    booksFa: JSON.parse(document.getElementById("books-fa").textContent),
    booksEn: JSON.parse(document.getElementById("books-en").textContent),
    papersFa: JSON.parse(document.getElementById("papers-fa").textContent),
    papersEn: JSON.parse(document.getElementById("papers-en").textContent),
    aboutFa: JSON.parse(document.getElementById("about-fa").textContent),
    aboutEn: JSON.parse(document.getElementById("about-en").textContent),
    singlePostsFa: JSON.parse(document.getElementById("singleposts-fa").textContent),
    singlePostsEn: JSON.parse(document.getElementById("singleposts-en").textContent),
    resourceName: root.dataset.resourceName,
    resourceHuman: root.dataset.resourceHuman,
  }

  render(
    <LanguageProvider>
      <Dashboard providedValues={providedValues} />
    </LanguageProvider>,
    root
  )
})
