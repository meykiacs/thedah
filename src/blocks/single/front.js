import { render } from "@wordpress/element"
import { LanguageProvider } from "../../context/LanguageContext"
import { ColorSchemeProvider } from "../../context/ColorSchemeContext"
import { Single } from "./Single"

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("thedah-aboutpage")

  const providedValues = {
    homeUrl: root.dataset.homeUrl,
    siteTitle: root.dataset.siteTitle,
    restNonce: root.dataset.restNonce,
    mediaRestUrl: root.dataset.mediaRestUrl,
    assetsFontsUrl: root.dataset.assetsFontsUrl,
    assetsImagesUrl: root.dataset.assetsImagesUrl,
    aboutRestUrlEn: root.dataset.aboutRestUrlEn,
    aboutRestUrlFa: root.dataset.aboutRestUrlFa,
    bookRestUrlEn: root.dataset.bookRestUrlEn,
    bookRestUrlFa: root.dataset.bookRestUrlFa,
    paperRestUrlEn: root.dataset.paperRestUrlEn,
    paperRestUrlFa: root.dataset.paperRestUrlFa,
    isAboutFaFetched: !!root.dataset.aboutFaFetched,
    isAboutEnFetched: !!root.dataset.aboutEnFetched,
    isBooksFaFetched: !!root.dataset.booksFaFetched,
    isBooksEnFetched: !!root.dataset.booksEnFetched,
    isPapersFaFetched: !!root.dataset.papersFaFetched,
    isPapersEnFetched: !!root.dataset.papersEnFetched,
    aboutFa: JSON.parse(document.getElementById("about-fa").textContent),
    aboutEn: JSON.parse(document.getElementById("about-en").textContent),
    booksFa: JSON.parse(document.getElementById("books-fa").textContent),
    booksEn: JSON.parse(document.getElementById("books-en").textContent),
    papersFa: JSON.parse(document.getElementById("papers-fa").textContent),
    papersEn: JSON.parse(document.getElementById("papers-en").textContent),
    resourceName: root.dataset.resourceName,
  }

  render(
    <LanguageProvider>
      <ColorSchemeProvider>
        <Single providedValues={providedValues} />
      </ColorSchemeProvider>
    </LanguageProvider>,
    root
  )
})
