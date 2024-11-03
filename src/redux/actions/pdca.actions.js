import * as constants from 'redux/contansts/pdca.constants'

export const onCreate = (formData) => ({
  type: constants.CREATE_PDCA_REQUESTED,
  formData,
})

export const onDelete = (id) => ({
  type: constants.DELETE_PDCA_REQUESTED,
  id,
})
