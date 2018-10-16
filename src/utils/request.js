import { getCookie } from '@/utils'
import router from '@/router'
const Fly=require("flyio/dist/npm/fly")
const request = new Fly

request.interceptors.request.use((request) => {
	if(getCookie('token')){
		request.headers.Accept = 'application/json'
		request.headers.Authorization = 'Bearer ' + getCookie('token')
	}
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    return promise.resolve(response.data)
  },
  (err, promise) => {
  	if(err.status == 401){
  		router.push({name: 'Login'})
  	}
    return promise.resolve()
  }
)

export default request
