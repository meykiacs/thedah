import styled from "@emotion/styled"
import useWPContext from "../../context/useWPContext"
import HTMLReactParser from "html-react-parser"
import { useTheme } from "@emotion/react"
import Button from "../common/Button"
import { useTranslation } from "react-i18next"

export const BlogContent = () => {
  const { content, linkToFeature, feature } = useWPContext()
  const {t} = useTranslation()
  let buttonText = null
  switch (feature) {
    case "enroll":
      buttonText = "Enroll"
      break
    case "purchase":
      buttonText = "Purchase"
      break
    case "prepurchase":
      buttonText = "PrePurchase"
      break
    default:
      break
  }
  const theme = useTheme()
  return (
    <Wrapper>
      <article>{HTMLReactParser(content)}</article>
      {linkToFeature && (
        <StyledButton
          variant="fill"
          as="a"
          href={linkToFeature}
          target="_blank"
          color={theme.colors.secondary}
          colorHover={theme.colors.secondary}
          br="7px"
          p="10px 45px"
          fz="1.5rem"
          fw={500}
          
        >
          {t(buttonText)}
        </StyledButton>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.main`
  align-self: center;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 2;
  max-width: 1050px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ul {
    list-style-type: disc;
    transform: translateX(50px);
  }

  p {
    margin-bottom: 20px;
  }
`

const StyledButton = styled(Button)`
  text-decoration: none;
  margin-top: 40px;
`
