import { useState } from 'react'
import { type Contact } from '../types'

const useForm = (initialValue: Contact) => {
  const [formValues, setFormValues] = useState<Contact>(initialValue)

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormValues(formValue => ({
      ...formValue,
      [name]: value
    }))
  }

  const handleDateChange = () => {
    setFormValues(formValue => ({
      ...formValue
    }))
  }

  const handleSetForm = (form: Contact | undefined) => {
    if (form != null && form !== undefined) {
      setFormValues(form)
    }
  }

  const handleResetForm = () => {
    setFormValues(initialValue)
  }

  return {
    formValues,
    handleFormChange,
    handleDateChange,
    handleSetForm,
    handleResetForm
  }
}

export default useForm
