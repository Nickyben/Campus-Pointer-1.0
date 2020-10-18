import { LOAD_RESULT_DATA } from "../actions/reportsActions";
import results from '../../data/results';
import assessments from '../../data/assessments';
import attendances from "../../data/attendances";


const initialState = {

  availableResults: results, //[],
  availableAssessments: assessments, //[],
  availableAttendances:attendances, // []
};


export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_RESULT_DATA:
      return({
        ...state,
        availableResults: action.availableResults,
        availableAssessments: action.availableAssessments,
        availableAttendances: action.availableAttendances,

      });
  }
  return state;
};