import { MantineProvider, createTheme } from "@mantine/core"
import { useState } from "@wordpress/element"
import { WPProvider } from "../../context/WPContext"
import Info from "./pages/Info"
import Login from "./pages/Login"
import LostPassword from "./pages/LostPassword"
import RP from "./pages/RP"
import Register from "./pages/Register"
import { MantineGlobal } from "../../components/MantineGlobal"

export default function Auth({ providedValues }) {
  const [mode, setMode] = useState(providedValues.mode)
  const theme = createTheme({
    fontFamily: "Vazirmatn, sans-serif",
    headings: { fontFamily: "Vazirmatn, sans-serif" },
  })

  return (
    <MantineProvider withCssVariables theme={theme}>
      <WPProvider providedValues={providedValues}>
        <MantineGlobal />

        {mode === "login" ? (
          <Login setMode={setMode} />
        ) : mode === "lostpassword" ? (
          <LostPassword setMode={setMode} />
        ) : mode === "rp" ? (
          <RP setMode={setMode} />
        ) : mode === "info" ? (
          <Info setMode={setMode} />
        ) : (
          <Register setMode={setMode} />
        )}
      </WPProvider>
    </MantineProvider>
  )
}
