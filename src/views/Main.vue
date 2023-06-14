<template>
    <div> 
        <el-container>
            <el-aside width="auto">
                <CommonAside />
            </el-aside>
            <el-container>
                <el-header style="padding: none;">
                    <CommonHead />
                </el-header>
                <el-main>
                    <Breadcrumb />
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<style lang="less" scoped>
.el menu{
    border-right: none; 
}
.el-header{
    padding:0;
}
</style>


<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHead from '../components/CommonHead.vue'
import Breadcrumb from '../components/BreadCrumb.vue';

export default {
    data() {
        return {};
    },
    components: {
        CommonAside,
        CommonHead,
        Breadcrumb
    }

}
</script>