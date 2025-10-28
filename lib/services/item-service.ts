import axiosClient from 'lib/api/axios-client';
import { Item } from 'lib/types/item';

export async function getUser() {
  return (await axiosClient.get<Item>('/auth/user')).data;
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
