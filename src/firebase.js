//import * as firebase from 'firebase';

export const endpoints = {
	signUp: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${''}`,
	login: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${''}`,
	update: `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${''}`,
	getData: (node) => `https://rn-firebase-expo-project.firebaseio.com/${node}.json`, //change the project name in the url
	postData: (node, idToken) => `https://rn-firebase-expo-project.firebaseio.com/${node}.json?auth=${idToken}`,
	deleteData: (node, idToken) => `https://rn-firebase-expo-project.firebaseio.com/${node}.json?auth=${idToken}`,
};
const config = {
	// your config stuff
};



//firebase.initializeApp(config);

//export default firebase;
