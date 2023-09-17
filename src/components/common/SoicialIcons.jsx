import instagram from "../../icons/instagram.svg"
import twitter from "../../icons/twitter.svg"
import youtube from "../../icons/youtube.svg"
import facebook from "../../icons/facebook.svg"
import whatsapp from "../../icons/whatsapp.svg"
import telegram from "../../icons/telegram.svg"
import linkedin from "../../icons/linkedin.svg"
import SVG from "react-inlinesvg"
import styled from "@emotion/styled"

export default function SoicialIcons() {
  return (
    <nav>
      <Ul>
        <li>
          <a href="https://google.com" target="_blank" rel="noreferrer">
            <SVG src={youtube} />
          </a>
        </li>
        <li>
          <a href="https://google.com" target="_blank" rel="noreferrer">
            <SVG src={facebook} />
          </a>
        </li>
        <li>
          <a href="https://google.com" target="_blank" rel="noreferrer">
            <SVG src={linkedin} />
          </a>
        </li>
        <li>
          <a href="https://google.com" target="_blank" rel="noreferrer">
            <SVG src={telegram} />
          </a>
        </li>
        <li>
          <a href="https://google.com" target="_blank" rel="noreferrer">
            <SVG src={twitter} />
          </a>
        </li>
        <li>
          <a href="https://google.com" target="_blank" rel="noreferrer">
            <SVG src={whatsapp} />
          </a>
        </li>
        <li>
          <a href="https://google.com" target="_blank" rel="noreferrer">
            <SVG src={instagram} />
          </a>
        </li>
      </Ul>
    </nav>
  )
}

const Ul = styled.ul`
  display: flex;
  gap: 19px;
`
