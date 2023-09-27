import { useTranslation } from "react-i18next"
import useWPContext from "../../context/useWPContext"
import styled from "@emotion/styled"
import Button from "../common/Button"
import { useTheme } from "@emotion/react"
import GenericText from "../common/GenericText"
import { mq } from "../../utils/mq"

export function BookCard({ book }) {
  const { t } = useTranslation()
  const { assetsImagesUrl } = useWPContext()
  const theme = useTheme()

  let buttonColor
  let buttonColorHover
  let buttonText

  switch (book.meta.availability) {
    case "available":
      buttonColor = "#81BA62"
      buttonColorHover = theme.colors.accent
      buttonText = "Order"
      break
    case "unavailable":
      buttonColor = "#c4c4c4"
      buttonColorHover = "#c4c4c4"
      buttonText = "Unavailable"
      break
    case "soon":
      buttonColor = theme.colors.secondary
      buttonColorHover = theme.colors.secondary
      buttonText = "Soon"
      break
  }

  return (
    <Wrapper>
      <ButDescription>
        <BookAndPrice>
          <ImageWrapper>
            {book.featured_media_url && book.featured_media > 0 ? (
              <img src={book.featured_media_url} alt={book.title} />
            ) : (
              <img
                src={`${assetsImagesUrl}/image-placeholder.svg`}
                alt="book placeholder"
              />
            )}
          </ImageWrapper>
          <Button
            variant="fill"
            p="5px 23px"
            fz="1.5rem"
            br="7px"
            color={buttonColor}
            colorHover={buttonColorHover}
            fw='400'
          >
            {t(buttonText)}
          </Button>
        </BookAndPrice>
        <BookInfo>
          <Title>{book.title}</Title>
          <Author>
            {book.meta.author}
            {book.meta.coauthors &&
              book.meta.coauthors[0] !== "" &&
              book.meta.coauthors.map((c) => (
                <span key={c}>
                  {t("comma")} {c}
                </span>
              ))}
          </Author>
          <RestOfInfo>{book.meta.publisher}</RestOfInfo>
          <RestOfInfo>
            {t("edition")} {book.meta.edition} {book.meta.year}
          </RestOfInfo>
          <RestOfInfo>
            {book.meta.numberOfPages} {t("pages")}
          </RestOfInfo>
          <Price>
            {t("Price")}
            {":"} {book.meta.price} {t("T")}
          </Price>
        </BookInfo>
      </ButDescription>
      <Description>{book.description}</Description>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  background-color: ${(p) => p.theme.colors.white};
  display: flex;
  padding: 30px;
  box-shadow: 0px 0px 7px 0px rgba(35, 30, 26, 0.2);
  border-radius: 10px;
  width: clamp(300px, 90%, 900px);
  gap: 25px;
  flex-direction: column;
  align-items: center;

  ${mq("md")} {
    flex-direction: row;
    align-items: stretch;
  }
`

const ButDescription = styled.div`
  display: flex;
  gap: 25px;

  ${mq("md")} {
    min-width: 350px;
  }

  ${mq("lg")} {
    min-width: 450px;
  }
`

const ImageWrapper = styled.div`
  width: 130px;
  height: 170px;
  border-radius: 5px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  img {
    width: 100%;
    height: 100%;
  }
  overflow: hidden;
`

const BookAndPrice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Title = styled.h3`
  color: ${(p) => p.theme.colors.primary};
  font-size: 1.6rem;
  font-weight: 700;
`

const Author = styled.p`
  color: ${(p) => p.theme.colors.black};
  font-size: 1.4rem;
  font-weight: 400;
`

const RestOfInfo = styled.p`
  color: ${(p) => p.theme.colors.black};
  font-size: 1.2rem;
  font-weight: 400;
`

const Price = styled.p`
  color: ${(p) => p.theme.colors.primary};
  font-size: 1.6rem;
  font-weight: 400;
`
const Description = styled(GenericText)`
  text-align: justify;
`
