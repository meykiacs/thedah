import styled from "@emotion/styled"
import React from "react"
import useWPContext from "../../context/useWPContext"
import useLanguageContext from "../../context/useLanguageContext"

const SiteLogo = (props) => {
  const { assetsImagesUrl, homeUrl } = useWPContext()
  const { lang } = useLanguageContext()

  return (
    <A href={`${homeUrl}?lang=${lang}`}>
      <Wrapper {...props}>
        <img src={`${assetsImagesUrl}/site-logo-200x65.png`} alt="site-logo" />
      </Wrapper>
    </A>
  )
}

const A = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: inherit;
`

const Wrapper = styled.div``

export default SiteLogo
