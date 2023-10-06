import { render } from "@wordpress/element"
import { LanguageProvider } from "../../context/LanguageContext"
import { ColorSchemeProvider } from "../../context/ColorSchemeContext"
import HomePage from "./HomePage"

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("thedah-homepage")

  const resourceNames = JSON.parse(root.dataset.resourceNames)
  const providedValues = {
    homeUrl: root.dataset.homeUrl,
    siteTitle: root.dataset.siteTitle,
    restNonce: root.dataset.restNonce,
    mediaRestUrl: root.dataset.mediaRestUrl,
    assetsFontsUrl: root.dataset.assetsFontsUrl,
    assetsImagesUrl: root.dataset.assetsImagesUrl,
    resourceName: root.dataset.resourceName,
    resourceHuman: root.dataset.resourceHuman,
    prefix: root.dataset.prefix,
  }

  resourceNames.forEach((resource) => {
    providedValues[`${resource}EnRestUrl`] =
      root.dataset[`${resource}EnRestUrl`]
    providedValues[`${resource}FaRestUrl`] =
      root.dataset[`${resource}FaRestUrl`]
    providedValues[`${resource}FaFetched`] =
      !!root.dataset[`${resource}FaFetched`]
    providedValues[`${resource}EnFetched`] =
      !!root.dataset[`${resource}EnFetched`]
    providedValues[`${resource}Fa`] = JSON.parse(
      document.getElementById(`${resource}-fa`).textContent,
    )
    providedValues[`${resource}En`] = JSON.parse(
      document.getElementById(`${resource}-en`).textContent,
    )
  })

  providedValues.recentFa = JSON.parse(document.getElementById("recent-fa").textContent)
  providedValues.recentEn = JSON.parse(document.getElementById("recent-en").textContent)
  render(
    <LanguageProvider>
      <ColorSchemeProvider>
        <HomePage providedValues={providedValues} />
      </ColorSchemeProvider>
    </LanguageProvider>,
    root,
  )
})
