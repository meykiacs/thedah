import styled from "@emotion/styled"
import useWPContext from "../../context/useWPContext"
import {
  getFormattedGregorianDateTime,
  getFormattedPersianDateTime,
} from "../../utils/getDateTime"
import useLanguageContext from "../../context/useLanguageContext"
import { useTranslation } from "react-i18next"
import { mq } from "../../utils/mq"

export const BlogMetaData = () => {
  const { t } = useTranslation()
  const { dateTime, author } = useWPContext()
  const { lang } = useLanguageContext()
  const utcDate = new Date(dateTime)
  let displayDateTime
  if (lang === "fa") {
    displayDateTime = getFormattedPersianDateTime(utcDate)
  } else {
    displayDateTime = getFormattedGregorianDateTime(utcDate)
  }
  return (
    <Wrapper>
      <div>
        {t("WrittenBy")}
        {": "}
        {author}
      </div>
      <div>{displayDateTime}</div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex-direction: column;
  margin-top: 40px;
  border-radius: 10px;
  padding: 10px 20px;
  background-color: ${(p) => p.theme.colors.gray};
  justify-content: space-between;
  align-self: center;
  width: 100%;
  font-size: 1.5rem;
  font-weight: 400;
  max-width: 1050px;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  ${mq("sm")} {
    flex-direction: row;
  }
`
