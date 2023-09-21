import { render } from "@wordpress/element"
import { LanguageProvider } from "../../context/LanguageContext"
import { ColorSchemeProvider } from "../../context/ColorSchemeContext"
import AboutPage from "./AboutPage"

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("thedah-paperpage")
  document.documentElement.setAttribute("lang", "fa")
  document.body.dir = "rtl"

  const providedValues = {
    homeUrl: root.dataset.homeUrl,
    siteTitle: root.dataset.siteTitle,
    restNonce: root.dataset.restNonce,
    paperRestUrlEn: root.dataset.paperRestUrlEn,
    paperRestUrlFa: root.dataset.paperRestUrlFa,
    mediaRestUrl: root.dataset.mediaRestUrl,
    assetsFontsUrl: root.dataset.assetsFontsUrl,
    assetsImagesUrl: root.dataset.assetsImagesUrl,
    isPapersFaFetched: !!root.dataset.papersFaFetched,
    isPapersEnFetched: !!root.dataset.papersEnFetched,
    resourceName: root.dataset.resourceName,
    papersFa: JSON.parse(document.getElementById("papers-fa").textContent),
    papersEn: JSON.parse(document.getElementById("papers-en").textContent),
  }
  render(
    <LanguageProvider>
      <ColorSchemeProvider>
        <AboutPage providedValues={providedValues} />
      </ColorSchemeProvider>
    </LanguageProvider>,
    root
  )
})
