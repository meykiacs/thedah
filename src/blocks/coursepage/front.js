import { render } from "@wordpress/element"
import { LanguageProvider } from "../../context/LanguageContext"
import { ColorSchemeProvider } from "../../context/ColorSchemeContext"
import { CoursePage } from "./CoursePage"
import { setMeta, setPageTitle } from "../../utils/meta"

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("thedah-coursepage")

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
    instructor: root.dataset.instructor,
    duration: root.dataset.duration,
    price: root.dataset.price,
    organizer: root.dataset.organizer,
    courseType: root.dataset.courseType,
    availability: root.dataset.availability,
    linkToCourse: root.dataset.linkToCourse,
  }
  const direction = root.dataset.direction
  const language = root.dataset.language

  setPageTitle("دوره آموزشی - " + providedValues.postTitle)
  setMeta("description", "دوره آموزشی - " + providedValues.postTitle)

  render(
    <LanguageProvider language={language} direction={direction}>
      <ColorSchemeProvider>
        <CoursePage providedValues={providedValues} />
      </ColorSchemeProvider>
    </LanguageProvider>,
    root,
  )
})
