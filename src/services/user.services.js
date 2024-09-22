import { get, post, put } from 'services/api';

export const forgotPassword = (formData) => post('auth/password', formData); // confirm

export const initialize = () => get('auth/profile');

export const login = (formData) => post('auth/login', formData);

export const register = (formData) => post('auth/register', formData);

export const logout = () => post('auth/logout');

export const resetPassword = async (formData) => put('auth/password', formData);

export const editProfile = async (id, formData) => put(`users/${id}`, formData);

export const getProfile = async (id) => get(`users/${id}`);

export const searchByEmail = async (email) => get(`users/user/search?email=${email}`);

export const verifyCode = async (code) => post(`auth/verify`, code); // confirm

export const changePassword = async (password) => put(`auth/password`, password); // confirm