import React from "react"
import QuoteBanner from "../../components/common/QuoteBanner"
import useWPContext from "../../context/useWPContext"
import useResourceList from "../../hooks/useResourceList"

export default function CoursesBanner() {
  const { assetsImagesUrl } = useWPContext()
  const { coursePageQuote } = useResourceList("quote")[0]?.meta?._thedah_quote ?? {
    coursePageQuote: { mainQuote: "", from: "", description: "" },
  }
  
  return (
    <QuoteBanner
      pathToImgFile={`${assetsImagesUrl}/courses-banner.png`}
      alt="courses banner"
      quote={coursePageQuote}
    />
  )
}
