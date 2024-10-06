import { get, post, put } from 'services/api';

export const forgotPassword = (formData) => post('users/user/password/recovery', formData);

export const initialize = () => get('auth/profile');

export const login = (formData) => post('auth/login', formData);

export const register = (formData) => post('auth/register', formData);

export const logout = () => post('auth/logout');

export const resetPassword = async (formData, temporaryToken) =>
    post('users/user/password',
        formData,
        {
            headers: {
                Authorization: `Bearer ${temporaryToken}`,
                'Content-Type': 'application/json',
            }
        }
    );

export const editProfile = async (id, formData) => put(`users/${id}`, formData);

export const getProfile = async (id) => get(`users/${id}`);

export const searchByEmail = async (email) => get(`users/user/search?email=${email}`);

export const verifyCode = async (code) => post(`users/user/password/code`, code);
