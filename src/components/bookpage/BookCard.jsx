import { useTranslation } from "react-i18next"
import useWPContext from "../../context/useWPContext"
import styled from "@emotion/styled"
import Button from "../common/Button"
import { useTheme } from "@emotion/react"
import { mq } from "../../utils/mq"
import HTMLReactParser from "html-react-parser"

export function BookCard({ book }) {
  const { t } = useTranslation()
  const { assetsImagesUrl } = useWPContext()
  const theme = useTheme()

  let buttonColor
  let buttonColorHover
  let buttonText
  switch (book.meta._thedah_book.availability) {
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

  const imageUrl =
    book.meta._thedah_images[0]?.mediumUrl ??
    `${assetsImagesUrl}/image-placeholder.svg`
  return (
    <Wrapper>
      <ButDescription>
        <BookAndPrice>
          <ImageWrapper>
            <img src={imageUrl} alt={book.title} />
          </ImageWrapper>
          <Button
            variant="fill"
            p="5px 23px"
            fz="1.5rem"
            br="7px"
            color={buttonColor}
            colorHover={buttonColor}
            fw="400"
            style={{cursor: book.meta._thedah_book.externalLink ? 'pointer' : 'default'}}
          >
            {t(buttonText)}
          </Button>
        </BookAndPrice>
        <BookInfo>
          <Title>{book.title}</Title>
          <Author>
            {book.meta._thedah_book.author}
            {book.meta._thedah_book.coauthors &&
              book.meta._thedah_book.coauthors[0] !== "" &&
              book.meta._thedah_book.coauthors.map((c) => (
                <span key={c}>
                  {t("comma")} {c}
                </span>
              ))}
          </Author>
          <RestOfInfo>{book.meta._thedah_book.publisher}</RestOfInfo>
          <RestOfInfo>
            {t("edition")} {book.meta._thedah_book.edition}{" "}
            {book.meta._thedah_book.year}
          </RestOfInfo>
          <RestOfInfo>
            {book.meta._thedah_book.numberOfPages} {t("pages")}
          </RestOfInfo>
          <RestOfInfo>
            {t("ISBN")}: {book.meta._thedah_book.isbn}
          </RestOfInfo>
          <Price>
            {t("Price")}
            {":"} {book.meta._thedah_book.price} {t("T")}
          </Price>
        </BookInfo>
      </ButDescription>
      <Description>{HTMLReactParser(book.content)}</Description>
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

  ${mq("lg")} {
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
  }
`

const ButDescription = styled.div`
  display: flex;
  gap: 25px;
  flex-direction: column;
  align-items: center;

  ${mq("sm")} {
    flex-direction: row;
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
  width: 285px;
`

const Title = styled.h3`
  color: ${(p) => p.theme.colors.primary};
  font-size: 1.6rem;
  font-weight: 700;
`

const Author = styled.p`
  color: ${(p) => p.theme.colors.text};
  font-size: 1.4rem;
  font-weight: 400;
`

const RestOfInfo = styled.p`
  color: ${(p) => p.theme.colors.text};
  font-size: 1.2rem;
  font-weight: 400;
`

const Price = styled.p`
  color: ${(p) => p.theme.colors.primary};
  font-size: 1.6rem;
  font-weight: 400;
`
const Description = styled.div`
  text-align: justify;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 190%;
  max-width: 450px;

  & li {
    list-style-type: disc;
    line-height: 1.7;
    transform: translateX(15px);
  }
`

