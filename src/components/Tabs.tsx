import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs as TabsList, Text } from '@chakra-ui/react'
import ListOfContact from './ListOfContact'
import ListOfTask from './ListOfTask'
import ListOfComment from './ListOfComment'

const Tabs = () => {
  return (
    <TabsList mt={4} w={{ base: '90%', md: 'container.md' }} variant='unstyled'>

      <TabList justifyContent='center' bg='blue.600' color='white' py={2} borderRadius={8}>
        <Tab>
          Contactos
        </Tab>
        <Tab>
          Tareas
        </Tab>
        <Tab>
          Comentarios
        </Tab>
      </TabList>
      <TabIndicator
        mt='-1.5px'
        height='4px'
        bg='green.300'
      />

      <TabPanels pt='1rem'>
        <TabPanel>
          <Text as='b' fontSize={18} color='blue.600'>
            Lista de contactos
          </Text>
          <ListOfContact />
        </TabPanel>
        <TabPanel>
          <Text as='b' fontSize={18} color='blue.600'>
            Lista de tareas
          </Text>
          <ListOfTask />
        </TabPanel>
        <TabPanel>
          <Text as='b' fontSize={18} color='blue.600'>
            Comentarios
          </Text>
          <ListOfComment />
        </TabPanel>
      </TabPanels>

    </TabsList>
  )
}

export default Tabs
