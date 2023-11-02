import { setMeta, setPageTitle } from "../../utils/meta"
import { renderPage } from "../../utils/renderpage"
import { GalleryPage } from "./GalleryPage"
import "./front.css"


const handleCoursesPageSpecialCase = (root, providedValues) => {
  providedValues.title = JSON.parse(document.getElementById("title").innerHTML)
  providedValues.description = JSON.parse(document.getElementById("description").innerHTML)
  setPageTitle(providedValues.title.fa)
  setMeta('description', providedValues.description.fa)
  
}
renderPage(GalleryPage, "thedah-gallerypage", handleCoursesPageSpecialCase)
