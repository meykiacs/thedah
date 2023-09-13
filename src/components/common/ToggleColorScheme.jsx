import styled from "@emotion/styled"
import { mq } from "../../utils/mq"
import { useTheme } from "@emotion/react"
import { useColorSchemeContext } from "../../context/useColorSchemeContext"

export default function ToggleColorScheme() {
  const theme = useTheme()
  const {toggleColorScheme} = useColorSchemeContext()
  return (
    <Button onClick={toggleColorScheme}>
      {theme.colorScheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </Button>
  )
}

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  color: ${(props) => props.theme.colors.text};
  padding: 15px 32px;
  padding-left: 200px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-family: ${(props) => props.theme.fontFamily};
  ${mq("sm")} {
    font-size: 16px; // larger font size for screens wider than 'sm'
  }
`
