const PATH = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=5763846de30d489aa867f0711e2b031c&q=singapore&'

export const getURLPage = (page) => `${PATH}page=${page}`
