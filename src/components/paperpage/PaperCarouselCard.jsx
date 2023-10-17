import styled from "@emotion/styled"
import { useTranslation } from "react-i18next"
import { mq } from "../../utils/mq"
import Button from "../common/Button"
import { useTheme } from "@emotion/react"
import useWPContext from "../../context/useWPContext"

export const PaperCarouselCard = ({ r }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { assetsImagesUrl } = useWPContext()
  const image = r.meta._thedah_images[0]
  const imageUrl = image?.paperLandscapeUrl
    ? image.paperLandscapeUrl
    : image?.source_url
    ? image?.source_url
    : `${assetsImagesUrl}/image-placeholder.svg`
  return (
    <Wrapper>
      <ImageWrapper>
        <img src={imageUrl} alt={r.title} style={{ aspectRatio: "3.9 / 3" }} />
      </ImageWrapper>
      <InfoAndButtonWrapper>
        <PaperTitle>{r.title}</PaperTitle>
        <PaperAuthor>
          {r.meta._thedah_paper.author}
          {r.meta._thedah_paper.coauthors &&
            r.meta._thedah_paper.coauthors[0] !== "" &&
            r.meta._thedah_paper.coauthors.map((c) => (
              <span key={c}>
                {t("comma")} {c}
              </span>
            ))}
        </PaperAuthor>
        <PaperPublisherAndYear>
          {`${r.meta._thedah_paper.publisher ?? ""} - ${
            r.meta._thedah_paper.year ?? ""
          }`}
        </PaperPublisherAndYear>
        <SummaryTitle>{t("Summary")}</SummaryTitle>
        <Summary>{r.meta._thedah_paper?.summary ?? ""}</Summary>
        <ActionWrapper>
          <ReadMore
            href={r.meta._thedah_paper.link}
            target="_blank"
            rel="noreferrer"
          >
            {r.meta._thedah_paper.link}
          </ReadMore>
          <Button
            as="a"
            href={r.permalink}
            style={{textDecoration: 'none'}}
            variant="fill"
            color={theme.colors.secondary}
            colorHover={theme.colors.secondary}
            br="7px"
            fz="1.5rem"
            fw="500"
            p="10px 50px"
          >
            {t("toRead")}
          </Button>
        </ActionWrapper>
      </InfoAndButtonWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  display: flex;
  border-radius: 10px;
  box-shadow: 0px 0px 7px 0px rgba(35, 30, 26, 0.2);
  background-color: ${(p) => p.theme.colors.white};

  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 24px;
  width: clamp(350px, 100%, 400px);

  ${mq("lg")} {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: clamp(650px, 100%, 1000px);
    padding: 50px 70px;
    align-items: stretch;
  }
`

const ImageWrapper = styled.div`
  width: clamp(300px, 100%, 390px);
  border-radius: 10px;
  box-shadow: 0px 0px 7px 0px rgba(35, 30, 26, 0.2);
  overflow: hidden;
  & > img {
    width: 100%;
    height: 100%;
  }
`

const InfoAndButtonWrapper = styled.div`
  width: clamp(300px, 100%, 390px);
  display: flex;
  flex-direction: column;
  & > p,
  h5 {
    margin-top: 8px;
  }

  ${mq("lg")} {
    width: clamp(300px, 100%, 400px);
  }
`

const PaperTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
`

const PaperAuthor = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
`
const PaperPublisherAndYear = styled.p`
  font-size: 1rem;
  font-weight: 400;
`

const SummaryTitle = styled.h5`
  font-size: 1rem;
  font-weight: 700;
`

const Summary = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.7;
  text-align: justify;
  height: 85px;
  overflow-y: auto;
  padding-right: 5px;
`

const ActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 32px;
  ${mq("lg")} {
    margin-top: auto;
  }
`

const ReadMore = styled.a`
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 400;
  text-decoration: none;
  color: ${(p) => p.theme.colors.primary};
`
