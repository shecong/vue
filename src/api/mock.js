import Mock from 'mockjs'
import homeApi from './MockServerData/home'
import mallApi from './MockServerData/mall'


Mock.mock('/home/getData',homeApi.getStatisticalData)