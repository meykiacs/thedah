import { renderPage } from "../../utils/renderpage"
import { ContactPage } from "./ContactPage"

const handleHomePageSpecialCase = (root, providedValues) => {
  providedValues.social = JSON.parse(document.getElementById("social").innerHTML)
  providedValues.socialRestUrl = document.getElementById("social-data").dataset.restUrl
  providedValues.socialFetched = document.getElementById("social-data").dataset.fetched
}

renderPage(ContactPage, "thedah-contactpage", handleHomePageSpecialCase)
