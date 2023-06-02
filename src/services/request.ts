import { Contact } from '../types'

export const getAllContacts = async () => {
  try {
    const response = await fetch('https://database-integration-production.up.railway.app/api/contacts')
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export const createNewContact = async (newContact: Contact) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newContact)
  }
  try {
    const response = await fetch('https://database-integration-production.up.railway.app/api/contacts', options)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export const DeleteContact = async (id: string) => {
  const options = { method: 'DELETE' }
  try {
    const response = await fetch(`https://database-integration-production.up.railway.app/api/contacts/${id}`, options)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const EditContact = async (editableContact: Contact, id: string) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editableContact)
  }

  try {
    const response = await fetch(`https://database-integration-production.up.railway.app/api/contacts/${id}`, options)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
