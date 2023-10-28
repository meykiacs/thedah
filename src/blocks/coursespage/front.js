import { setMeta, setPageTitle } from "../../utils/meta"
import { renderPage } from "../../utils/renderpage"
import { CoursesPage } from "./CoursesPage"


const handleCoursesPageSpecialCase = (root, providedValues) => {
  providedValues.title = JSON.parse(document.getElementById("title").innerHTML)
  providedValues.description = JSON.parse(document.getElementById("description").innerHTML)
  setPageTitle(providedValues.title.fa)
  setMeta('description', providedValues.description.fa)
  
}
renderPage(CoursesPage, "thedah-coursespage", handleCoursesPageSpecialCase)
