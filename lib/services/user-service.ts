import axiosClient from '../api/axios-client';
import { User } from 'lib/types/user';

export async function getUser() {
  return (await axiosClient.get<User>('/auth/user')).data;
}

export async function loginUser(
  email: string,
  password: string,
  device_name: string,
  rememberMe: boolean = false
) {
  const response = await axiosClient.post('/auth/login', {
    email,
    password,
    device_name,
  });

  return {
    token: response.data.token,
    user: response.data.user,
    rememberMe,
  };
}

export async function logoutUser() {
  return (await axiosClient.post('/auth/logout')).data;
}
