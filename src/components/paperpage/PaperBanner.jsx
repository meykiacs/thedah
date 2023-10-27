import React from "react"
import QuoteBanner from "../common/QuoteBanner"
import useWPContext from "../../context/useWPContext"
import useResourceList from "../../hooks/useResourceList"

export default function PaperBanner() {
  const { assetsImagesUrl } = useWPContext()
  const { paperPageQuote } = useResourceList("quote")[0]?.meta?._thedah_quote ?? {
    paperPageQuote: { mainQuote: "", from: "", description: "" },
  }
  return (
    <QuoteBanner
      pathToImgFile={`${assetsImagesUrl}/banner-paper.png`}
      alt="paper banner"
      quote={paperPageQuote}
    />
  )
}
