import styled from "@emotion/styled"
import { Portal, Overlay, Content } from "@radix-ui/react-dialog"

export default function VideoModal({ video }) {
	return (
		<Portal>
			<DialogOverlay />
			<DialogContent>
				<VideoWrapper>
					<video controls src={video}>
					</video>
				</VideoWrapper>
			</DialogContent>
		</Portal>
	)
}

const DialogOverlay = styled(Overlay)`
	background-color: ${p => p.theme.colors.backgroundBlurred};
	position: fixed;
	inset: 0;
	animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`

const DialogContent = styled(Content)`
	background-color: ${p => p.theme.colors.white};
	border-radius: 7px;
	box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.25);
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	max-width: 90vw;
	/* max-width: 450px; */
	max-height: 90%;
	padding-left: 0px;
	padding-right: 0px;
	padding-top: 0px;
	padding-bottom: 0px;
	animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
	/* overflow: scroll; */
	line-height: 0;

	&::-webkit-scrollbar: {
		display: none;
	}

	&:focus {
		outline: none;
	}
`

const VideoWrapper = styled.div`
	margin-left: auto;
	margin-right: auto;
	text-align: center;
	/* max-width: 100%; */
	& video {
		display: block;
		max-width: 100%;
		height: auto;
	}
`
