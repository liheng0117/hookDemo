import { FETCH_AUTH_USER } from '@/constants/actionTypes'
import { post } from '@/utils/request'
import api from '@/services/api'

export function getUser(options) {
  return {
    type: FETCH_AUTH_USER,
    payload: post(api.loginUrl, options),
  }
}
