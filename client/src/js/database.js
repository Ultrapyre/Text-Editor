import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT new data into the database');
  //Makes a connection to the jate db, version number included.
  const jateDb = await openDB('jate', 1)
  //Make a new 'transaction' (the equivalent of calling a database via models), specify that it is 'readwrite'
  const db = jateDb.transaction('jate', 'readwrite');
  //Open the object store inside the database
  const store = db.objectStore('jate')
  //Use .put to update the content in the database with the content given.
  const request = store.put({jate: content });
  //Wait for the request to rummage through the data store to finish
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

//Gets all content from the jate database
export const getDb = async () => {
  console.log('GET ALL from the database.')
  //Makes a connection to the jate db, version number included.
  const jateDb = await openDB('jate', 1)
  //Make a new 'transaction' (the equivalent of calling a database via models), specify that it is 'read only'
  const db = jateDb.transaction('jate', 'readonly');
  //Open the object store inside the database
  const store = db.objectStore('jate')
  //getAll is... self-explanatory.
  const request = store.getAll();
  //Wait for the request to rummage through the data store to finish
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
