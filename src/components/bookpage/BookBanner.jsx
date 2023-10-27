import React from "react"
import QuoteBanner from "../common/QuoteBanner"
import useWPContext from "../../context/useWPContext"
import useResourceList from "../../hooks/useResourceList"

export default function BookBanner() {
  const { assetsImagesUrl } = useWPContext()
  const { bookPageQuote } = useResourceList("quote")[0]?.meta?._thedah_quote ?? {
    bookPageQuote: { mainQuote: "", from: "", description: "" },
  }
  return (
    <QuoteBanner
      pathToImgFile={`${assetsImagesUrl}/banner-book.png`}
      alt="book banner"
      quote={bookPageQuote}
    />
  )
}
