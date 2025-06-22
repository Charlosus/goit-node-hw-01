import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const contactsPath = 'db/contacts.json';

function listContacts() {
  return fs
    .readFile(contactsPath, 'utf8')
    .then((data) => JSON.parse(data))
    .catch((err) => {
      console.error('Error reading contacts:', err.message);
      return [];
    });
}

// async function listContacts() {
//     const data = await fs.readFile(contactsPath, 'utf8')
//     return JSON.parse(data)
// }

function getContactById(contactId) {
  return listContacts()
    .then((contacts) => {
      const contact = contacts.find((c) => c.id === contactId);
      if (!contact) {
        throw new Error(`Contact with id ${contactId} not found`);
      }
      return contact;
    })
    .catch((err) => {
      console.error('Error:', err.message);
      // Możesz tu też zwrócić null albo undefined, albo ponownie rzucić
      return null;
    });
}

// async function getContactById(contactId) {
//     const data = await listContacts()
//     return data.find(contact => contact.id === contactId)
// }

function removeContact(contactId) {
  return listContacts().then((contacts) => {
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    const jsonData = JSON.stringify(filteredContacts, null, 2);
    return fs.writeFile(contactsPath, jsonData);
  });
}

// async function removeContact(contactId) {
//     const contacts = await listContacts();
//     const filteredContacts = contacts.filter(contact => contact.id !== contactId)
//     const jsonData = JSON.stringify(filteredContacts, null, 2);
//     await fs.writeFile(contactsPath, jsonData);
//     return console.log(`Contact with id ${contactId} has been remove`)
// }

function addContact( name, email, phone ) {
  const contactId = uuidv4();
  const newContact = { id: contactId, name, email, phone };

  return listContacts().then((contacts) => {
    contacts.push(newContact);
    return fs
      .writeFile(contactsPath, JSON.stringify(contacts, null, 2))
      .then(() => newContact);
  });
}
// async function addContact(name, email, phone) {
//   const contactId = uuidv4();
//   const newContact = { id: contactId, name, email, phone };

//   const contacts = await listContacts();
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// }

export { listContacts, getContactById, removeContact, addContact };
