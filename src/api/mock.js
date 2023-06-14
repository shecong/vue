import Mock from 'mockjs'
import homeApi from './MockServerData/home'
Mock.mock('/api/home/getData',homeApi.getStatisticalData)