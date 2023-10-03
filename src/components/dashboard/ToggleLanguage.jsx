import i18n from "../../utils/i18n"
import useLanguageContext from "../../context/useLanguageContext"
import { ActionIcon, useDirection } from "@mantine/core"
import { IconTextDirectionLtr, IconTextDirectionRtl } from "@tabler/icons-react"

export default function ToggleLanguage({disabled}) {
  const { toggleDirection, dir } = useDirection()
  const { setDir, setLang } = useLanguageContext()
  const toggle = () => {
    if (dir === "rtl") {
      changeToEn()
    } else {
      changeToFa()
    }
  }
  const changeToEn = () => {
    i18n.changeLanguage("en")
    setLang("en")
    setDir("ltr")
    toggleDirection()
    document.documentElement.setAttribute("lang", "en")
    document.body.dir = "ltr"
  }
  const changeToFa = () => {
    i18n.changeLanguage("fa")
    setLang("fa")
    toggleDirection()
    setDir("rtl")
    document.documentElement.setAttribute("lang", "fa")
    document.body.dir = "rtl"
  }
  return (
    <ActionIcon onClick={toggle} variant="default" radius="md" size="lg" disabled={disabled}>
      {dir === "rtl" ? (
        <IconTextDirectionLtr stroke={1.5} />
      ) : (
        <IconTextDirectionRtl stroke={1.5} />
      )}
    </ActionIcon>
  )
}
