import { get, post, put, remove } from 'services/api';

export const createOkr = (formData) => post('okr', formData);

export const getOneOkr = (id) => get(`okr/${id}`);

export const editOneOkr = (id, formData) => put(`okr/${id}`, formData);

export const deleteOkr = (id) => remove(`okr/${id}`);

export const addKeyResult = (id, formData) =>
  post(`okr/${id}/key-result`, formData);

export const editKeyResult = (id, keyResultId, formData) =>
  put(`okr/${id}/key-result/${keyResultId}`, formData);

export const deleteKeyResult = (id, keyResultId) =>
  remove(`okr/${id}/key-result/${keyResultId}`);

export const assignParent = (id, formData) =>
  post(`okr/${id}/parent`, formData);
