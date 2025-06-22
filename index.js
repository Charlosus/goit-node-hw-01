import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from './contacts.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
  .option('action', {
    alias: 'a',
    describe: 'Choose action to perform',
    choices: ['list', 'get', 'add', 'remove'], 
    demandOption: true,
    type: 'string',
  })
  .option('id', {
    alias: 'i',
    describe: 'Contact ID',
    type: 'string',
  })
  .option('name', {
    alias: 'n',
    describe: 'Contact name',
    type: 'string',
  })
  .option('email', {
    alias: 'e',
    describe: 'Contact email',
    type: 'string',
  })
  .option('phone', {
    alias: 'p',
    describe: 'Contact phone',
    type: 'string',
  })
  .help()
  .alias('help', 'h')
  .parse();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts().then((data) => {
        console.table(data);
      });
      break;

    case 'get':
      getContactById(id).then((data) => {
        if (data) {
          console.table(data);
        } else {
          console.warn(`Contact with id "${id}" not found.`);
        }
      });
      break;

    case 'add':
      addContact(name, email, phone)
        .then((data) => {
          console.table(data);
        })
        .catch((err) => console.error('Error adding contact:', err.message));
      break;

    case 'remove':
      removeContact(id)
        .then(() => console.log(`Contact with id ${id} removed.`))
        .catch((err) => console.error('Error removing contact:', err.message));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
