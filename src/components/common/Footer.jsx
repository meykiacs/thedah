import styled from "@emotion/styled"
import useWPContext from "../../context/useWPContext"
import { mq } from "../../utils/mq"
import { useTranslation } from "react-i18next"

export default function Footer() {
  const { assetsImagesUrl } = useWPContext()
  const { t } = useTranslation()
  return (
    <Wrapper>
      <Introduction>
        <ImageWrapper>
          <img
            src={`${assetsImagesUrl}/site-logo-340x110.png`}
            alt="Site logo"
          />
        </ImageWrapper>
        <Info>
          <FooterTitle>{t("firstFooterTitle")}</FooterTitle>
          <FooterTitle>{t("secondFooterTitle")}</FooterTitle>
          <FooterTitle>{t("thirdFooterTitle")}</FooterTitle>
        </Info>
      </Introduction>
      <Subscription>
        <SubscriptionTitle>{t("subscribeTitle")}</SubscriptionTitle>
        <SubscriptionDescription>{t("subscribeDescription")}</SubscriptionDescription>
        <Form>

        </Form>
      </Subscription>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  height: 442px;
  background-color: ${(p) => p.theme.colors.primary};
  border-top: 7px solid ${(p) => p.theme.colors.accent};

  display: flex;
  flex-direction: column;

  ${mq("sm")} {
    flex-direction: row;
    justify-content: space-between;
    padding-left: 16px;
    padding-right: 16px;
  }

  ${mq("xl")} {
    padding-left: 125px;
    padding-right: 125px;
  }
`

const Introduction = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ImageWrapper = styled.div`
  width: 340px;
  height: 110px;
  margin-top: 70px;
  > img {
    width: 100%;
  }
`
const Info = styled.div``

const FooterTitle = styled.p`
  color: ${(p) => p.theme.colors.white};
  font-size: 1.4rem;
  font-weight: normal;
  line-height: 2;
`

const Subscription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${mq("sm")} {
    margin-top: 145px;
  }
`

const SubscriptionTitle = styled.h5`
  color: ${(p) => p.theme.colors.black};
  font-size: 1.6rem;
  font-weight: 700;
`

const SubscriptionDescription = styled.p`
  color: ${(p) => p.theme.colors.white};
  font-size: 1.2rem;
  font-weight: 400;
`

const Form = styled.form`
  display: flex;
  gap: 13px;
`