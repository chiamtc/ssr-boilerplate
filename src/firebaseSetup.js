import * as firebase from 'firebase';
import {pod_config} from "./firebaseConfig"
import 'firebase/storage';
let FIREBASE;
if (!firebase.apps.length) {
  const FIREBASE = firebase.initializeApp(pod_config);
}
//
// firebaseApp.auth().signOut()

// export default FIREBASE
export const FirebaseFunctions = firebase.functions();