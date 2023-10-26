import {
  Paper,
  Stack,
  Text,
  Input,
  Button,
  Grid,
  Container,
  useComputedColorScheme,
} from "@mantine/core"
import SiteLogo from "../../../components/common/SiteLogo"
import useWPContext from "../../../context/useWPContext"

export default function LostPassword({ setMode }) {
  const { homeUrl, lostPasswordNonce } = useWPContext()
  const setToLogin = (e) => {
    e.preventDefault()
    setMode("login")
  }
  const colorScheme = useComputedColorScheme()

  return (
    <Container>
      <Stack>
        <div style={{ marginTop: "36px" }}>
          <a href={homeUrl}>
          <SiteLogo
              style={
                colorScheme === "dark"
                  ? { filter: "invert(1)", textAlign: "center" }
                  : {}
              }
            />
          </a>
        </div>
        <div style={{ marginTop: "64px" }}>
          <Text align="center" weight={700} size="xl">
            Forgot Your Password?
          </Text>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Text align="center" weight={500} size="xl">
            Provide Your Email or Username
          </Text>
        </div>
      </Stack>
      <Paper
        padding="md"
        style={{ marginTop: "33px", maxWidth: "400px", margin: "33px auto" }}
      >
        <form method="post">
          <Input
            placeholder="Username/Email"
            label="Username/Email"
            type="text"
            name="user"
            required
            style={{ maxWidth: "300px", margin: "0 auto" }} // Added this line
          />
          <input
            type="hidden"
            name="lostpassword_nonce"
            value={lostPasswordNonce}
            style={{ maxWidth: "300px", margin: "10px auto" }}
          />
          <input type="hidden" name="action" value="lostpassword" />
          <Grid
            gutter="lg"
            justify="space-between"
            style={{ maxWidth: "300px", margin: "10px auto" }}
          >
            <Button
              variant="transparent"
              onClick={(e) => setToLogin(e)}
              style={{
                marginBottom: "10px",
                display: "block",
                maxWidth: "300px",
              }}
            >
              Back to login?
            </Button>
          </Grid>
          <Button
            color="blue"
            size="lg"
            fullWidth
            type="submit"
            style={{ maxWidth: "300px", margin: "0 auto" }}
          >
            Reset
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
