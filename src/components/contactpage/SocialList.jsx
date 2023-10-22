import SVG from "react-inlinesvg"
import phone from "./phone.svg"
import telegram from "./telegram.svg"
import email from "./email.svg"
import instagram from "./instagram.svg"
import linkedin from "./linkedin.svg"
import eeta from "./eta.svg"
import whatsapp from "./whatsapp.svg"
import styled from "@emotion/styled"
import useResourceList from "../../hooks/useResourceList"

export const SocialList = () => {
  const socialList = useResourceList("social")[0]
  const socials = [
    {
      name: "phone",
      icon: phone,
      value: socialList.meta?._tds_social?.phone ?? "",
    },
    {
      name: "email",
      icon: email,
      value: socialList.meta?._tds_social?.email ?? "",
    },
    {
      name: "telegram",
      icon: telegram,
      value: socialList.meta?._tds_social?.telegram ?? "",
    },
    {
      name: "linkedin",
      icon: linkedin,
      value: socialList.meta?._tds_social?.linkedin ?? "",
    },
    {
      name: "whatsapp",
      icon: whatsapp,
      value: socialList.meta?._tds_social?.whatsapp ?? "",
    },
    {
      name: "instagram",
      icon: instagram,
      value: socialList.meta?._tds_social?.instagram ?? "",
    },
    {
      name: "eeta",
      icon: eeta,
      value: socialList.meta?._tds_social?.eeta ?? "",
    },
  ]
  return (
    <Ul>
      {socials.map(
        (i) =>
          i.value && (
            <ItemWrapper key={i.name}>
              <Icon width={35} src={i.icon} />
              <SocialValue>{i.value}</SocialValue>
            </ItemWrapper>
          ),
      )}
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
  align-items: center;
  justify-content: space-between;
  width: 300px;
`

const SocialValue = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
`

const Icon = styled(SVG)``
