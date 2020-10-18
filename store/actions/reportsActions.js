import results from '../../data/results';
import assessments from '../../data/assessments';
import attendances from '../../data/attendances';



export const LOAD_RESULT_DATA= 'LOAD_RESULT_DATA';


export const fetchReportsData = () =>{
  return(
    {
      type: LOAD_RESULT_DATA,
      availableResults: results,
      availableAssessments: assessments,
      availableAttendances: attendances,
    }

  );
};