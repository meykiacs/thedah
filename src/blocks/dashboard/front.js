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
    mediaRestUrl: root.dataset.mediaRestUrl,
    assetsFontsUrl: root.dataset.assetsFontsUrl,
    assetsImagesUrl: root.dataset.assetsImagesUrl,
    isBooksFaFetched: !!root.dataset.booksFaFetched,
    isBooksEnFetched: !!root.dataset.booksEnFetched,
    booksFa: JSON.parse(document.getElementById("books-fa").textContent),
    booksEn: JSON.parse(document.getElementById("books-en").textContent),
    isPapersFaFetched: !!root.dataset.papersFaFetched,
    isPapersEnFetched: !!root.dataset.papersEnFetched,
    papersFa: JSON.parse(document.getElementById("papers-fa").textContent),
    papersEn: JSON.parse(document.getElementById("papers-en").textContent),
  }
  render(
    <LanguageProvider>
      <Dashboard providedValues={providedValues} />
    </LanguageProvider>,
    root
  )
})
