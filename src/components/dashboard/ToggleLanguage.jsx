import i18n from '../../utils/i18n'
import useLanguageContext from "../../context/useLanguageContext"
import { Button, Flex } from "@mantine/core"

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
    <Flex>
      <Button onClick={changeToEn} variant="subtle">En</Button>
      <Button onClick={changeToFa} variant="subtle">فا</Button>
    </Flex>
  )
}
