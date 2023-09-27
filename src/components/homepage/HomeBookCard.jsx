import styled from "@emotion/styled"
import useWPContext from "../../context/useWPContext"
import { useTheme } from "@emotion/react"
import { useTranslation } from "react-i18next"

export const HomeBookCard = ({ b }) => {
  const { assetsImagesUrl } = useWPContext()
  const theme = useTheme()
  const {t} = useTranslation()
  const truncate = (str, num, direction) => {
    if (str.length <= num) {
      return str
    }
    return direction === "rtl"
      ? "..." + str.slice(0, num)
      : str.slice(0, num) + "..."
  }
  return (
    <CardWrapper>
      <ImageWrapper>
        {b.featured_media && b.featured_media > 0 ? (
          <img src={b.featured_media_url} alt={b.title} />
        ) : (
          <img
            src={`${assetsImagesUrl}/image-placeholder.svg`}
            alt="book placeholder"
          />
        )}
      </ImageWrapper>
      <Text>
        <Title>{truncate(b.title, 15, theme.direction)}</Title>
        <PublisherAndYear>
          {truncate(b.meta?._thedah_book?.publisher ?? "", 25, theme.direction)}{t(",")}{' '}
          {truncate(b.meta?._thedah_book?.year ?? "", 4, theme.direction)}
        </PublisherAndYear>
      </Text>
    </CardWrapper>
  )
}

const CardWrapper = styled.div`
  display: block;
  max-width: 160px;
  min-width: 160px;
  height: 262px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  background-color: ${(p) => p.theme.colors.white};
  border-radius: 10px;
`
const ImageWrapper = styled.div`
  height: 172px;
  overflow: hidden;
  border-radius: 5px;
  & > img {
    width: 100%;
    height: 100%;
  }
`

const Text = styled.div`
  text-align: ${(p) => (p.theme.direction === "rtl" ? "end" : "start")};
`

const Title = styled.h4`
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2;
`

const PublisherAndYear = styled.h5`
  font-weight: 400;
  line-height: 2;
  font-size: 1rem;
`
