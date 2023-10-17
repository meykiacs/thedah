import { useBlockProps } from '@wordpress/block-editor'

export default function Edit() {
	return (
		<header {...useBlockProps()}>
			<div>Courses Page</div>
		</header>
	)
}
