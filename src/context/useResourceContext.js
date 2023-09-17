import { useContext } from "@wordpress/element"
import ResourceContext from './ResourceContext'

const useResourceContext = () => {
	const context = useContext(ResourceContext)
	if (context === undefined) {
		throw new Error("useResourceContext must be used inside a ResourceContetx.Provider")
	}

	return context
}

export default useResourceContext
