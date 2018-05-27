import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_DB_API_KEY,
  authDomain: process.env.REACT_APP_DB_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
