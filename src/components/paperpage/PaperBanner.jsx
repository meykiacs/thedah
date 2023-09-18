import React from "react"
import QuoteBanner from "../common/QuoteBanner"
import useWPContext from "../../context/useWPContext"

export default function PaperBanner() {
  const { assetsImagesUrl } = useWPContext()
  return (
    <QuoteBanner
      pathToImgFile={`${assetsImagesUrl}/banner-paper.png`}
      alt="paper banner"
      quote={{
        main: "paperQuoteMain",
        from: "paperQuoteFrom",
        body: "paperQuoteBody",
      }}
    />
  )
}
