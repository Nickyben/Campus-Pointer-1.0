

//SETTINGS SCREEN ITEMS *************************************************

export const changeVisibilityItems = [
	{
		id: 'emailVisibility',
		label: 'Who can see my email',
		choiceLabels: ['Everyone', 'My Faculty', 'My department', 'My course mates'],
		rightBtn: 'arrow-dropright',
	},
	{
		id: 'phoneVisibility',
		label: 'Who can see my phone number',
		choiceLabels: ['Everyone', 'My Faculty', 'My department', 'My course mates'],
		rightBtn: 'arrow-dropright',
	},
	{
		id: 'regNumberVisibility',
		label: 'Who can see my reg. number',
		choiceLabels: [
			'Everyone',
			'My Faculty',
			'My department',
			'My course mates',
			
		],
		rightBtn: 'arrow-dropright',
	},
];


export const setNotificationItems = [
  {
    id: 'calendarAndEventNotifications',
    header: 'Calendar and Events',
    settings: ['Events'],
  },
  {
    id: 'timetableNotifications',
    header: 'Timetable and Schedules',
    settings: ['Schedule start', 'Schedule end'],
  },
  {
    id: 'homeFeedNotifications',
    header: 'Home Feeds',
    settings: ['Home feed'],
  },

  {
    id: 'directMessagesNotifications',
    header: 'Direct Messages',
    settings: ['Direct messages'],
  },

  {
    id: 'applicationsNotifications',
    header: 'Applications',
    settings: ['Approved applications', ],
  },

  {
    id: 'emergencyNotifications',
    header: 'Emergency',
    settings: ['Emergency and crisis',],
  },
];



//AUTHENTICATION FORM ITEMS





// INITIAL SETTINGS *** implement with phone storage and database!!!!!
export const initialVisibilitySettings = changeVisibilityItems.map((setting, i) =>
  ({
    id: setting.id,
    choice: setting.choiceLabels[2]
  })
)


export const initialNotificationSettings = setNotificationItems.map((section, i) =>
  ({
    id: section.id,
    settings: section.settings.map(setting=> 
      ({label: setting, choice: true})),
  })
)

export const initialNotificationsIsEnabled = true;