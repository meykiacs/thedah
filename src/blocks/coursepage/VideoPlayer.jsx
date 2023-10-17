import styled from "@emotion/styled"
import { mq } from "../../utils/mq"
import useWPContext from "../../context/useWPContext"

export const VideoPlayer = () => {
  const { images } = useWPContext()

  return (
    <Wrapper>
      {images.length > 0 && (
        <video width="100%" height="100%" controls>
          <source src={images[0].source_url} />
        </video>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border-radius: 7px;
  overflow: hidden;
  max-width: 800px;
  align-self: center;
  ${mq("xl")} {
    align-self: stretch;
  }
`
