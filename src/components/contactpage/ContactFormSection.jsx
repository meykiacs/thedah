import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha"

import { Section } from "../common/Section"
import { SectionTitle } from "../common/SectionTitle"
import { useTranslation } from "react-i18next"
import styled from "@emotion/styled"
import Input from "../common/Input"
import { ButtonV2 } from "../common/ButtonV2"
import { useTheme } from "@emotion/react"
import { mq } from "../../utils/mq"
import { useEffect } from "@wordpress/element"
import useWPContext from "../../context/useWPContext"

export const ContactFormSection = () => {
  const { t } = useTranslation()
  const { contactRestUrl, restNonce } = useWPContext()
  const theme = useTheme()
  useEffect(() => {
    loadCaptchaEnginge(5, "white", "black", "numbers")
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    let user_captcha_value = document.getElementById("user_captcha_input").value
    if (validateCaptcha(user_captcha_value)) {
      const name = document.getElementsByName("name")[0].value
      const email = document.getElementsByName("email")[0].value
      const content = document.getElementsByName("content")[0].value

      fetch(contactRestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": restNonce,
        },
        body: JSON.stringify({
          name,
          email,
          content,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            return response
              .json()
              .then((data) => {
                console.log(data);
                alert("Email sent successfully")
            })
          } else if (response.status === 500) {
            return response.json().then((data) => alert("Error sending email"))
          }
        })
        .catch((error) => {
          alert("Error sending email")
        })
    } else {
      alert("Captcha Does Not Match")
    }
  }
  return (
    <Section>
      <SectionTitle title={t("sendingAnEmail")} />
      <Form onSubmit={handleSubmit}>
        <StyledInput
          name="name"
          label={t("firstAndLastName")}
          w={350}
          fz={1.4}
          borderThickness={0}
          h={48}
          type="text"
          required
          br="8"
          placeholder={t("firstAndLastName")}
        />
        <StyledInput
          dir="ltr"
          name="email"
          label={t("Email")}
          w={350}
          fz={1.4}
          borderThickness={0}
          h={48}
          type="email"
          required
          br="8"
          placeholder={t("Email")}
        />
        <Textarea
          name="content"
          label={t("ContentOfEmail")}
          required
          placeholder={t("ContentOfEmail")}
          style={{ border: "1px solid #E7E3CF" }}
        ></Textarea>
        <LoadCanvasTemplate reloadText={t("reloadCaptcha")} />
        <CaptchaInput
          id="user_captcha_input"
          type="text"
          w={100}
          h={25}
          br={5}
        />

        <Buttons>
          <ButtonV2
            variant="fill"
            br="7px"
            h="50px"
            w="150px"
            fz="1.5rem"
            fw={500}
            color={theme.colors.grayMiddle}
            colorHover={theme.colors.grayMiddle}
          >
            {t("Cancel")}
          </ButtonV2>
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
            {t("Send")}
          </ButtonV2>
        </Buttons>
      </Form>
    </Section>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 50px;
`

const StyledInput = styled(Input)`
  ${mq("md")} {
    width: 595px;
  }
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
