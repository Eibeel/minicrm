import { useEffect } from 'react'
import { Box, Button, Select, Text, VStack, forwardRef } from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import { AddUser } from 'iconoir-react'
import { v4 as uuidv4 } from 'uuid'
import useForm from '../hooks/useForm'
import InputForm from './InputForm'
import { useContactsStore } from '../store/contacts'
import 'react-datepicker/dist/react-datepicker.css'

const FormAddContact = (
  { contactId, setVisible }: { contactId: string, setVisible: (visible: boolean) => void }
) => {
  const addContact = useContactsStore(state => state.addContact)
  const updateContact = useContactsStore(state => state.updateContact)
  const contact = useContactsStore(state => state.contacts.find(contact => contact.id === contactId))

  const { formValues, handleFormChange, handleDateChange, handleSetForm, handleResetForm } = useForm({
    name: '',
    lastName: '',
    address: '',
    cel: '',
    email: '',
    origen: '',
    typeContact: '',
    birthday: new Date(),
    id: ''
  })

  useEffect(() => {
    if (contactId.length > 0 && contact !== undefined) {
      const contactCopy = {
        ...contact,
        birthday: ((contact?.birthday) != null) ? new Date(contact.birthday) : new Date()
      }
      handleSetForm(contactCopy)
    }
  }, [contactId])

  const handleAddContact = () => {
    const newContact = {
      name: formValues.name,
      lastName: formValues.lastName,
      address: formValues.address,
      birthday: formValues.birthday,
      email: formValues.email,
      cel: formValues.cel,
      typeContact: formValues.typeContact,
      origen: formValues.origen,
      id: uuidv4()
    }

    addContact(newContact)
    setVisible(false)
    handleResetForm()
  }

  const handleUpdatedContact = () => {
    updateContact(formValues)
    setVisible(false)
    handleResetForm()
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const CustomDatePicker = forwardRef(({ value, onClick }, ref) => (
    <Button w='100%' bgColor='whiteAlpha.700' textAlign='left' pl='1rem' variant='unstyled' onClick={onClick} ref={ref}>
      {value}
    </Button>
  ))

  return (
    <Box px={6} pt={6}>
      <Text as='b' fontSize={18} color='#2c6cb0'>Nuevo contacto</Text>
      <VStack py={4} spacing={4}>
        <InputForm
          placeholder='Nombres'
          name='name'
          value={formValues.name}
          onChange={handleFormChange}
        />
        <InputForm
          placeholder='Apellidos'
          name='lastName'
          value={formValues.lastName}
          onChange={handleFormChange}
        />
        <InputForm
          placeholder='E-mail'
          name='email'
          value={formValues.email}
          onChange={handleFormChange}
        />
        <InputForm
          placeholder='Cel'
          name='cel'
          value={formValues.cel}
          onChange={handleFormChange}
        />
        <DatePicker
          selected={formValues.birthday}
          onChange={handleDateChange}
          customInput={<CustomDatePicker />}
          maxDate={today}
        />
        <InputForm
          placeholder='Dirección'
          name='address'
          value={formValues.address}
          onChange={handleFormChange}
        />
        <Select
          bgColor='whiteAlpha.700'
          placeholder='Tipo de contacto'
          name='type'
          value={formValues.typeContact}
          onChange={handleFormChange}
        >
          <option value='cliente'>Cliente</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
        <Select
          bgColor='whiteAlpha.700'
          placeholder='Origen'
          name='origen'
          value={formValues.origen}
          onChange={handleFormChange}
        >
          <option value='landing'>Landing page</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
      </VStack>
      {
        contact !== undefined
          ? (
            <Button
              my={6}
              w='100%'
              colorScheme='teal'
              onClick={handleUpdatedContact}
            >
              Actualizar
            </Button>
          )
          : (
            <Button
              my={6}
              w='100%'
              colorScheme='teal'
              rightIcon={<AddUser />}
              onClick={handleAddContact}
            >
              Agregar
            </Button>
          )
      }
    </Box>
  )
}

export default FormAddContact
