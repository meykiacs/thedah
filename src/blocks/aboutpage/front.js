import { render } from "@wordpress/element"
import { LanguageProvider } from "../../context/LanguageContext"
import { ColorSchemeProvider } from "../../context/ColorSchemeContext"
import AboutPage from "./AboutPage"

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("thedah-aboutpage")
  document.documentElement.setAttribute("lang", "fa")
  document.body.dir = "rtl"

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
    <LanguageProvider>
      <ColorSchemeProvider>
        <AboutPage providedValues={providedValues} />
      </ColorSchemeProvider>
    </LanguageProvider>,
    root
  )
})
