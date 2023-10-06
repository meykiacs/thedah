import styled from "@emotion/styled"
import useWPContext from "../../context/useWPContext"
import { useTranslation } from "react-i18next"

export const HomeBookCard = ({ b }) => {
  const { assetsImagesUrl } = useWPContext()
  const { t } = useTranslation()

  return (
    <CardWrapper>
      <ImageWrapper>
        <img
          src={
            b.meta._thedah_images[0]?.mediumUrl ??
            `${assetsImagesUrl}/image-placeholder.svg`
          }
          alt={b.title}
        />
      </ImageWrapper>
      <Text>
        <Title>{b.title}</Title>
        <PublisherAndYear>
          {b.meta?._thedah_book?.publisher ?? ""}
          {t(",")} {b.meta?._thedah_book?.year ?? ""}
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
  text-align: "flex-start";
`

const Title = styled.h4`
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const PublisherAndYear = styled.h5`
  font-weight: 400;
  line-height: 2;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
