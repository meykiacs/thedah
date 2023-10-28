import { useBlockProps } from '@wordpress/block-editor'

export default function Edit() {
	return (
		<header {...useBlockProps()}>
			<div>Course Page</div>
		</header>
	)
}
