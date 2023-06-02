import { useEffect } from 'react'
import {
  Box,
  Button,
  Select,
  Text,
  VStack,
  forwardRef,
  useToast
} from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import { AddUser } from 'iconoir-react'
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
  const toast = useToast()

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

  const handleAddContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      formValues.name.trim() === '' ||
      formValues.lastName.trim() === '' ||
      formValues.address.trim() === '' ||
      formValues.email.trim() === '' ||
      formValues.cel.trim() === ''
    ) {
      toast({
        position: 'bottom-left',
        title: 'Algunos campos estan vacíos.',
        description: 'Por favor, rellene todos los campos.',
        status: 'error',
        duration: 2000,
        variant: 'subtle',
        isClosable: true
      })
      return
    }

    const newContact = {
      name: formValues.name,
      lastName: formValues.lastName,
      address: formValues.address,
      birthday: formValues.birthday,
      email: formValues.email,
      cel: formValues.cel,
      typeContact: formValues.typeContact,
      origen: formValues.origen,
      id: formValues.id
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
      <form onSubmit={handleAddContact}>
        <VStack py={4} spacing={4}>

          <InputForm
            placeholder='Nombres'
            name='name'
            value={formValues.name}
            onChange={handleFormChange}
            type='text'
          />
          <InputForm
            placeholder='Apellidos'
            name='lastName'
            value={formValues.lastName}
            onChange={handleFormChange}
            type='text'
          />
          <InputForm
            placeholder='E-mail'
            name='email'
            value={formValues.email}
            onChange={handleFormChange}
            type='email'
          />
          <InputForm
            placeholder='Cel'
            name='cel'
            value={formValues.cel}
            onChange={handleFormChange}
            type='number'
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
            type='text'
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
                type='submit'
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
                type='submit'
              >
                Agregar
              </Button>
            )
        }
      </form>
    </Box>
  )
}

export default FormAddContact
