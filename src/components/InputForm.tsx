import { Input } from '@chakra-ui/react'

interface TextInputProps {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const InputForm: React.FC<TextInputProps> = ({ name, value, onChange, placeholder }) => {
  return (
    <Input
      bgColor='whiteAlpha.700'
      borderRadius={8}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}

export default InputForm
