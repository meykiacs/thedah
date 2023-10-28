import { setMeta, setPageTitle } from "../../utils/meta"
import { renderPage } from "../../utils/renderpage"
import { ContactPage } from "./ContactPage"

const handleHomePageSpecialCase = (root, providedValues) => {
  providedValues.social = JSON.parse(
    document.getElementById("social").innerHTML,
  )
  providedValues.socialRestUrl =
    document.getElementById("social-data").dataset.restUrl
  providedValues.socialFetched =
    document.getElementById("social-data").dataset.fetched

  providedValues.title = JSON.parse(document.getElementById("title").innerHTML)
  providedValues.description = JSON.parse(
    document.getElementById("description").innerHTML,
  )
  setPageTitle(providedValues.title.fa)
  setMeta("description", providedValues.description.fa)
}

renderPage(ContactPage, "thedah-contactpage", handleHomePageSpecialCase)
