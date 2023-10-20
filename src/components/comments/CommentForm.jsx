import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha"
import styled from "@emotion/styled"
import Input from "../common/Input"
import { ButtonV2 } from "../common/ButtonV2"
import { mq } from "../../utils/mq"
import { useTranslation } from "react-i18next"
import { useTheme } from "@emotion/react"
import { useEffect, useRef } from "@wordpress/element"
import useWPContext from "../../context/useWPContext"
import { useCommentContext } from "../../context/CommentContext"

export const CommentForm = () => {
  const { t } = useTranslation()
  const { commentsRestUrl, restNonce, postId } = useWPContext()
  const theme = useTheme()
  const formRef = useRef()
  const { setWrittenComments } = useCommentContext()

  useEffect(() => {
    loadCaptchaEnginge(5, "white", "black", "numbers")
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    let user_captcha_value = document.getElementById("user_captcha_input").value
    if (validateCaptcha(user_captcha_value)) {
      const formData = new FormData(formRef.current)
      const data = {}
      formData.forEach((value, key) => {
        data[key] = value
      })
      data.post = postId

      try {
        let response = await fetch(commentsRestUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-WP-Nonce": restNonce,
          },
          body: JSON.stringify(data),
        })

        // Parse the JSON response
        let res = await response.json()

        if (!response.ok) {
          // Log the error message
          console.error(res.message)
        } else {
          // Log the response data
          setWrittenComments((prev) => [res, ...prev])
          formRef.current.reset()
          loadCaptchaEnginge(5, "white", "black", "numbers")
          alert(t("approveNeeded"))
        }
      } catch (error) {
        // Log any network errors
        console.error("Network error:", error)
      }
    } else {
      alert("Captcha Does Not Match")
    }
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Title>{t("YourView")}</Title>
      <StyledInput
        name="author_name"
        label={t("Name")}
        w={350}
        fz={1.4}
        borderThickness={1}
        h={48}
        type="text"
        required
        br="8"
        placeholder={t("Name")}
      />
      <StyledInput
        dir="ltr"
        name="email"
        label={t("Email")}
        w={350}
        fz={1.4}
        borderThickness={1}
        h={48}
        type="email"
        required
        br="8"
        placeholder={t("Email")}
      />
      <Textarea
        name="content"
        label={t("YourComment")}
        required
        placeholder={t("YourComment")}
        style={{ border: "1px solid #E7E3CF" }}
      ></Textarea>
      <LoadCanvasTemplate reloadText={t("reloadCaptcha")} />
      <CaptchaInput
        id="user_captcha_input"
        type="text"
        w={100}
        h={25}
        br={5}
        borderThickness={1}
      />

      <Buttons>
        <ButtonV2
          variant="fill"
          br="7px"
          h="50px"
          w="150px"
          fz="1.5rem"
          fw={500}
          color={theme.colors.secondary}
          colorHover={theme.colors.secondary}
          type="submit"
        >
          {t("SendComment")}
        </ButtonV2>
      </Buttons>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding-top: 50px;
`

const Title = styled.h3`
  align-self: flex-start;
  font-weight: 700;
  font-size: 2.4rem;
`

const StyledInput = styled(Input)`
  width: 100%;
`
const CaptchaInput = styled(Input)`
  transform: translateY(-15px);
`

const Textarea = styled.textarea`
  height: 200px;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e7e3cf;
  ::placeholder {
    color: ${(p) => p.theme.colors.grayDark};
    font-family: ${(p) => p.theme.fontFamily};
  }
`

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
`
