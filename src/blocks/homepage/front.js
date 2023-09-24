import { render } from "@wordpress/element"
import { LanguageProvider } from "../../context/LanguageContext"
import { ColorSchemeProvider } from "../../context/ColorSchemeContext"
import HomePage from "./HomePage"

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("thedah-aboutpage")
  document.documentElement.setAttribute("lang", root.dataset.lang)
  document.body.dir = root.dataset.direction

  const providedValues = {
    homeUrl: root.dataset.homeUrl,
    siteTitle: root.dataset.siteTitle,
    restNonce: root.dataset.restNonce,
    aboutRestUrlEn: root.dataset.aboutRestUrlEn,
    aboutRestUrlFa: root.dataset.aboutRestUrlFa,
    mediaRestUrl: root.dataset.mediaRestUrl,
    assetsFontsUrl: root.dataset.assetsFontsUrl,
    assetsImagesUrl: root.dataset.assetsImagesUrl,
    isAboutFaFetched: !!root.dataset.aboutFaFetched,
    isAboutEnFetched: !!root.dataset.aboutEnFetched,
    resourceName: root.dataset.resourceName,
    aboutFa: JSON.parse(document.getElementById("about-fa").textContent),
    aboutEn: JSON.parse(document.getElementById("about-en").textContent),
  }

  render(
    <LanguageProvider
      language={root.dataset.lang}
      direction={root.dataset.direction}
    >
      <ColorSchemeProvider>
        <HomePage providedValues={providedValues} />
      </ColorSchemeProvider>
    </LanguageProvider>,
    root
  )
})
