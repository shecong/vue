<template>
    <el-menu default-active="1-4-1"  @open="handleOpen" @close="handleClose"
        :collapse="isCollapse"   text-color="black" active-text-color="#ffd04b">
        <div style="    text-align: center;
    line-height: 43px;
    height: 40px;">{{ !isCollapse ? '多模态信息管理' : '信息' }}<h3></h3></div>
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
</template>

   
<style lang="less" scoped>
.el-menu {
    height: 100vh;
    border: 0;
    
    h3 {
        color: black;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
        width: 200px;
    }
}
</style>
  
<script>
export default {
    data() {
        return {
            menuData: [
                {
                    path: '/home',
                    name: 'home',
                    label: '首页',
                    icon: 's-home',
                    url: 'Home/Home'
                },
                {
                    path: '/mall',
                    name: 'mall',
                    label: '社区信息',
                    icon: 'video-play',
                    url: 'MallManage/MallManage'
                }, {
                    path: '/user',
                    name: 'user',
                    label: '用户管理',
                    icon: 'user',
                    url: 'UserManage/UserManage'
                }, {
                    label: '其他',
                    icon: 'location',
                    children: [
                        {
                            path: '/page1',
                            name: 'page1',
                            label: '页面1',
                            icon: 'setting',
                            url: 'Other/PageOne'
                        }, {
                            path: '/page2',
                            name: 'page2',
                            label: '页面2',
                            icon: 'setting',
                            url: 'Other/PageTwo'
                        },
                    ]
                },
            ]
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickMenu(item) { 
            if (this.$route.path !== item.path || (this.$route.path === '/home' && item.path === "/")) { 
                this.$router.push(item.path)  
            }
        }

    },
    computed: {
        noChildren() {
            return this.menuData.filter(item => !item.children)
        },
        HasChildren() {
            return this.menuData.filter(item => item.children)
        },
        isCollapse() {
            return this.$store.state.tab.isCollapse
        }
    }
}
</script>