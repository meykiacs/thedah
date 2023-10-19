import { render } from "@wordpress/element"
import { LanguageProvider } from "../../context/LanguageContext"
import { ColorSchemeProvider } from "../../context/ColorSchemeContext"
import { SearchPage } from "./SearchPage"

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("thedah-searchpage")

  const providedValues = {
    homeUrl: root.dataset.homeUrl,
    siteTitle: root.dataset.siteTitle,
    restNonce: root.dataset.restNonce,
    postId: root.dataset.postId,
    assetsFontsUrl: root.dataset.assetsFontsUrl,
    assetsImagesUrl: root.dataset.assetsImagesUrl,
    prefix: root.dataset.prefix,
    newsletterRestUrl: root.dataset.newsletterRestUrl,
    searchQuery: root.dataset.searchQuery,
    posts: JSON.parse(root.dataset.posts),
  }
  console.log(providedValues)
  render(
    <LanguageProvider>
      <ColorSchemeProvider>
        <SearchPage providedValues={providedValues} />
      </ColorSchemeProvider>
    </LanguageProvider>,
    root,
  )
})
