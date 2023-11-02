import { useBlockProps } from '@wordpress/block-editor'

export default function Edit() {
	return (
		<header {...useBlockProps()}>
			<div>Gallery Page</div>
		</header>
	)
}
