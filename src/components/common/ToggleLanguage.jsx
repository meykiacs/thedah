import i18n from "../dashboard/i18n"
import useLanguageContext from "../../context/useLanguageContext"
import styled from "@emotion/styled"
import { mq } from "../../utils/mq"

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
    <div>
      <Button onClick={changeToEn}>En</Button>
      <br />
      <Button onClick={changeToFa}>فا</Button>
    </div>
  )
}

const Button = styled.button`
  background-color: blue;
  border: none;
  color: ${(props) => props.theme.colors.text};
  padding: 15px 32px;
  padding-left: 200px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-family: ${(props) => props.theme.fontFamily};
  ${mq("sm")} {
    font-size: 16px; // larger font size for screens wider than 'sm'
  }
`
