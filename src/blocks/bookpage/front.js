import { render } from "@wordpress/element"
import { LanguageProvider } from "../../context/LanguageContext"
import BookPage from "./BookPage"
import { ColorSchemeProvider } from "../../context/ColorSchemeContext"

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("thedah-bookpage")
  document.documentElement.setAttribute("lang", "fa")
  document.body.dir = "rtl"

  const providedValues = {
    homeUrl: root.dataset.homeUrl,
    siteTitle: root.dataset.siteTitle,
    restNonce: root.dataset.restNonce,
    bookRestUrlEn: root.dataset.bookRestUrlEn,
    bookRestUrlFa: root.dataset.bookRestUrlFa,
    mediaRestUrl: root.dataset.mediaRestUrl,
    assetsFontsUrl: root.dataset.assetsFontsUrl,
    assetsImagesUrl: root.dataset.assetsImagesUrl,
    isBooksFaFetched: !!root.dataset.booksFaFetched,
    isBooksEnFetched: !!root.dataset.booksEnFetched,
    resourceName: root.dataset.resourceName,
    resourceHuman: root.dataset.resourceHuman,
    booksFa: JSON.parse(document.getElementById("books-fa").innerHTML),
    booksEn: JSON.parse(document.getElementById("books-en").innerHTML),
  }
  render(
    <LanguageProvider>
      <ColorSchemeProvider>
        <BookPage providedValues={providedValues} />
      </ColorSchemeProvider>
    </LanguageProvider>,
    root
  )
})
