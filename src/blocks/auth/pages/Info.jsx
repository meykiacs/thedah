import { Text, Grid, Container, Button, Stack } from "@mantine/core"
import SiteLogo from "../../../components/common/SiteLogo"
import useWPContext from "../../../context/useWPContext"

export default function Info({ setMode }) {
  const { homeUrl, info } = useWPContext()
  const setToLogin = (e) => {
    e.preventDefault()
    setMode("login")
  }

  return (
    <Container>
      <Stack>
        <div style={{ marginTop: "36px" }}>
          <a href={homeUrl}>
            <SiteLogo style={{ filter: "invert(1)", textAlign: "center" }} />
          </a>
        </div>
      </Stack>
      <div style={{ marginTop: "64px" }}>
        <Text align="center" weight={700} size="xl">
          {info}
        </Text>
      </div>
      <div style={{ marginTop: "50px" }}>
        <Button
          variant="transparent"
          align="center"
          onClick={(e) => setToLogin(e)}
        >
          Back to login?
        </Button>
      </div>
    </Container>
  )
}
