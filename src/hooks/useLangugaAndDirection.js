import { useEffect } from "@wordpress/element"
import useLanguageContext from "../context/useLanguageContext"
import i18n from "../utils/i18n"

export function useLanguageAndDirection() {
  const { lang, dir } = useLanguageContext()

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang)
    document.body.dir = dir

    if (lang === "en") {
      i18n.changeLanguage("en")
    }
    if (lang === "fa") {
      i18n.changeLanguage("fa")
    }
  }, [lang, dir])
}
