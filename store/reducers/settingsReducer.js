import { lightTheme } from "../../constants/Colors";
import { CHANGE_PASSWORD, CHANGE_EMAIL, SET_VISIBILITY } from "../actions/settingsActions";
import { currentVisibilitySettings } from "../../data/generalData";




const initialState = {
  idToken: null,//or dummyData
  userId: null,//or dummyData
  // currentPassword: null,//or dummyData
  currentEmail: null,//or dummyData
  currentPhoneNumber: null,//or dummyData
  currentVisibilitySettings: currentVisibilitySettings,//remember to store in the device together with db and also fetch onApp start
  currentNotificationSettings: [],
  currentSoundsSettings: [],
  currentLanguageSettings: [],
  currentThemeSettings: { themeMode: 'Light', themeColor: lightTheme.primary[0] },
  lastProblemReport: {},
  lastFeedbackGiven: {},

};
export default (state = initialState, action) => {
  const { type, idToken, userId } = action;
  switch (type) {
    case CHANGE_PASSWORD:
      return ({
        ...state,
        //currentPassword:,
        idToken,
        userId,
      });
    case CHANGE_EMAIL:
      return ({
        ...state,
        currentEmail: action.newEmail,
      });
    case SET_VISIBILITY:
      const prevVisibilitySettings = [...state.currentVisibilitySettings];
      const updatedSettings = prevVisibilitySettings.filter(s => s.id !== action.visibilityData.settingId).
        concat({ 
          id: action.visibilityData.settingId,
          choice: action.visibilityData.choice,
        })
      return ({
        ...state,
        currentVisibilitySettings: updatedSettings,
      });
  }
  return state;
};