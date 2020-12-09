


export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_PHONE_NUMBER = 'CHANGE_PHONE_NUMBER';
export const SET_VISIBILITY = 'SET_VISIBILITY';
export const ENABLE_NOTIFICATIONS = 'ENABLE_NOTIFICATIONS';
export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
export const SET_SOUNDS = 'SET_SOUNDS';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_THEME = 'SET_THEME';
export const REPORT_PROBLEM = 'REPORT_PROBLEM';
export const GIVE_FEEDBACK = 'GIVE_FEEDBACK';


// export const changePassword = (passwordData) => {
//   const { idToken, userId } = passwordData;

//   //http request etc;
//   return ({

//     type: CHANGE_PASSWORD,
//   });
// };

export const changeEmail = (emailData) => {
  return ({
    type: CHANGE_EMAIL,
    emailData,
  });
};

export const changePhoneNumber = (phoneNumberData) => {
  return ({
    type: CHANGE_PHONE_NUMBER,
    phoneNumberData,
  });
};

export const setVisibility = (visibilityData) => {
  return ({
    type: SET_VISIBILITY,
    visibilityData,
  });
};

export const enableNotifications = (notificationsData, enableNotifications) => {
  if (notificationsData === 'notificationsSwitch') {
    return ({
      type: ENABLE_NOTIFICATIONS,
      enable: enableNotifications,
    });
  } 

  
};
 
export const setNotifications = (notificationsData) => {
  
  return ({
    type: SET_NOTIFICATIONS,
    notificationsData,
  });
};

export const setSounds = (soundsData) => {
  return ({
    type: SET_SOUNDS,
    soundsData,
  });
};

export const setLanguage = (languageData) => {
  return ({
    type: SET_LANGUAGE,
    languageData,
  });
};

export const setTheme = (themeMode, themeColor) => {
  return ({
    type: SET_THEME,
    themeMode,
    themeColor,
  });
};

export const reportProblem = (reportData) => {
  return ({
    type: REPORT_PROBLEM,
    reportData,
  });
};

export const giveFeedback = (feedbackData) => {
  return ({
    type: GIVE_FEEDBACK,
    feedbackData,
  });
};




