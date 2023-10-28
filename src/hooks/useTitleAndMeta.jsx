import { useEffect } from "@wordpress/element"
import useLanguageContext from "../context/useLanguageContext"
import { setMeta, setPageTitle } from "../utils/meta"

export const useTitleAndMeta = (title, description) => {
  const { lang } = useLanguageContext()

  useEffect(() => {
    if (lang === "en") {
      setPageTitle(title.en)
      setMeta("description", description.en)
    } else {
      setPageTitle(title.fa)
      setMeta("description",description.fa)
    }
  }, [lang, description, title])
}
