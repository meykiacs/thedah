import { render } from "@wordpress/element"
import { LanguageProvider } from "../../context/LanguageContext"
import { ColorSchemeProvider } from "../../context/ColorSchemeContext"
import { SinglePaperPage } from "./SinglePaperPage"

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("thedah-singlepaperpage")

  const providedValues = {
    homeUrl: root.dataset.homeUrl,
    siteTitle: root.dataset.siteTitle,
    restNonce: root.dataset.restNonce,
    mediaRestUrl: root.dataset.mediaRestUrl,
    commentsRestUrl: root.dataset.commentsRestUrl,
    postId: root.dataset.postId,
    assetsFontsUrl: root.dataset.assetsFontsUrl,
    assetsImagesUrl: root.dataset.assetsImagesUrl,
    prefix: root.dataset.prefix,
    newsletterRestUrl: root.dataset.newsletterRestUrl,
    postTitle: root.dataset.postTitle,
    images: JSON.parse(root.dataset.images),
    content: JSON.parse(root.dataset.content),
    dateTime: root.dataset.dateTime,
    author: root.dataset.author,
    summary: root.dataset.summary,
    publisher: root.dataset.publisher,
    coauthors: JSON.parse(root.dataset.coauthors),
    fullReference: root.dataset.fullReference,
    year: root.dataset.year,
    link: root.dataset.link,
    writer: root.dataset.writer,

  }
  console.log(providedValues.images)
  const direction = root.dataset.direction
  const language = root.dataset.language

  render(
    <LanguageProvider language={language} direction={direction}>
      <ColorSchemeProvider>
        <SinglePaperPage providedValues={providedValues} />
      </ColorSchemeProvider>
    </LanguageProvider>,
    root,
  )
})
