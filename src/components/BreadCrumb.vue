<template>
    <el-breadcrumb class="breadcumb" separator="/"> 
        <el-breadcrumb-item v-for="(v, i) in lists" :key="i">
            <router-link :to="{ path: v.path }">{{ v.meta.title }}</router-link>
            <span v-if="i < lists.length - 1"></span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
    
<script>

export default {
    name: 'Home',
    data() {
        return {
            lists: [{ path: '/home', name: 'home', meta: { title: '首页' }}]
        }
    },

    //监听路由变化
    watch: {
        $route(to, from) {
            let matched = to.matched;
            //this.$route.matched
            //这个地方是为了固定第一级目录是首页不变
            if (matched.length && matched[0].name !== "home") {
                matched = [{ path: '/home', name: 'home', meta: { title: '首页' } }, ...matched];
            }
            //数组名 是一种追加数组的方法
            var arr = [1, 2, 3]
            var arr1 = [4, 5]
            var arr2 = [2, ...arr1] == [2, 4, 5]
            //
            this.lists = matched;
        }
    }
}

</script>

<style lang="less" scoped>
.breadcumb{
    margin-bottom: 10px;
    height: 20px;
    line-height: 20px;
    background-color: whitesmoke;
}
</style>
