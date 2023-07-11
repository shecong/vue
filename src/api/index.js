import http from '../utils/request.js'

export const getData = () => {
    return http.get('/api/home/Get')
}

 