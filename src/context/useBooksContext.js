import { useContext } from "@wordpress/element"
import BooksContext from './BooksContext'

const useBooksContext = () => {
	const context = useContext(BooksContext)
	if (context === undefined) {
		throw new Error("useBooksContext must be used inside a BooksContetx.Provider")
	}

	return context
}

export default useBooksContext
