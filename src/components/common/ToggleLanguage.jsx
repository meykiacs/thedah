import i18n from "../dashboard/i18n"
import useLanguageContext from "../../context/useLanguageContext"
import styled from "@emotion/styled"

export default function ToggleLanguage() {
  const { setDir, setLang } = useLanguageContext()
  const changeToEn = () => {
    i18n.changeLanguage("en")
    setLang("en")
    setDir("ltr")
    document.documentElement.setAttribute("lang", "en")
    document.body.dir = "ltr"
  }
  const changeToFa = () => {
    i18n.changeLanguage("fa")
    setLang("fa")
    setDir("rtl")
    document.documentElement.setAttribute("lang", "fa")
    document.body.dir = "rtl"
  }
  return (
    <Wrapper>
      <Btn onClick={changeToFa}>فا</Btn>
      <Btn onClick={changeToEn}>En</Btn>
    </Wrapper>
  )
}

const Btn = styled.div`
  background-color: transparent;
  color: ${(p) => p.theme.colors.white};
  box-shadow: none;
  font-size: 1.1rem;
`

const Wrapper = styled.div`
  display: flex;
  width: 40px;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    height: 65%;
    width: 1px;
    background-color: ${(p) => p.theme.colors.white};
    left: 50%;
  }

  & > * {
    cursor: pointer;
  }
`
