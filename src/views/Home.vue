<template>
    <el-row>
        <el-col :span="6">
            <el-card class="box-card">
                <div class="User">
                    <img src="../assets/logo.png" alt="">
                    <div class="UserInfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间：<span>2023/04/25</span></p>
                    <p>上次登录地点：<span>广州</span></p>
                </div>
            </el-card>
            <el-card style="margin-top:20px;height:525px">
                <el-table style="width: 100%;"  height="480px" :data="tableData">
                    <el-table-column fixed v-for="(val, key) in tablelabe" :key="key" :prop="key" :label="val">

                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="18">
            <div class="num">
                <el-card v-for="countitem in countData" :key="countitem.name" :body-style="{ display: 'flex' }">
                    <i class="icon" :class="`el-icon-${countitem.icon}`" :style="{ background: countitem.color }"></i>
                    <div class="detail">
                        <p class="price">{{ countitem.value }}</p>
                        <p class="dec">{{ countitem.name }}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height: 280px;margin-left: 10px;">
            <div ref="echarts1" style="height: 280px;margin-left: 10px;"></div>
            </el-card>
            <div class="grap">
                <el-card>
                    <el-button >测试</el-button>
                    <el-button type="primary">主要按钮</el-button>
                </el-card>
                <el-card></el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import { getData } from "../api/index";
import * as exports from 'echarts' 
import 'echarts/lib/component/grid'

export default {
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            tablelabe: {
                date: '日期',
                name: '姓名',
                address: '地址'
            },
            countData: [
                {
                    name: '今日订单1',
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                }, {
                    name: '今日订单2',
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                }, {
                    name: '今日订单3',
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                }, {
                    name: '今日订单4',
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                }, {
                    name: '今日订单5',
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                }, {
                    name: '今日订单6',
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
            ]
        }
    },
    mounted() {
        getData().then(({ data }) => {
             
           console.log(data)
           const echarts1= exports.init(this.$refs.echarts1)
            var echartsOption={}
            const { orderData }=data.data   
            console.log(orderData)
            const xAxiosVal=Object.keys(orderData.data[0]) 
            const xAxiosData={
                data:xAxiosVal  
            } 
             
            echartsOption.xAxis=xAxiosData 
            echartsOption.yAxis={}
            echartsOption.legend=xAxiosData 
            echartsOption.series=[]
            xAxiosVal.forEach(key=>{
                echartsOption.series.push({
                    name:key,
                    data:orderData.data.map(item=>item[key]),
                    type:'line'
                }) 
            })
             //调用
            echarts1.setOption(echartsOption)
            
        }) 
    }
}
</script>

<style lang="less" scoped>
.User {
    padding-bottom: 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;

    img {
        width: 150px;
        height: 150px;
        border-radius: 50px;
    }

    .UserInfo {

        .name {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .access {
            color: #999999;
        }
    }
}

.login-info {
    line-height: 28px;
    font-size: 14px;
    color: #999999;

    p span {
        margin-left: 60px;
        line-height: 28px;
        font-size: 14px;
        color: #999999;
    }
}

.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-left: 10px;

    .icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: white;
    }

    .detail {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 15px;
    }

    .price {
        font-size: 30px;
        margin-bottom: 10px;
        line-height: 30px;
        height: 30px;
    }

    .dec {
        font-size: 14px;
        color: #999;
        text-align: center;
    }

    .el-card {
        width: 32%;
        margin-bottom: 20px;
    }

}

.grap {
    display: flex;
    justify-content: space-between;
    margin-left: 10px;
    margin-top: 10px;

    .el-card {
        width: 48%;
        height: 260px;

    }
}</style>