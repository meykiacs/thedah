import instagram from "../../icons/instagram.svg"
import twitter from "../../icons/twitter.svg"
import youtube from "../../icons/youtube.svg"
import facebook from "../../icons/facebook.svg"
import whatsapp from "../../icons/whatsapp.svg"
import telegram from "../../icons/telegram.svg"
import linkedin from "../../icons/linkedin.svg"
import SVG from "react-inlinesvg"
import styled from "@emotion/styled"
import { useEffect, useState } from "@wordpress/element"
import useWPContext from "../../context/useWPContext"

export default function SocialIcons() {
  const { restNonce, homeUrl } = useWPContext()
  const [socials, setSocials] = useState(null)

  const icons = {
    instagram,
    twitter,
    youtube,
    facebook,
    whatsapp,
    telegram,
    linkedin,
  }
  const urlFormats = {
    instagram: "https://www.instagram.com/{id}",
    twitter: "https://twitter.com/{id}",
    youtube: "https://www.youtube.com/user/{id}",
    facebook: "https://www.facebook.com/{id}",
    whatsapp: "https://wa.me/{id}",
    telegram: "https://t.me/{id}",
    linkedin: "https://www.linkedin.com/in/{id}",
  }

  useEffect(() => {
    let responseData
    let error
    const getSocial = async () => {
      try {
        const response = await fetch(`${homeUrl}wp-json/wp/v2/tds_social`, {
          method: "GET",
          headers: {
            "X-WP-Nonce": restNonce,
          },
        })
        responseData = await response.json()
        setSocials(responseData[0].meta._tds_social)
      } catch (e) {
        error = e
        console.error(error)
      }
    }
    getSocial()
  }, [])

  return (
    <nav>
      <Ul>
        {socials &&
          Object.keys(socials).map(
            (s) =>
              icons[s] &&
              socials[s] !== "" && (
                <li key={s}>
                  <a
                    href={urlFormats[s].replace("{id}", socials[s])}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <SVG src={icons[s]} />
                  </a>
                </li>
              ),
          )}
      </Ul>
    </nav>
  )
}

const Ul = styled.ul`
  display: flex;
  gap: 19px;
`
