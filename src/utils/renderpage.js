import { render } from "@wordpress/element"
import { LanguageProvider } from "../context/LanguageContext"
import { ColorSchemeProvider } from "../context/ColorSchemeContext"

export function renderPage(PageComponent, rootId, handleSpecialCase) {
  window.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById(rootId)

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
        document.getElementById(`${resource}-fa`).innerHTML,
      )
      providedValues[`${resource}En`] = JSON.parse(
        document.getElementById(`${resource}-en`).innerHTML,
      )
    })

    if (handleSpecialCase) {
      handleSpecialCase(root, providedValues)
    }

    render(
      <LanguageProvider>
        <ColorSchemeProvider>
          <PageComponent providedValues={providedValues} />
        </ColorSchemeProvider>
      </LanguageProvider>,
      root,
    )
  })
}
