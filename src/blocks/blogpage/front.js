import { render } from "@wordpress/element"
import { LanguageProvider } from "../../context/LanguageContext"
import { ColorSchemeProvider } from "../../context/ColorSchemeContext"
import { BlogPage } from "./BlogPage"

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("thedah-blogpage")

  const providedValues = {
    homeUrl: root.dataset.homeUrl,
    siteTitle: root.dataset.siteTitle,
    restNonce: root.dataset.restNonce,
    mediaRestUrl: root.dataset.mediaRestUrl,
    assetsFontsUrl: root.dataset.assetsFontsUrl,
    assetsImagesUrl: root.dataset.assetsImagesUrl,
    prefix: root.dataset.prefix,
    newsletterRestUrl: root.dataset.newsletterRestUrl,
    postTitle: root.dataset.postTitle,
    images: JSON.parse(root.dataset.images),
    content: JSON.parse(root.dataset.content),
    linkToFeature: root.dataset.linkToFeature,
    feature: root.dataset.feature,
    dateTime: root.dataset.dateTime,
    author: root.dataset.author,
  }
  console.log(providedValues.images[0])
  const direction = root.dataset.direction
  const language = root.dataset.language

  render(
    <LanguageProvider language={language} direction={direction}>
      <ColorSchemeProvider>
        <BlogPage providedValues={providedValues} />
      </ColorSchemeProvider>
    </LanguageProvider>,
    root,
  )
})
