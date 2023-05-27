import { Container } from '@chakra-ui/react'

interface Props {
  children: [React.ReactElement, React.ReactElement]
}

const Main = ({ children }: Props) => {
  return (
    <Container centerContent p={0} maxW='md'>
      {children}
    </Container>
  )
}

export default Main
