import styled from "@emotion/styled"
import GenericText from "./GenericText"
import { useTranslation } from "react-i18next"
import { mq } from "../../utils/mq"

export default function QuoteBanner({ pathToImgFile, alt, quote }) {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <ImageWrapper>
        <img src={pathToImgFile} alt={alt} />
      </ImageWrapper>
      <QuoteWrapper>
        <MainQuote>
          {t("openQuote") + t(quote.main) + t("closeQuote")}
          <QuoteFrom> {t(quote.from)}</QuoteFrom>
        </MainQuote>
        <GenericText>{t(quote.body)}</GenericText>
      </QuoteWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  ${mq("md")} {
    flex-direction: row-reverse;
    justify-content: center;
  }

  gap: ${p => p.theme.direction === 'ltr' ? '50px' : 0};
`

const ImageWrapper = styled.div`
  img {
    width: 100%;
  }

  ${mq("md")} {
    width: clamp(300px, 100%, 768px);
  }
`

const QuoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  width: clamp(300px, 90%, 500px);

  gap: 25px;
  ${mq("lg")} {
    gap: 50px;
  }
`

const MainQuote = styled.h3`
  font-size: 2.4rem;
  color: ${(p) => p.theme.colors.primary};
  font-weight: 700;
`

const QuoteFrom = styled.span`
  font-size: 1.2rem;
`
