<template>
    <div>
        <el-container>
            <el-header style="padding: none;">
                <CommonHead />
            </el-header>
            <el-container>
                <el-aside width="auto">
                    <CommonAside />
                </el-aside>
                <el-main style="background: #eee;">
                    <Breadcrumb />
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<style lang="less" scoped>
.el menu {
    border-right: none;
}

.el-header {
    padding: 0;
}
</style>


<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHead from '../components/CommonHead.vue'
import Breadcrumb from '../components/BreadCrumb.vue';

export default {
    data() {
        return {

        };
    },
    components: {
        CommonAside,
        CommonHead,
        Breadcrumb
    }, mounted() {
        this.getIpAddress();
    },
    methods: {
        //获取本机ip 
        getIpAddress() {
            fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
                .then(data => {
                    console.log(data.ip);
                    sessionStorage.setItem('ipAddress', data.ip);
                })
                .catch(error => {
                    console.error('获取IP地址时出错：', error);
                });
        }
    },


}
</script>