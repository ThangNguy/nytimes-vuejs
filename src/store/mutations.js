export const setNYTimes = (state, payload) => {
  state.times = payload.response.data.response.docs
}
