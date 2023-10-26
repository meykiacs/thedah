import {
  Paper,
  Text,
  Input,
  Button,
  Grid,
  Container,
  Stack,
  useComputedColorScheme,
} from "@mantine/core"
import SiteLogo from "../../../components/common/SiteLogo"
import useWPContext from "../../../context/useWPContext"

export default function RP({ setMode }) {
  const { homeUrl, rpNonce } = useWPContext()
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
            Welcome Back!
          </Text>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Text align="center" weight={500} size="xl">
            Set Your New Password
          </Text>
        </div>
      </Stack>
      <Paper
        padding="md"
        style={{ marginTop: "33px", maxWidth: "400px", margin: "33px auto" }}
      >
        <form method="post">
          <Input
            placeholder="New Password"
            label="new_password"
            type="text"
            name="new_password"
            required
            // eslint-disable-next-line
            autoFocus
            style={{ maxWidth: "300px", margin: "0 auto" }}
          />
          <input type="hidden" name="rp_nonce" value={rpNonce} />
          <input type="hidden" name="action" value="rp" />

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
            Update
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
