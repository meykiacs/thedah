import styled from "@emotion/styled"
import useWPContext from "../../context/useWPContext"
import { Section } from "../common/Section"
import { HomeBookCarousel } from "./HomeBookCarousel"
import useLanguageContext from "../../context/useLanguageContext"
import { useTranslation } from "react-i18next"
import Button from "../common/Button"
import { useTheme } from "@emotion/react"

export const HomeBookSection = () => {
  const { assetsImagesUrl, homeUrl } = useWPContext()
  const { lang } = useLanguageContext()
  const { t } = useTranslation()
  const theme = useTheme()
  return (
    <StyledSection>
      <BookLogoWrapper>
        <img
          src={`${assetsImagesUrl}/home-booksection-image.png`}
          alt="book logo"
        />
      </BookLogoWrapper>
      <HomeBookCarousel key={lang} />
      <MoreBooks
        variant='fill'
        as='a'
        href={`${homeUrl}book`}
        color={theme.colors.secondary}
        colorHover={theme.colors.secondary}
        br='7px'
        p='10px 30px'
        fz='1.5rem'
        fw={500}
      >{t("moreBooks")}</MoreBooks>
    </StyledSection>
  )
}

const StyledSection = styled(Section)`
  background-color: ${(p) => p.theme.colors.gray};
  gap: 30px;
`

const BookLogoWrapper = styled.div`
  width: 328px;
  height: 250px;
  > img {
    width: 100%;
    height: 100%;
  }
`

const MoreBooks = styled(Button)`
  text-decoration: none;
`