import cx from "clsx"
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Group,
} from "@mantine/core"
import { IconSun, IconMoon } from "@tabler/icons-react"

export function ThemeActionToggle() {
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  })

  return (
    <Group justify="center">
      <ActionIcon
        onClick={() =>
          setColorScheme(computedColorScheme === "light" ? "dark" : "light")
        }
        variant="default"
        size="lg"
        aria-label="Toggle color scheme"
      >
        <IconSun
          display={computedColorScheme === "light" ? "none" : "block"}
          stroke={1.5}
        />
        <IconMoon
          display={computedColorScheme === "dark" ? "none" : "block"}
          stroke={1.5}
        />
      </ActionIcon>
    </Group>
  )
}
