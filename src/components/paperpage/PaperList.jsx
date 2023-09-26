import { useTranslation } from "react-i18next"
import useWPContext from "../../context/useWPContext"
import styled from "@emotion/styled"
import useResourceList from "../../hooks/useResourceList"

export function PaperList() {
  const { t } = useTranslation()
  const { assetsImagesUrl } = useWPContext()
  const papers = useResourceList("paper")
  return (
    <Wrapper>
      {papers.map((paper) => (
        <CardWrapper key={paper.id}>
          <Header>
            {paper.featured_image_id && paper.featured_image_id > 0 ? (
              <img src={paper.featured_image_url} alt={paper.title} />
            ) : (
              <img
                src={`${assetsImagesUrl}/image-placeholder.svg`}
                alt="paper placeholder"
              />
            )}
          </Header>
          <PaperInfo>
            <Title>{paper.title}</Title>
            <InfoText>
              {paper.meta._thedah_paper.author}
              {paper.meta._thedah_paper.coauthors &&
                paper.meta._thedah_paper.coauthors[0] !== "" &&
                paper.meta._thedah_paper.coauthors.map((c) => (
                  <span key={c}>
                    {t("comma")} {c}
                  </span>
                ))}
            </InfoText>
            <InfoText>
              {paper.meta._thedah_paper.publisher} -{" "}
              {paper.meta._thedah_paper.year}
            </InfoText>
            <InfoText>
              {t("Summary")} {paper.meta._thedah_paper.summary}
            </InfoText>
            <ReadMore
              href={paper.meta._thedah_paper.link}
              target="_blank"
              rel="noreferrer"
            >
              {t("ReadMore")}
            </ReadMore>
          </PaperInfo>
        </CardWrapper>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: space-between;
  align-items: center;
`

const CardWrapper = styled.article`
  background-color: ${(p) => p.theme.colors.gray};
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1px 7px 0px rgba(35, 30, 26, 0.4);
  border-radius: 10px;
  width: 300px;
  overflow: hidden;
`

const Header = styled.header`
  width: 100%;
  height: 250px;
  > img {
    width: 100%;
    height: 100%;
  }
`

const PaperInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  padding: 20px;
`

const Title = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
`

const InfoText = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
`

const ReadMore = styled.a`
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: none;
`
