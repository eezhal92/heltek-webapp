import axios from 'lib/axios';
import { UserRole } from './model';

interface User {
  id: number;
  name: string,
  email: string,
  roles: UserRole[],
}

interface LoginResponse {
  token: string,
  user: User,
}

interface MeResponse {
  user: User,
}

export function login (email: string, password: string) : Promise<LoginResponse> {
  return axios.post('/auth/login', {
    email,
    password,
  })
    .then(res => res.data);
}

export function getMe () : Promise<MeResponse> {
  return axios.get('/profile')
    .then(res => res.data);
}

export function logout () : Promise<any> {
  return axios.post('/auth/logout')
    .then(res => res.data);
}