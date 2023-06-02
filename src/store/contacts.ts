import { create } from 'zustand'
import { type Contact } from '../types'
import { DeleteContact, EditContact, createNewContact, getAllContacts } from '../services/request'

interface State {
  contacts: Contact[]
  addContact: (newContact: Contact) => void
  updateContact: (updatedContact: Contact) => void
  removeContact: (contactId: string) => void
  getContacts: () => Promise<void>
  filterContacts: (name: string) => void
}

export const useContactsStore = create<State>((set) => {
  let initialContacts: Contact[] = []

  return {
    contacts: [] as Contact[],
    addContact: (newContact: Contact) =>
      set(state => {
        const updatedContacts = [...state.contacts, newContact]
        createNewContact(newContact)
        return { contacts: updatedContacts }
      }),
    updateContact: (updatedContact: Contact) =>
      set(state => {
        const updatedContacts = state.contacts.map(contact => {
          if (contact.id === updatedContact.id) {
            const { id } = contact
            EditContact(updatedContact, id)
            return {
              ...contact,
              ...updatedContact
            }
          }
          return contact
        })
        return { ...state, contacts: updatedContacts }
      }),
    removeContact: (contactId) => {
      set(state => {
        const updatedContacts = state.contacts.filter(contact => contact.id !== contactId)
        DeleteContact(contactId)
        return { contacts: updatedContacts }
      })
    },
    getContacts: async () => {
      try {
        const savedContacts = await getAllContacts()
        initialContacts = savedContacts
        set({ contacts: savedContacts })
      } catch (error) {
        console.error(error)
      }
    },
    filterContacts: (name: string) => {
      set(state => {
        const filterContact = state.contacts.filter(contact => contact.name.includes(name))
        return { contacts: name !== '' ? filterContact : initialContacts }
      })
    }
  }
})
