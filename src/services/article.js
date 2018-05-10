import axios from 'axios'

export const getArticles = (params) => axios.get('/api/article', { params })

export const getArticle = (params) => axios.get(`/api/article/${params.id}`)