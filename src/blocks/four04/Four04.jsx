import { Container, Title, Text, Button, Group, Box } from "@mantine/core"
import { Illustration } from "./Illustration"

import { DirectionProvider, MantineProvider, createTheme } from "@mantine/core"
import { MantineGlobal } from "../../components/MantineGlobal"
import "../../utils/i18n"
import { WPProvider } from "../../context/WPContext"
import useLanguageContext from "../../context/useLanguageContext"
import { useLanguageAndDirection } from "../../hooks/useLangugaAndDirection"

export function Four04({ providedValues }) {
  useLanguageAndDirection()

  const { dir } = useLanguageContext()
  const theme = createTheme({
    fontFamily: "Vazirmatn, sans-serif",
    headings: { fontFamily: "Vazirmatn, sans-serif" },
  })

  return (
    <DirectionProvider initialDirection={dir} detectDirection={false}>
      <MantineProvider withCssVariables theme={theme}>
        <WPProvider providedValues={providedValues}>
          <MantineGlobal />
          <Container py="80px">
            <Box pos="relative">
              <Illustration
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: "0.75",
                  color: "gray",
                }}
              />
              <Box
                pt={{ base: "220px", sm: "320px" }}
                pos="relative"
                zIndex={1}
              >
                <Title ta="center" fw={900} fz={{ base: "32px", sm: "38px" }}>
                  Nothing to see here
                </Title>
                <Text
                  c="dimmed"
                  size="lg"
                  ta="center"
                  my="xl"
                  maw="540px"
                  mx="auto"
                >
                  Page you are trying to open does not exist. You may have
                  mistyped the address, or the page has been moved to another
                  URL. If you think this is an error contact support.
                </Text>
                <Group justify="center">
                  <Button component="a" href={providedValues.homeUrl} size="md">
                    Take me back to home page
                  </Button>
                </Group>
              </Box>
            </Box>
          </Container>
        </WPProvider>
      </MantineProvider>
    </DirectionProvider>
  )
}
