import React from 'react'
import QuoteBanner from '../common/QuoteBanner'
import useWPContext from "../../context/useWPContext"

export default function BookBanner() {
  const {assetsImagesUrl} = useWPContext()
  return (
    <QuoteBanner pathToImgFile={`${assetsImagesUrl}/banner-book.png`} alt='book banner' />
  )
}
