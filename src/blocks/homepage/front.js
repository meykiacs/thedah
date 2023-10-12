import { renderPage } from "../../utils/renderpage"
import HomePage from "./HomePage"

const handleHomePageSpecialCase = (root, providedValues) => {
  providedValues.recentFa = JSON.parse(document.getElementById("recent-fa").innerHTML)
  providedValues.recentEn = JSON.parse(document.getElementById("recent-en").innerHTML)
}

renderPage(HomePage, "thedah-homepage", handleHomePageSpecialCase)
