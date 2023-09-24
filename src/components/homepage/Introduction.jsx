import styled from "@emotion/styled"
import { Section } from "../common/Section"
import useWPContext from "../../context/useWPContext"
import { mq } from "../../utils/mq"
import { useTranslation } from "react-i18next"
import Button from "../common/Button"
import { useTheme } from "@emotion/react"

export const Introduction = () => {
  const { assetsImagesUrl } = useWPContext()
  const { t } = useTranslation()
  const theme = useTheme()
  return (
    <StyledSection>
      <ImageWrapper>
        <img src={`${assetsImagesUrl}/intro.png`} alt="" />
      </ImageWrapper>
      <TextAndActionWrapper>
        <div>
          <Text>{t("firstFooterTitle")}</Text>
          <Text>{t("secondFooterTitle")}</Text>
          <Text>{t("thirdFooterTitle")}</Text>
        </div>
        <Text pt={12}>{t("intro")}</Text>
        <StyledButton
          as="a"
          href="https://google.com"
          variant="fill"
          br="7px"
          color={theme.colors.secondary}
          colorHover={theme.colors.secondary}
          fz="1.5rem"
          fw={500}
          p="10px 25px"
        >
          {t("moreInfo")}
        </StyledButton>
      </TextAndActionWrapper>
    </StyledSection>
  )
}

const StyledSection = styled(Section)`
  gap: 32px;
  ${mq("md")} {
    flex-direction: row;
    justify-content: space-around;
  }
  ${mq("xl")} {
    flex-direction: row;
    justify-content: center;
    gap: 50px;
  }

`

const ImageWrapper = styled.div`
  width: 328px;
  height: 303px;
  > img {
    width: 100%;
    height: 100%;
  }
  flex-shrink: 0;
`
const TextAndActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  justify-content: space-around;
  height: 303px;
  max-width: 380px;
  ${mq("lg")} {
    max-width: 450px;
  }
  ${mq("xl")} {
    max-width: 600px;
  }
`

const Text = styled.p`
  color: ${(p) => p.theme.colors.text};
  font-size: 1.4rem;
  font-weight: normal;
  line-height: 2;
  padding-top: ${(p) => p.pt + "px"};
`

const StyledButton = styled(Button)`
  margin-top: 20px;
  align-self: flex-end;
  text-decoration: none;
`
