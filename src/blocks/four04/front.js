import { render } from "@wordpress/element"
import { LanguageProvider } from "../../context/LanguageContext"
import { Four04 } from "./Four04"
import "./front.css"

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("thedah-four04")

  const providedValues = {
    homeUrl: root.dataset.homeUrl,
    siteTitle: root.dataset.siteTitle,
    assetsFontsUrl: root.dataset.assetsFontsUrl,
    assetsImagesUrl: root.dataset.assetsImagesUrl,
    prefix: root.dataset.prefix,
  }

  render(
    <LanguageProvider>
        <Four04 providedValues={providedValues} />
    </LanguageProvider>,
    root,
  )
})
