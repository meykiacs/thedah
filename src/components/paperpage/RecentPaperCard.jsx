import { useTranslation } from "react-i18next"
import useWPContext from "../../context/useWPContext"
import styled from "@emotion/styled"
import { mq } from "../../utils/mq"
import Button from "../common/Button"
import { useTheme } from "@emotion/react"

export function RecentPaperCard({ r }) {
  const paper = r
  const { t } = useTranslation()
  const  theme  = useTheme()
  const { assetsImagesUrl } = useWPContext()

  return (
    <Wrapper>
      <ImageWrapper>
        {paper.featured_image_id && paper.featured_image_id > 0 ? (
          <img src={paper.featured_image_url} alt={paper.title} />
        ) : (
          <img
            src={`${assetsImagesUrl}/image-placeholder.svg`}
            alt="paper placeholder"
          />
        )}
      </ImageWrapper>
      <InfoWrapper>
      <PaperInfo>
        <Title>{paper.title}</Title>
        <Author>
          {paper.meta._thedah_paper.author}
          {paper.meta._thedah_paper.coauthors &&
            paper.meta._thedah_paper.coauthors[0] !== "" &&
            paper.meta._thedah_paper.coauthors.map((c) => (
              <span key={c}>
                {t("comma")} {c}
              </span>
            ))}
        </Author>
        <PubAndYear>
          {paper.meta._thedah_paper.publisher} - {paper.meta._thedah_paper.year}
        </PubAndYear>
        <SummaryTitle>{t('Summary')}</SummaryTitle>
        <Summary>
          {t("Summary")} {paper.meta._thedah_paper.summary}
        </Summary>
          </PaperInfo>
          <ActionWrapper>
              <Button variant='fill' color={theme.colors.secondary} colorHover={theme.colors.secondary} br='7px' fz='1.5rem' fw='500' p='10px 50px'>
                {t('Read')}
              </Button>
        <ReadMore>
          <a
            href={paper.meta._thedah_paper.link}
            target="_blank"
            rel="noreferrer"
          >
            {t("ReadMore")}
          </a>
        </ReadMore>
          </ActionWrapper>
      </InfoWrapper>

    </Wrapper>
  )
}

const Wrapper = styled.article`
  background-color: ${(p) => p.theme.colors.white};
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1px 7px 0px rgba(35, 30, 26, 0.4);
  border-radius: 10px;
  width: clamp(350px, 90%, 1000px);
  align-items: center;

  ${mq("md")} {
    flex-direction: row;
    justify-content: space-between;
    padding: 50px 70px;
  }
`

const ImageWrapper = styled.div`
  width: clamp(300px, 30%, 390px);
  height: 300px;
  > img {
    width: 100%;
    height: 100%;
  }
`

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const PaperInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Title = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
`

const Author = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  `

const PubAndYear = styled.p`
  font-size: 1rem;
  font-weight: 400;
`

const SummaryTitle = styled.h4`
  font-size: 1rem;
  font-weight: 700;
`
const Summary = styled.p`
  font-size: 1rem;
  font-weight: 400;
`

const ActionWrapper = styled.div``

const ReadMore = styled.div``
