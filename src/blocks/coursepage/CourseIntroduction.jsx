import styled from "@emotion/styled"
import React from "react"
import useWPContext from "../../context/useWPContext"
import { useTranslation } from "react-i18next"
import { mq } from "../../utils/mq"

export const CourseIntroduction = () => {
  const { content } = useWPContext()
  const { t } = useTranslation()
  return (
    <Wrapper>
      <H3>{t("CourseIntroduction")}</H3>
      <Content>{content}</Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${mq("xl")} {
    /* max-width: 1114px; */
  }
`

const H3 = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 32px;
`

const Content = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 2.5;
  margin-bottom: 50px;
`
