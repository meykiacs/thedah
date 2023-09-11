import { useContext } from "@wordpress/element"
import LanguageContext from './LanguageContext'

const useLanguageContext = () => {
	const context = useContext(LanguageContext)
	if (context === undefined) {
		throw new Error("useLanguageContext must be used inside a LanguageContetx.Provider")
	}

	return context
}

export default useLanguageContext
