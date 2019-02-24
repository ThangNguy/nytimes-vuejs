import Axios from 'axios'
import { getURLPage } from './config'

export const getNYTimes = (context, { page, successCallback }) => {
  Axios.get(getURLPage(page))
    .then(response => {
      context.commit('setNYTimes', { response })
      // Check if callback is existed and is a function
      if (successCallback && typeof successCallback === 'function') {
        successCallback()
      }
    })
}
