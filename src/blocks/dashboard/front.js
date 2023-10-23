import { render } from "@wordpress/element"
import { LanguageProvider } from "../../context/LanguageContext"
import Dashboard from "./Dashboard"
import "./front.css"

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("thedah-dashboard")

  const resourceNames = JSON.parse(root.dataset.resourceNames)
  const providedValues = {
    homeUrl: root.dataset.homeUrl,
    logoutUrl: root.dataset.logoutUrl,
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

  providedValues.newsletter = JSON.parse(document.getElementById('newsletter').innerHTML)
  providedValues.newsletterRestUrl = document.getElementById('newsletter-data').dataset.restUrl
  providedValues.newsletterFetched = document.getElementById('newsletter-data').dataset.fetched
  providedValues.social = JSON.parse(document.getElementById('social').innerHTML)
  providedValues.socialRestUrl = document.getElementById('social-data').dataset.restUrl
  providedValues.socialFetched = document.getElementById('social-data').dataset.fetched
  
  providedValues.unapprovedCommentsEn = JSON.parse(document.getElementById('unapproved-comments-en').innerHTML)
  providedValues.unapprovedCommentsFa = JSON.parse(document.getElementById('unapproved-comments-fa').innerHTML)
  providedValues.unapprovedCommentsFaRestUrl = document.getElementById('comments-data').dataset.restUrl
  providedValues.unapprovedCommentsEnRestUrl = document.getElementById('comments-data').dataset.restUrl
  providedValues.unapprovedCommentsEnFetched = document.getElementById('comments-data').dataset.fetched
  providedValues.unapprovedCommentsFaFetched = document.getElementById('comments-data').dataset.fetched
  render(
    <LanguageProvider>
      <Dashboard providedValues={providedValues} />
    </LanguageProvider>,
    root,
  )
})
