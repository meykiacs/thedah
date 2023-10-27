import styled from "@emotion/styled"
import useWPContext from "../../context/useWPContext"
import { mq } from "../../utils/mq"
import { useTranslation } from "react-i18next"
import { NewsletterForm } from "./NewsletterForm"
import { useColorSchemeContext } from "../../context/useColorSchemeContext"

export default function Footer() {
  const { assetsImagesUrl } = useWPContext()
  const { t } = useTranslation()
  const { colorScheme } = useColorSchemeContext()

  return (
    <Wrapper colorScheme={colorScheme}>
      <Introduction>
        <ImageWrapper>
          <img
            src={`${assetsImagesUrl}/site-logo-340x110.png`}
            alt="Site logo"
            style={
              colorScheme === "dark"
                ? { filter: "invert(1)", textAlign: "center" }
                : {}
            }
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
        <SubscriptionDescription>
          {t("subscribeDescription")}
        </SubscriptionDescription>
        <NewsletterForm />
      </Subscription>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  background-color: ${(p) =>
    p.colorScheme === "light" ? p.theme.colors.primary : p.theme.colors.black};
  border-top: 7px solid ${(p) => p.theme.colors.accent};
  padding: 0 16px 50px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mq("lg")} {
    flex-direction: row;
    justify-content: space-between;
    padding-left: 95px;
    padding-right: 95px;
    align-items: baseline;
    height: 442px;
    padding-bottom: 0;
  }

  ${mq("xl")} {
    padding-left: 125px;
    padding-right: 125px;
  }
  ${mq("xxl")} {
    padding-left: 300px;
    padding-right: 300px;
  }
`

const Introduction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  color: ${(p) => p.theme.colors.text};
  font-size: 1.4rem;
  font-weight: normal;
  line-height: 2;
`

const Subscription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;
  width: 340px;
  margin-top: 75px;
`

const SubscriptionTitle = styled.h5`
  color: ${(p) => p.theme.colors.text};
  font-size: 1.6rem;
  font-weight: 700;
`

const SubscriptionDescription = styled.p`
  color: ${(p) => p.theme.colors.text};
  font-size: 1.2rem;
  font-weight: 400;
  text-align: justify;
`
