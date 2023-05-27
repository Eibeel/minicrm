import { create } from 'zustand'
import { type Contact } from '../types'

interface State {
  contacts: Contact[]
  addContact: (newContact: Contact) => void
  updateContact: (updatedContact: Contact) => void
  removeContact: (contactId: string) => void
  getContacts: () => void
  filterContacts: (name: string) => void
}

export const useContactsStore = create<State>((set) => {
  const storedContacts = localStorage.getItem('contacts')
  const initialContacts = (storedContacts != null) ? JSON.parse(storedContacts) : []

  const getContacts = () => {
    if (storedContacts !== null && storedContacts !== '') {
      set({ contacts: initialContacts })
    }
  }

  return {
    contacts: [] as Contact[],
    addContact: (newContact: Contact) =>
      set(state => {
        const updatedContacts = [...state.contacts, newContact]
        localStorage.setItem('contacts', JSON.stringify(updatedContacts))
        return { contacts: updatedContacts }
      }),
    updateContact: (updatedContact: Contact) =>
      set(state => {
        const updatedContacts = state.contacts.map(contact => {
          if (contact.id === updatedContact.id) {
            return {
              ...contact,
              ...updatedContact
            }
          }
          return contact
        })
        localStorage.setItem('contacts', JSON.stringify(updatedContacts))
        return { ...state, contacts: updatedContacts }
      }),
    removeContact: (contactId) => {
      set(state => {
        const updatedContacts = state.contacts.filter(contact => contact.id !== contactId)
        localStorage.setItem('contacts', JSON.stringify(updatedContacts))
        return { contacts: updatedContacts }
      })
    },
    getContacts,
    filterContacts: (name: string) => {
      set(state => {
        const filterContact = state.contacts.filter(contact => contact.name.includes(name))
        return { contacts: name !== '' ? filterContact : initialContacts }
      })
    }
  }
})
