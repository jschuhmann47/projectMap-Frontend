import { post, remove } from 'services/api'

export const createPdca = (formData) => post('pdca', formData)

export const deletePdca = (id) => remove(`pdca/${id}`)
