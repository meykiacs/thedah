import React from "react"
import QuoteBanner from "../../components/common/QuoteBanner"
import useWPContext from "../../context/useWPContext"

export default function CoursesBanner() {
  const { assetsImagesUrl } = useWPContext()
  return (
    <QuoteBanner
      pathToImgFile={`${assetsImagesUrl}/courses-banner.png`}
      alt="courses banner"
      quote={{
        main: "paperQuoteMain",
        from: "paperQuoteFrom",
        body: "paperQuoteBody",
      }}
    />
  )
}
