<template>
    <div id="sc-header-containner" :class="['sc-theme-' + theme]">
        <div class="l-content">
            <img src="../assets/logo.png" style=" height: 100%; float: left;" alt="#">
            <i @click="HandlMenu()" class="el-icon-s-fold" style="cursor: pointer;line-height: 70px;color: white;"></i>
            <!-- <el-button @click="HandlMenu()" icon="el-icon-menu"  size="mini"></el-button> -->
        </div>

        <div class="r-content"> 
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img src="../assets/logo.png" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="UserInfo()">个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="Out()">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div class="Setting-content">
                <span class="el-icon-setting" @click="drawer = true" type="primary" title="设置"></span>
            </div>
        </div>
        <el-drawer title="更换主题样式" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
            <div class="ChangeTheme">
                <div class="ThemeButton" @click="ChangeThemeColor('black')" style=" background-color: black;" title="暗夜黑">
                </div>
                <div class="ThemeButton" @click="ChangeThemeColor('red')" style=" background-color: red;" title="凤凰红"></div>
                <div class="ThemeButton" @click="ChangeThemeColor('blue')" style=" background-color: #2d8cf0;" title="深空蓝"></div>
                <div class="ThemeButton" @click="ChangeThemeColor('Red')" style="  " title="凤凰红"></div>
                <div class="ThemeButton" @click="ChangeThemeColor('Red')" style=" " title="凤凰红"></div>
            </div>
            <div>
         <!-- <ThemeSwitcher /> -->
            </div>
        </el-drawer>
    </div>
</template> 
<style lang="less" scoped>
@import "../views/Index/Index.less";
</style>

<script>
import ThemeSwitcher from '@/theme/ThemeSwitcher.vue';


export default {
    data() {
        return {
            drawer: false,
            direction: 'rtl',
            theme: "dark"
        }
    }, 
    components:{
        ThemeSwitcher
    },
    methods: { 
                HandlMenu() {
                this.$store.commit('collapsMenu')
            },
            Out() {
                this.$confirm('是否退出系统', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    type: 'warning',
                    center: false,
                    closeOnPressEscape: false,//按下 ESC 键关闭弹窗
                    closeOnClickModal: false,//点击遮罩关闭弹窗
                    distinguishCancelAndClose: true,//区分取消与关闭
                }).then(() => {
                    //清空Session状态
                    sessionStorage.clear();
                    //确认回调 
                    this.$router.push("/Login")
                }).catch((action) => {
                    //取消按钮及右上角的关闭按钮回调
                    //在catch方法的回调参数中传递action，判断action的值为 cancel 还是 close，如果是close，就代表操作为点击右上角按钮，为 cancel，就是点击的取消按钮
                    if (action === 'cancel') {
                        //驳回
                    } else {
                        //关闭弹窗
                        return;
                    }
                });


            },
            UserInfo() {
                this.$message('开发中。。。');
            }, handleClose(done) {

                done();
            },
            ChangeThemeColor(item) {
                console.log(item)
            }

        }
    }




</script>