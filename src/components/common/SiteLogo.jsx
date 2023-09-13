import styled from "@emotion/styled"
import React from "react"
import useWPContext from "../../context/useWPContext"

const SiteLogo = (props) => {
  const { assetsImagesUrl, homeUrl } = useWPContext()
  return (
    <A href={homeUrl}>
      <Wrapper {...props}>
        <img src={`${assetsImagesUrl}/site-logo.png`} alt="site-logo" />
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
