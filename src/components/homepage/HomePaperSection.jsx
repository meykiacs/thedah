import styled from "@emotion/styled"
import useWPContext from "../../context/useWPContext"
import { ButtonV2 } from "../common/ButtonV2"
import { useTheme } from "@emotion/react"
import { useTranslation } from "react-i18next"
import { mq } from "../../utils/mq"
import useResourceContext from "../../context/useResourceContext"
import useLanguageContext from "../../context/useLanguageContext"
import { Section } from "../common/Section"

export function HomePaperSection() {
  const { assetsImagesUrl } = useWPContext()
  const theme = useTheme()
  const { t } = useTranslation()
  const { lang } = useLanguageContext()
  const prefix = "Read"
  const buttonText = "paperArchive"
  const imageUrl = `${assetsImagesUrl}/home-paper-section-image.png`
  const { en, fa } = useResourceContext().resources.paper
  const papers = lang === "fa" ? fa.slice(0, 2) : en.slice(0, 2)
  return (
    <StyledSection>
      <Wrapper>
        <ImageWrapper>
          <img src={imageUrl} alt="Paper Logo" />
        </ImageWrapper>
        <Papers>
            {papers.map((p) => (
              <Title key={p.id}>{`${prefix}: ${
                p.meta._thedah_paper?.fullReference ?? ""
              }`}</Title>
            ))}
        </Papers>
        <StyledButtonV2
          variant="fill"
          br="7px"
          h="50px"
          w="150px"
          fz="1.5rem"
          fw={500}
          color={theme.colors.secondary}
          colorHover={theme.colors.secondary}
        >
          {t(buttonText)}
        </StyledButtonV2>
      </Wrapper>
    </StyledSection>
  )
}

const StyledSection = styled(Section)`
  background-color: ${(p) => p.theme.colors.white};
  gap: 64px;
  ${mq("md")} {
    gap: 12px;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  box-shadow: 0px 0px 7px 0px rgba(35, 30, 26, 0.2);
  padding: 32px;
  border-radius: 7px;

  ${mq("lg")} {
    flex-direction: row;
    gap: 50px;
    justify-content: space-between;
    padding: 0;
    box-shadow: none;
    border-radius: 0;
    width: clamp(740px, 90%, 1000px);
  }
`
const ImageWrapper = styled.div`
  width: 260px;
  height: 186px;
  img {
    width: 100%;
    height: 100%;
  }
  overflow: hidden;
`

const Papers = styled.ul`
  list-style-type: circle;
  display: flex;
  flex-direction: column;
  max-width: 500px;
`

const Title = styled.li`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 2;
  margin-bottom: 20px;
`

const StyledButtonV2 = styled(ButtonV2)`
  ${mq("md")} {
    margin-left: auto;
  }
`
