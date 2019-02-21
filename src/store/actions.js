import Axios from 'axios'
import { getURLPage } from './config'

export const getNYTimes = (context, pagination) => {
  Axios.get(getURLPage(pagination))
    .then(response => {
      context.commit('setNYTimes', { response })
    })
}
