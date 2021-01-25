


export const SUBMIT_FORM = 'SUBMIT_FORM';

export const formActionTypes = [SUBMIT_FORM];

export const submitForm =(formId, formData)=>{
  //console.warn(formId)
  return({
    type: SUBMIT_FORM,
    id: formId,
    inputValues: formData,
  })
}