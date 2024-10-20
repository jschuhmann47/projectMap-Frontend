import * as constants from 'redux/contansts/pdca.constants'

export const onCreate = (id, formData) => ({
  type: constants.CREATE_PDCA_REQUESTED,
  id,
  formData,
})


export const onDelete = (id) => ({
  type: constants.DELETE_PDCA_REQUESTED,
  id,
})
