// import React, { useState } from 'react';
import { useTheme } from "@emotion/react"
import useWPContext from "../../context/useWPContext"
import Button from "./Button"
import Input from "./Input"
import { useTranslation } from "react-i18next"
import styled from "@emotion/styled"

export function NewsletterForm() {
  const { restNonce, newsletterRestUrl } = useWPContext()
  const theme = useTheme()
  const { t } = useTranslation()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.elements.email.value
    const response = await fetch(newsletterRestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-WP-Nonce": restNonce,
      },
      body: JSON.stringify({ email }),
    })
    const data = await response.json()
    if (response.status === 200) {
      alert(t("checkYourEmail"))
    } else if(response.status === 409) {
      alert(t("emailAlreadyExists"))
    } else {
      alert(t('anErrorHappened'))
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Button
        variant="fill"
        color={theme.colors.secondary}
        colorHover={theme.colors.secondary}
        fz="1.6rem"
        fw="700"
        p="7px 25px"
        br="10px"
        type="submit"
      >
        {t("Send")}
      </Button>
      <Input
        dir='ltr'
        name="email"
        label={t("Email")}
        w={238}
        fz={1.2}
        borderThickness={0}
        h={40}
        type="email"
        required
        br="10"
      />
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: row-reverse;
  gap: 13px;
`
