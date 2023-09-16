import { useTranslation } from "react-i18next"
import useWPContext from "../../context/useWPContext"
import styled from "@emotion/styled"
import Button from "../common/Buttons"
import { useTheme } from "@emotion/react"

export function BookCard({ book }) {
  const { t } = useTranslation()
  const { assetsImagesUrl } = useWPContext()
  const theme = useTheme()
  return (
    <Wrapper>
      <CardButDescription>
        <PicAndPrice>
          <ImageWrapper>
            {book.pictureId && book.pictureId > 0 ? (
              <img src={book.picture} alt={book.title} />
            ) : (
              <img
                src={`${assetsImagesUrl}/image-placeholder.svg`}
                alt="placeholder"
              />
            )}
          </ImageWrapper>
          <Button
            variant="fill"
            paddding="5px 23px"
            fontSize="1.5rem"
            borderRadius="7px"
            color="hsla(99, 39%, 56%, 1)"
            colorHover={theme.colors.accent}
          >
            sss
          </Button>
        </PicAndPrice>
      </CardButDescription>
      <Description></Description>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  background-color: ${(p) => p.theme.colors.white};
  display: flex;
  flex-wrap: wrap;
`

const CardButDescription = styled.div``
const Description = styled.div``
const PicAndPrice = styled.div`
  display: flex;
  flex-direction: column;
`

const ImageWrapper = styled.div`
  width: 130px;
  height: 172;
  img {
    width: 100%;
  }
  overflow: hidden;
`
