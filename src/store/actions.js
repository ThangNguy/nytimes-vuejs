import Axios from 'axios'

export const getNYTimes = (context) => {
    Axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=5763846de30d489aa867f0711e2b031c&q=singapore&page=0")
    .then(response => {
        context.commit('setNYTimes', { response });
    })
}