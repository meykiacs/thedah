import { setMeta, setPageTitle } from "../../utils/meta"
import { renderPage } from "../../utils/renderpage"
import { AboutPage } from "./AboutPage"


const handleAboutPageSpecialCase = (root, providedValues) => {
  providedValues.title = JSON.parse(document.getElementById("title").innerHTML)
  providedValues.description = JSON.parse(document.getElementById("description").innerHTML)
  setPageTitle(providedValues.title.fa)
  setMeta('description', providedValues.description.fa)
  
}
renderPage(AboutPage, "thedah-aboutpage", handleAboutPageSpecialCase)
