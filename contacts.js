const contacts = require('./db');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      console.log('allContacts', allContacts );
      break;
    case 'get':
      const oneContact = await contacts.getContactById(id);
      console.log(oneContact);
      break;
    case 'add':
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;
    case 'remove':
      const deleteContact = await contacts.removeContact({ id });
      console.log('deleteContact', deleteContact);
      break;
    default:
      return console.log('Unknown action');
  }
};

const { program } = require('commander');
program
.option("-a, --action <type>", "choose action")
.option("-i, --id <type>", "user id")
.option("-n, --name <type>", "user name")
.option("-e, --email <type>", "user email")
.option("-p, --phone <type>", "user phone");
program.parse();
const options = program.opts();
console.log('options', options);
invokeAction(options);


