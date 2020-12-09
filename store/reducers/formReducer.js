import {

} from '../actions/dataActions';
import { SUBMIT_FORM } from '../actions/formActions';



const initialState = {
  submittedFormsData:[]

};

export default (state = initialState, action) => {
	switch (action.type) {
   
    case SUBMIT_FORM:{
      const prevState =  [...state.submittedFormsData];
      const withoutPresentForm = prevState.filter(form=>form.id!== action.id);
      const updatedState = withoutPresentForm.concat({id:action.id, inputValues: action.inputValues})
      //console.warn(updatedState)
      return ({
			...state,
			submittedFormsData: updatedState,
		});
    
  }
    default: return state;
	}
	return state;
};
