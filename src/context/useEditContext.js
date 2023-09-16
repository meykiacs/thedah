import { useContext } from "@wordpress/element"
import EditContext from './EditContext'

const useEditContext = () => {
	const context = useContext(EditContext)
	if (context === undefined) {
		throw new Error("useEditContext must be used inside a EditContetx.Provider")
	}

	return context
}

export default useEditContext
