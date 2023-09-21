import { render } from "@wordpress/element"
import { LanguageProvider } from "../../context/LanguageContext"
import Dashboard from "./Dashboard"

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("thedah-dashboard")
  document.documentElement.setAttribute("lang", "fa")
  document.body.dir = "rtl"

  const providedValues = {
    homeUrl: root.dataset.homeUrl,
    siteTitle: root.dataset.siteTitle,
    restNonce: root.dataset.restNonce,
    bookRestUrlEn: root.dataset.bookRestUrlEn,
    bookRestUrlFa: root.dataset.bookRestUrlFa,
    paperRestUrlEn: root.dataset.paperRestUrlEn,
    paperRestUrlFa: root.dataset.paperRestUrlFa,
    aboutRestUrlEn: root.dataset.aboutRestUrlEn,
    aboutRestUrlFa: root.dataset.aboutRestUrlFa,
    mediaRestUrl: root.dataset.mediaRestUrl,
    assetsFontsUrl: root.dataset.assetsFontsUrl,
    assetsImagesUrl: root.dataset.assetsImagesUrl,
    isBooksFaFetched: !!root.dataset.booksFaFetched,
    isBooksEnFetched: !!root.dataset.booksEnFetched,
    isPapersFaFetched: !!root.dataset.papersFaFetched,
    isPapersEnFetched: !!root.dataset.papersEnFetched,
    isAboutFaFetched: !!root.dataset.aboutFaFetched,
    isAboutEnFetched: !!root.dataset.aboutEnFetched,
    booksFa: JSON.parse(document.getElementById("books-fa").textContent),
    booksEn: JSON.parse(document.getElementById("books-en").textContent),
    papersFa: JSON.parse(document.getElementById("papers-fa").textContent),
    papersEn: JSON.parse(document.getElementById("papers-en").textContent),
    aboutFa: JSON.parse(document.getElementById("about-fa").textContent),
    aboutEn: JSON.parse(document.getElementById("about-en").textContent),
    resourceName: root.dataset.resourceName,
    resourceHuman: root.dataset.resourceHuman,
  }

  console.log(providedValues.aboutFa)
  render(
    <LanguageProvider>
      <Dashboard providedValues={providedValues} />
    </LanguageProvider>,
    root
  )
})
