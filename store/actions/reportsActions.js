import results from '../../data/results';



export const LOAD_RESULT_DATA= 'LOAD_RESULT_DATA';


export const fetchReportsData = () =>{
  return(
    {
      type: LOAD_RESULT_DATA,
      availableResults: results,
    }

  );
};