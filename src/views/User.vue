<template>
    <el-container>
        <el-aside style="width: 12%;">
            <el-menu default-active="1-4-1" text-color="black" active-text-color="#ffd04b"> 
                <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
                    <i :class="`el-icon-${item.icon}`"></i>
                    <span slot="title">{{ item.label }}</span>
                </el-menu-item>
                <el-submenu v-for="item in HasChildren" :key="item.label" :index="item.label">
                    <template slot="title">
                        <i :class="`el-icon-${item.icon}`"></i>
                        <span slot="title">{{ item.label }}</span>
                    </template>
                    <el-menu-item-group v-for="subitem in item.children" :key="subitem.path">
                        <el-menu-item :index="subitem.path">{{ subitem.label }}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main>
            <CommonContainer v-show="IsOpen"/>
            <router-view name="UserRouter"></router-view>
        </el-main>
    </el-container>
</template>

<script>
import { isProxy } from 'vue';
import CommonContainer from '../components/User/CommonContainer.vue'
export default {
    components: {
        CommonContainer
    },
    props: {},
    data() {
        return {
            IsOpen:true,
            menuData: [
                {
                    path: '/Account',
                    name: 'Account',
                    label: '账号信息',
                    icon: 'user',
                    url: 'Account/Account'
                },
                {
                    path: '/Like',
                    name: 'Like',
                    label: '兴趣爱好',
                    icon: 'monitor',
                    url: 'Like/Like'
                }, {
                    path: '/Setting',
                    name: 'Setting',
                    label: '系统设置',
                    icon: 'chat-dot-round',
                    url: 'Setting/Setting'
                },  {
                    path: '/SingleIR',
                    name: 'SingleIR',
                    label: '消息通知',
                    icon: 'chat-dot-round',
                    url: 'SingleIR/SingleIR'
                }, 
            ]
        };
    },
    watch: {},
    computed: {
        noChildren() {
            return this.menuData.filter(item => !item.children)
        },
        HasChildren() {
            return this.menuData.filter(item => item.children)
        },
    },
    methods: {
        //路由跳转
    handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickMenu(item) {  
            console.log(item)
            this.IsOpen=false;
            if (this.$route.path !== item.path || (this.$route.path === '/home' && item.path === "/")) { 
                this.$router.push(item.path)  
            } 
        }, 
    },
    created() { },
    mounted() { }
};
</script>
<style lang="less" scoped> 
.el-aside {
     background-color: #FFF;
     color: #333;
     text-align: center;
     line-height: 200px;
     margin-right: 10px;
     height: 100vh;
 }

 .el-main {
     background-color: #FFF;
     color: #333;
     text-align: center; 
     height: 100vh;
 }

 body>.el-container {
     margin-bottom: 40px;
 }
</style>