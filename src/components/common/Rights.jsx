import styled from "@emotion/styled"
import { useTranslation } from "react-i18next"

export default function Rights() {
  const {t} = useTranslation()
  return (
    <P>{t('rights')} {t('Design')} <A href="https://google.com" target="_blank" rel='noreferrer'>{t('Designer')}</A></P>
  )
}

const P = styled.p`
  color: ${p => p.theme.colors.text};
`

const A = styled.a`
  color: ${p => p.theme.colors.primary};
  text-decoration: none;
`