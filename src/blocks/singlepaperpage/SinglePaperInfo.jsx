import styled from "@emotion/styled"
import useWPContext from "../../context/useWPContext"
import { useTranslation } from "react-i18next"
import { ButtonV2 } from "../../components/common/ButtonV2"
import { useTheme } from "@emotion/react"
import { mq } from "../../utils/mq"

export const SinglePaperInfo = () => {
  const { postTitle, writer, coauthors, year, publisher, summary, link } = useWPContext()
  const theme = useTheme()
  const { t } = useTranslation()
  return (
    <Wrapper>
      <CourseTitle>{postTitle}</CourseTitle>
      <OtherInfo>

        {t("Author")}
        {": "}
        {writer}
        {coauthors &&
          coauthors[0] !== "" &&
          coauthors.map((c) => (
            <span key={c}>
              {t("comma")} {c}
            </span>
          ))}
      </OtherInfo>
      <OtherInfo>
        {t("Publisher")}
        {": "}
        {publisher ? publisher : ""}
      </OtherInfo>
      <OtherInfo>
        {t("Year")}
        {": "}
        {year ? year : ""}
      </OtherInfo>
      <OtherInfo>
        {t("Summary")}
        {": "}
        {summary ?? ""}
      </OtherInfo>
{link &&
      <StyledButtonV2
      as='a'
      href={link}
      target='_blank'
      variant="fill"
      br="7px"
      h="50px"
      w="150px"
      fz="1.5rem"
      fw={500}
      color={theme.colors.secondary}
      colorHover={theme.colors.secondary}
      >
        {t('linktoPaper')}
      </StyledButtonV2>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
  flex: 1;
`

const CourseTitle = styled.h1`
  font-weight: 700;
  color: ${(p) => p.theme.colors.primary};
  font-size: 2rem;

  ${mq("lg")} {
    font-size: 2.4rem;
  }
`

const OtherInfo = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
`

const StyledButtonV2 = styled(ButtonV2)`
  margin-top: auto;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`
