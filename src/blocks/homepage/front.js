import { setMeta, setPageTitle } from "../../utils/meta"
import { renderPage } from "../../utils/renderpage"
import HomePage from "./HomePage"

const handleHomePageSpecialCase = (root, providedValues) => {
  providedValues.recentFa = JSON.parse(document.getElementById("recent-fa").innerHTML)
  providedValues.recentEn = JSON.parse(document.getElementById("recent-en").innerHTML)
  providedValues.title = JSON.parse(document.getElementById("title").innerHTML)
  providedValues.description = JSON.parse(document.getElementById("description").innerHTML)
  setPageTitle(providedValues.title.fa)
  setMeta('description', providedValues.description.fa)
  
}

renderPage(HomePage, "thedah-homepage", handleHomePageSpecialCase)
