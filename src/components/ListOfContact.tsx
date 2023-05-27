import { useEffect, useState } from 'react'
import { Box, Button, Divider, Flex, HStack, IconButton, Text } from '@chakra-ui/react'
import { AddUser, CheckCircle, Edit, Trash } from 'iconoir-react'
import FormAddContact from './FormAddContact'
import { useContactsStore } from '../store/contacts'

const ListOfContact = () => {
  const [visible, setVisible] = useState(false)
  const [contactId, setContactId] = useState('')
  const contacts = useContactsStore(state => state.contacts)
  const removeContact = useContactsStore(state => state.removeContact)
  const getContacts = useContactsStore(state => state.getContacts)

  useEffect(() => {
    getContacts()
  }, [])

  const handleRemoveContact = (contactId: string) => {
    removeContact(contactId)
  }

  const handleUpdateContact = (contactId: string) => {
    setVisible(!visible)
    setContactId(contactId)
  }

  const toggleVisible = () => {
    setContactId('')
    setVisible(!visible)
  }

  return (
    <Flex direction='column' mt={6}>
      <Box bgColor='gray.100' borderRadius={12}>
        {
          visible
            ? <FormAddContact contactId={contactId} setVisible={setVisible} />
            : contacts?.map(user => (
              <Box key={user.cel}>
                <HStack px={8} py={5} justifyContent='space-between' direction='row' spacing={6}>
                  <Box>
                    <Text as='b' fontSize={18}>{user.name}</Text>
                    <Text color='blue.500'>{user.cel}</Text>
                  </Box>
                  <Box>
                    <IconButton
                      variant='unstyled'
                      aria-label='editar contacto'
                      onClick={() => handleUpdateContact(user.id)}
                      icon={<Edit color='#2b6cb0' height={24} />}
                    />
                    <IconButton
                      variant='unstyled'
                      aria-label='chequear contacto'
                      icon={<CheckCircle color='#2b6cb0' height={22} />}
                    />
                    <IconButton
                      variant='unstyled'
                      aria-label='remover contacto'
                      onClick={() => handleRemoveContact(user.id)}
                      icon={<Trash color='#2b6cb0' height={22} />}
                    />
                  </Box>
                </HStack>
                <Divider borderColor='white' borderWidth={2} />
              </Box>
            ))
        }
      </Box>

      {
        !visible
          ? <Button colorScheme='blue' color='white' rightIcon={<AddUser />} mt={6} onClick={toggleVisible}>Agregar</Button>
          : <Button w='100%' mt={4} onClick={toggleVisible}>Cancelar</Button>
      }

    </Flex>
  )
}

export default ListOfContact
