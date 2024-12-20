import * as constants from 'redux/contansts/pdca.constants'

export const onCreate = (formData) => ({
  type: constants.CREATE_PDCA_REQUESTED,
  formData,
})

export const onDelete = (id) => ({
  type: constants.DELETE_PDCA_REQUESTED,
  id,
})

export const onGetOne = (id) => ({
  type: constants.GET_PDCA_REQUESTED,
  id,
})

export const onPatch = (id, formData) => ({
  type: constants.PATCH_PDCA_REQUESTED,
  id,
  formData,
})

export const changeDemingStage = (newStage) => ({
  type: constants.CHANGE_DEMING_STAGE,
  data: { newStage },
})
