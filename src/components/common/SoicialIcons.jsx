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
    linkedin
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
        console.log(response)
        responseData = await response.json()
        setSocials(responseData[0].meta._tds_social)
      } catch (e) {
        error = e
      }
    }
    getSocial()
    console.log(responseData)
  }, [])

  return (
    <nav>
      <Ul>
        {socials && Object.keys(socials).map(s => (
          icons[s] && socials[s] !== "" && (
            <li key={s}>
              <a href={`https://${s}.com/${socials[s]}`} target="_blank" rel="noreferrer">
                <SVG src={icons[s]} />
              </a>
            </li>
          )
        ))}
      </Ul>
    </nav>
  )
}

const Ul = styled.ul`
  display: flex;
  gap: 19px;
`
