import axios from 'axios'
import { LOCAL_STORAGE_USER_TOKEN } from '@/shared/const/const'

export const $api = axios.create({
  baseURL: __API__,
})

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization =
      localStorage.getItem(LOCAL_STORAGE_USER_TOKEN) || ''
  }
  return config
})
