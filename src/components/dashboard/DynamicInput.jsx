import { ActionIcon, Group, Stack, TextInput } from "@mantine/core"
import { IconMinus, IconPlus } from "@tabler/icons-react"

export default function DynamicInput({ inputs, setInputs, label, disabled }) {
  const handleAddInput = () => {
    if (inputs.every((i) => i.trim() !== "")) {
      setInputs([...inputs, ""])
    }
  }
  const handleRemoveInput = (index) => {
    if (inputs.length > 1) {
      setInputs(inputs.filter((_, i) => i !== index))
    }
  }

  return (
    <Stack spacing={4}>
      {inputs.map((c, index) => (
        <Group key={index}>
          <TextInput
            disabled={disabled}
            value={c}
            aria-label={`${label} ${index + 1} `}
            placeholder={`${label} ${index + 1}`}
            onChange={(event) => {
              const newInputs = [...inputs]
              newInputs[index] = event.target.value
              setInputs(newInputs)
            }}
          />
          {index !== 0 && (
            <ActionIcon
              onClick={() => handleRemoveInput(index)}
              disabled={disabled}
            >
              <IconMinus />
            </ActionIcon>
          )}
        </Group>
      ))}
      <ActionIcon onClick={handleAddInput} disabled={disabled}>
        <IconPlus />
      </ActionIcon>
    </Stack>
  )
}
