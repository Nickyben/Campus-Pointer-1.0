import {
	INDICATE_TRIED_TO_AUTO_LOGIN,
	AUTHENTICATE,
	LOGOUT,
} from '../actions/authActions';

const initialState = {
	idToken: null,
  userId: null,
	pushToken: null,
	userEmail:null,
	triedAutoLogin: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case INDICATE_TRIED_TO_AUTO_LOGIN: {
			return {
				...state,
				// idToken: action.idToken,
				// userId: action.userId,
				// pushToken: action.pushToken,
				triedAutoLogin: true,

				//isLoading: false,
			};
		}
		case AUTHENTICATE:
			return {
				...state,
				idToken: action.idToken,
				userId: action.userId,
				triedAutoLogin: true,
			};
		
		case LOGOUT:
			return {
				// ...initialState
				...initialState,
				triedAutoLogin: true,
			};

		default:
			return state;
	}
};
