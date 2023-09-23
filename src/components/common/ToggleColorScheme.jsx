import { useColorSchemeContext } from "../../context/useColorSchemeContext"
import UnstyledButton from "./UnstyledButton"
import Icon from "./Icon"
import VisuallyHidden from "./VisuallyHidden"
import { useTheme } from "@emotion/react"

export default function ToggleColorScheme() {
  const { colorScheme, toggleColorScheme } = useColorSchemeContext()
  const theme  = useTheme()
  return (
    <UnstyledButton onClick={toggleColorScheme}>
      <Icon
        id={colorScheme === "dark" ? "sun" : "moon"}
        size={15}
        color={theme.colors.white}
      />
      <VisuallyHidden>Toggle theme</VisuallyHidden>
    </UnstyledButton>
  )
}
