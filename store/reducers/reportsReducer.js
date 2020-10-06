import { LOAD_RESULT_DATA } from "../actions/reportsActions";

const initialState = {
  availableResults: [],
  availableAssessments:[],
  availableAttendances:[]
};


export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_RESULT_DATA:
      return({
        ...state,
        availableResults: action.availableResults
      });
  }
  return state;
};