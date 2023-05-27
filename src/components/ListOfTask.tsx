import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, List, ListIcon, ListItem, Text } from '@chakra-ui/react'
import { CheckCircle } from 'iconoir-react'
import { useContactsStore } from '../store/contacts'

const ListOfTask = () => {
  const contacts = useContactsStore(state => state.contacts)
  return (
    <Flex direction='column' mt={6}>
      <Box>
        {
          contacts?.map(user => (
            <Box bgColor='gray.100' borderRadius={12} key={user.cel} mb={2}>
              <Flex rowGap={1} direction='column' px={8} py={4}>
                <Text as='b' fontSize={18} color='blue.700'>{user.name}</Text>
                <Text>{user.cel}</Text>
                <Text>{user.email}</Text>
              </Flex>
              <Accordion allowToggle px={8}>
                <AccordionItem>
                  <AccordionButton>
                    <Box as='b' color='blue.500' flex='1' textAlign='left'>
                      Tareas
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <List spacing={3}>
                      <ListItem>
                        <ListIcon as={CheckCircle} color='green.500' />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckCircle} color='green.500' />
                        Assumenda, quia temporibus eveniet a libero incidunt suscipit
                      </ListItem>
                    </List>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          ))
        }
      </Box>
    </Flex>
  )
}

export default ListOfTask
