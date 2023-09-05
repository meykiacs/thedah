import { useContext } from "@wordpress/element"
import WPContext from './WPContext'

const useWPContext = () => {
	const context = useContext(WPContext)
	if (context === undefined) {
		throw new Error("useWPContext must be used inside a WPContetx.Provider")
	}

	return context
}

export default useWPContext
