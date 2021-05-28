//import * as firebase from 'firebase';
const securedVars = {
	apiKey: 'AIzaSyAaqVEzZzq5RDJ9QJwmYazriA5S9GKy8bc',
};

export const endpoints = {
	signUp: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${securedVars.apiKey}`,
	login: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${securedVars.apiKey}`,
	update: `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${securedVars.apiKey}`,
	getData: (node) => `https://pointer-1-0.firebaseio.com/${node}.json`, //'http://www.facebook.com', //'change the project name in the url
	postData: (node, idToken) => `https://pointer-1-0.firebaseio.com/${node}.json?auth=${idToken}`, //'http://www.facebook.com', //'
	deleteData: (node, idToken) => `https://pointer-1-0.firebaseio.com/${node}.json?auth=${idToken}`, //'http://www.facebook.com', //'
	resetPassword: `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${securedVars.apiKey}`,
};
var firebaseConfig = {
	apiKey: securedVars.apiKey,
	authDomain: 'pointer-1-0.firebaseapp.com',
	databaseURL: 'https://pointer-1-0.firebaseio.com',
	projectId: 'pointer-1-0',
	storageBucket: 'pointer-1-0.appspot.com',
	messagingSenderId: '646045831478',
	appId: '1:646045831478:web:22db34851b789d1d3e6397',
	measurementId: 'G-EHEP3TQWJ8',
};
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
//firebase.analytics();

//export default firebase;






 