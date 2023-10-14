import SVG from "react-inlinesvg"
import phone from "./phone.svg"
import telegram from "./telegram.svg"
import email from "./email.svg"
import instagram from "./instagram.svg"
import linkedin from "./linkedin.svg"
import eta from "./eta.svg"
import whatsapp from "./whatsapp.svg"
import styled from "@emotion/styled"

const socials = [
  { name: "phone", icon: phone, value: "021-009009009" },
  { name: "email", icon: email, value: "021-009009009" },
  { name: "telegram", icon: telegram, value: "021-009009009" },
  { name: "linkedin", icon: linkedin, value: "021-009009009" },
  { name: "whatsapp", icon: whatsapp, value: "021-009009009" },
  { name: "instagram", icon: instagram, value: "021-009009009" },
  { name: "eta", icon: eta, value: "021-009009009" },
]

export const SocialList = () => {
  return (
    <Ul>
      {socials.map((i) => (
        <ItemWrapper key={i.name}>
          <Icon width={35} src={i.icon} />
          <SocialValue>{i.value}</SocialValue>
        </ItemWrapper>
      ))}
    </Ul>
  )
}

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`

const ItemWrapper = styled.li`
  display: flex;
  gap: 52px;
  align-items: center;
`

const SocialValue = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
`

const Icon = styled(SVG)``
