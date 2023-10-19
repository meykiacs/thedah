import styled from "@emotion/styled"
import useWPContext from "../../context/useWPContext"
import HTMLReactParser from "html-react-parser"
import Button from "../../components/common/Button"
import { mq } from "../../utils/mq"

export const SinglePaperContent = () => {
  const { content } = useWPContext()

  return (
    <Wrapper>
      <article>{HTMLReactParser(content)}</article>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  align-self: center;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 2;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ul {
    list-style-type: disc;
    transform: translateX(15px);
  }
  
  ${mq("sm")} {
    max-width: 450px;
    ul {
      transform: translateX(32px);
    }
  }

  ${mq("md")} {
    max-width: 575px;
  }

  ${mq("lg")} {
    max-width: 750px;
  }

  ${mq("xl")} {
    max-width: 1050px;
  }



  p {
    margin-bottom: 20px;
  }
`

const StyledButton = styled(Button)`
  text-decoration: none;
  margin-top: 40px;
`
