import { lightTheme } from "../../constants/Colors";
import { CHANGE_PASSWORD, CHANGE_EMAIL, SET_VISIBILITY, SET_NOTIFICATIONS, ENABLE_NOTIFICATIONS } from "../actions/settingsActions";
import {
  initialVisibilitySettings, initialNotificationsIsEnabled, initialNotificationSettings
} from "../../data/generalData";




const initialState = {
  idToken: null,//or dummyData
  userId: null,//or dummyData
  // currentPassword: null,//or dummyData
  currentEmail: null,//or dummyData
  currentPhoneNumber: null,//or dummyData
  currentVisibilitySettings: initialVisibilitySettings,//remember to fetch and  store in the device together with db and also fetch onApp start
  enableNotificationSettings: initialNotificationsIsEnabled,//remember to fetch and store in the device together with db and also fetch onApp start
  currentNotificationsSettings: initialNotificationSettings,//remember to fetch and store in the device together with db and also fetch onApp start
  currentSoundsSettings: [],
  currentLanguageSettings: [],
  currentThemeSettings: { themeMode: 'Light', themeColor: lightTheme.primary[0] },
  lastProblemReport: {},
  lastFeedbackGiven: {},

};
export default (state = initialState, action) => {
  const { type, idToken, userId } = action;
  switch (type) {
    
    case CHANGE_EMAIL:
      return ({
        ...state,
        currentEmail: action.newEmail,
      });
    case SET_VISIBILITY:
      {
        const prevVisibilitySettings = [...state.currentVisibilitySettings];
        const updatedSettings = prevVisibilitySettings.filter(s => s.id !== action.visibilityData.settingId).
          concat({
            id: action.visibilityData.settingId,
            choice: action.visibilityData.choice,
          });
        return ({
          ...state,
          currentVisibilitySettings: updatedSettings,
        });
      }
    case ENABLE_NOTIFICATIONS: { 
      return({
        ...state,
        enableNotificationSettings: action.enable,
      });
    }
    case SET_NOTIFICATIONS:
      {
        const prevState = [...state.currentNotificationsSettings];
        const theSection = prevState.find(sec => sec.id === action.notificationsData.sectionId);
        const theSettingPrevChoice = theSection && theSection.settings.
          find(sett => sett.label === action.notificationsData.label).choice;
        const updatedSettings = theSection && theSection.settings.
          filter(sett => sett.label !== action.notificationsData.label).concat({
            label: action.notificationsData.label,
            choice: !theSettingPrevChoice,
          });
        const updatedNotificationSettings = prevState.filter(sec => sec.id !== action.notificationsData.sectionId).
          concat({
            id: action.notificationsData.sectionId,
            settings: updatedSettings
          });
        return (
          {
            ...state,
            currentNotificationsSettings: updatedNotificationSettings
          }
        )
      }
  }
  return state;
};