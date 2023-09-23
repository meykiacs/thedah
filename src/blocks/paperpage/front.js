import { render } from "@wordpress/element"
import { LanguageProvider } from "../../context/LanguageContext"
import PaperPage from "./PaperPage"
import { ColorSchemeProvider } from "../../context/ColorSchemeContext"

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("thedah-paperpage")
  document.documentElement.setAttribute("lang", root.dataset.lang)
  document.body.dir = root.dataset.direction
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
    <LanguageProvider
      language={root.dataset.lang}
      direction={root.dataset.direction}
    >
      <ColorSchemeProvider>
        <PaperPage providedValues={providedValues} />
      </ColorSchemeProvider>
    </LanguageProvider>,
    root
  )
})
