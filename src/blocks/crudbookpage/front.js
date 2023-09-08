import { render } from "@wordpress/element"
import CrudBookPage from "./CrudBookPage"

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("thedah-crudbookpage")

  const providedValues = {
    isRtl: Boolean(root.dataset.isRtl),
    homeUrl: root.dataset.homeUrl,
    siteTitle: root.dataset.siteTitle,
    restNonce: root.dataset.restNonce,
    bookRestUrl: root.dataset.bookRestUrl,
    mediaRestUrl: root.dataset.mediaRestUrl,
    books: JSON.parse(
      document.getElementById('books').innerHTML
    )
  }

  render(<CrudBookPage providedValues={providedValues} />, root)
})
