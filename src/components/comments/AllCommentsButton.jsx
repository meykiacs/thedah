import { useTranslation } from "react-i18next"
import Button from "../common/Button"
import { useTheme } from "@emotion/react"
import styled from "@emotion/styled"
import { useCommentContext } from "../../context/CommentContext"
import useWPContext from "../../context/useWPContext"

export const AllCommentsButton = () => {
  const { t } = useTranslation()
  const { postId, restNonce, commentsRestUrl } = useWPContext()
  const { setAllComments, setIsLoading, isLoading, setWrittenComments } =
    useCommentContext()
  const theme = useTheme()

  const handleClick = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${commentsRestUrl}?post=${postId}`, {
        headers: {
          "X-WP-Nonce": restNonce,
        },
      })
      const data = await response.json()
      setAllComments(data)
      setWrittenComments([])
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  return (
    <StyledButton
      variant="fill"
      color={theme.colors.gray}
      colorHover={theme.colors.gray}
      br="6px"
      fz="1.4rem"
      fw="500"
      p="10px 50px"
      onClick={handleClick}
    >
      {isLoading ? "Loading..." : t("allComments")}
    </StyledButton>
  )
}

const StyledButton = styled(Button)`
  align-self: stretch;
  color: ${(p) => p.theme.colors.text};
`
