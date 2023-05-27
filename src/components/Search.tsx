import { Box, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { Search as Searc } from 'iconoir-react'
import { useContactsStore } from '../store/contacts'

const Search = () => {
  const filterContacts = useContactsStore(state => state.filterContacts)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchName = e.target.value
    filterContacts(searchName)
  }

  return (
    <Box mt={8} w={{ base: '90%', md: 'container.md' }}>
      <InputGroup>
        <InputRightElement>
          <Searc height={18} />
        </InputRightElement>
        <Input
          borderRadius={8}
          placeholder='Buscar'
          onChange={handleChange}
        />
      </InputGroup>
    </Box>
  )
}

export default Search
