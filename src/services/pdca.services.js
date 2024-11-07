import { get, patch, post, remove } from 'services/api'

export const createPdca = (formData) => post('pdca', formData)

export const deletePdca = (id) => remove(`pdca/${id}`)

export const getPdca = (id) => get(`pdca/${id}`)

export const patchPdca = (id, formData) => patch(`pdca/${id}`, formData)
