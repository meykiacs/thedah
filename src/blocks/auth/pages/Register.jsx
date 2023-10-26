import {
  Group,
  Paper,
  Text,
  Input,
  Button,
  Center,
  Stack,
  Container,
  useComputedColorScheme,
} from "@mantine/core"
import SiteLogo from "../../../components/common/SiteLogo"
import useWPContext from "../../../context/useWPContext"

export default function Register({ setMode }) {
  const { homeUrl, registerNonce, authErrors } = useWPContext()
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
            Create Account
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
          <Input
            placeholder="Confirm Password"
            label="Confirm Password"
            type="password"
            name="confirm"
            required
            style={{ maxWidth: "300px", margin: "10px auto" }}
          />
          <input type="hidden" name="register_nonce" value={registerNonce} />
          <input type="hidden" name="action" value="register" />
          <Group
            gutter="lg"
            justify="space-between"
            style={{ maxWidth: "300px", margin: "10px auto" }}
            align="baseline"
          >
            <Text size="sm">Already Have an Account?</Text>
            <Button
              variant="transparent"
              onClick={(e) => setToLogin(e)}
              style={{
                marginBottom: "10px",
                display: "block",
                maxWidth: "300px",
              }}
            >
              Login
            </Button>
          </Group>
          <Button
            color="blue"
            size="lg"
            fullWidth
            type="submit"
            style={{ maxWidth: "300px", margin: "0 auto" }}
          >
            Create Account
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
