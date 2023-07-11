import Mock from 'mockjs'
import homeApi from './MockServerData/home'
import mallApi from './MockServerData/mall'


Mock.mock('/api/home/Get',homeApi.getStatisticalData)