import { render } from "@wordpress/element"
import BookPage from "./BookPage"

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("thedah-bookpage")

  const providedValues = {
    isRtl: Boolean(root.dataset.isRtl),
    homeUrl: root.dataset.homeUrl,
    siteTitle: root.dataset.siteTitle,
    books: JSON.parse(
      document.getElementById('books').innerHTML
    )
  }

  render(<BookPage providedValues={providedValues} />, root)
})
