import styled from "@emotion/styled"
import useWPContext from "../../context/useWPContext"
import { Section } from "../common/Section"
import { useTranslation } from "react-i18next"
import Button from "../common/Button"
import { useTheme } from "@emotion/react"
import { HomeResourceCarousel } from "./HomeResourceCarousel"
import { BookCarouselCard } from "./BookCarouselCard"

export const HomeBookSection = () => {
  const { assetsImagesUrl, homeUrl } = useWPContext()
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
      <HomeResourceCarousel
        resource="book"
        CarouselCard={BookCarouselCard}
        density="high"
        className='has-gradient'
      />
      <MoreBooks
        variant="fill"
        as="a"
        href={`${homeUrl}book`}
        color={theme.colors.secondary}
        colorHover={theme.colors.secondary}
        br="7px"
        p="10px 30px"
        fz="1.5rem"
        fw={500}
      >
        {t("moreBooks")}
      </MoreBooks>
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
