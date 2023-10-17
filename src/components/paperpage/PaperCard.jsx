import { useTranslation } from "react-i18next"
import useWPContext from "../../context/useWPContext"
import styled from "@emotion/styled"

export function PaperCard({ paper }) {
  const { t } = useTranslation()
  const { assetsImagesUrl } = useWPContext()

  const imageUrl =
    paper.meta._thedah_images[0]?.mediumUrl ??
    paper.meta._thedah_images[0]?.source_url ??
    `${assetsImagesUrl}/image-placeholder.svg`
  return (
    <Wrapper>
      <ImageWrapper>
        <img src={imageUrl} alt={paper.title} />
      </ImageWrapper>
      <PaperInfo>
        <Title>{paper.title}</Title>
        <NormalText>
          {paper.meta._thedah_paper.author}
          {paper.meta._thedah_paper.coauthors &&
            paper.meta._thedah_paper.coauthors[0] !== "" &&
            paper.meta._thedah_paper.coauthors.map((c) => (
              <span key={c}>
                {t("comma")} {c}
              </span>
            ))}
        </NormalText>
        <NormalText>
          {paper.meta._thedah_paper.year}{" "}
          {t(paper.meta._thedah_paper.publisher)}
        </NormalText>
        <NormalText className="summary">
          {paper.meta._thedah_paper.summary ?? ""}
        </NormalText>
        {paper.meta._thedah_paper.link && (
          <ReadMore href={paper.permalink ?? ""}>
            {t("toRead")}
          </ReadMore>
        )}
      </PaperInfo>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  background-color: ${(p) => p.theme.colors.gray};
  box-shadow: 0px 1px 7px 0px rgba(35, 30, 26, 0.4);
  border-radius: 10px;
  flex-direction: column;
`

const ImageWrapper = styled.div`
  width: 100%;
  border-radius: 5px;
  img {
    width: 100%;
    aspect-ratio: 300 / 250;
  }
  overflow: hidden;
`

const PaperInfo = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 285px;
`

const Title = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
`

const NormalText = styled.p`
  font-size: 1.2rem;
  font-weight: 400;

  &.summary {
    max-height: 50px;
    overflow-y: auto;
  }
`

const ReadMore = styled.a`
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: none;
  color: ${p => p.theme.colors.text}
`
