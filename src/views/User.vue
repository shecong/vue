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
        <el-main>Main</el-main>
    </el-container>
</template>

<script>
import CommonContainer from '../components/User/CommonContainer.vue'
export default {
    components: {
        CommonContainer
    },
    props: {},
    data() {
        return {
            menuData: [
                {
                    path: '/home',
                    name: 'home',
                    label: '账号信息',
                    icon: 'user',
                    url: 'Home/Home'
                },
                {
                    path: '/mall',
                    name: 'mall',
                    label: '兴趣爱好',
                    icon: 'monitor',
                    url: 'MallManage/MallManage'
                }, {
                    path: '/user',
                    name: 'user',
                    label: '消息通知',
                    icon: 'chat-dot-round',
                    url: 'UserManage/UserManage'
                }, {
                    label: '个性化管理',
                    icon: 'set-up',
                    children: [
                        {
                            path: '/page1',
                            name: 'page1',
                            label: '系统设置',
                            icon: 'setting',
                            url: 'Other/PageOne'
                        }, {
                            path: '/page2',
                            name: 'page2',
                            label: '自定义页面',
                            icon: 'setting',
                            url: 'Other/PageTwo'
                        },
                    ]
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
        clickMenu(item) { 
            
        }
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
     line-height: 160px;
     height: 100vh;
 }

 body>.el-container {
     margin-bottom: 40px;
 }
</style>