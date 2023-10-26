import {
  Paper,
  Text,
  Input,
  Button,
  Grid,
  Container,
  Stack,
  Center,
  useComputedColorScheme,
} from "@mantine/core"
import useWPContext from "../../../context/useWPContext"
import SiteLogo from "../../../components/common/SiteLogo"

export default function Login({ setMode }) {
  const { homeUrl, loginNonce, authErrors } = useWPContext()
  const setToLostPassword = (e) => {
    e.preventDefault()
    setMode("lostpassword")
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
            Already have an account?
          </Text>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Text align="center" weight={500} size="xl">
            Login
          </Text>
        </div>
        <Center>
          {authErrors.length > 0 &&
            authErrors.map((er) => (
              <Text color="red" key={er}>
                {er}
              </Text>
            ))}
        </Center>
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
            // eslint-disable-next-line
            autoFocus
            style={{ maxWidth: "300px", margin: "0 auto" }}
          />
          <Input
            placeholder="Password"
            label="Password"
            type="password"
            name="password"
            required
            style={{ maxWidth: "300px", margin: "10px auto" }}
          />

          <input type="hidden" name="login_nonce" value={loginNonce} />
          <input type="hidden" name="action" value="login" />
          <Grid
            gutter="lg"
            justify="space-between"
            style={{ maxWidth: "300px", margin: "10px auto" }}
          >
            <Button
              variant="transparent"
              onClick={(e) => setToLostPassword(e)}
              style={{
                marginBottom: "10px",
                display: "block",
                maxWidth: "300px",
              }}
            >
              Forgot your password?
            </Button>
            {/* <Button
              variant="transparent"
              onClick={(e) => setToRegister(e)}
              style={{
                marginBottom: "10px",
                display: "block",
                maxWidth: "300px",
              }}
            >
              Register
            </Button> */}
          </Grid>
          <Button
            color="blue"
            size="lg"
            fullWidth
            type="submit"
            style={{ maxWidth: "300px", margin: "0 auto" }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
