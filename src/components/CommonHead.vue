<template>
    <div class="header-containner">
        <div class="l-content">
            <el-button @click="HandlMenu()" icon="el-icon-menu" size="mini"></el-button>
            <span class="text">首页</span>
        </div>

        <div class="r-content">
            <div class="Setting-content">
                <span class="el-icon-setting" @click="drawer = true" type="primary" title="设置"></span>
            </div>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img src="../assets/logo.png" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="UserInfo()">个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="Out()">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-drawer title="更换主题样式" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
            <div>

            </div>
        </el-drawer>
    </div>
</template>

<style lang="less" scoped> .el-dropdown-link {
     cursor: pointer;
     color: #409EFF;
 }

 .el-icon-arrow-down {
     font-size: 12px;
 }

 .header-containner {
     padding: 0 20px;
     background-color: #333;
     height: 60px;
     display: flex;
     justify-content: space-between;
     align-items: center;

     .text {
         color: #fff;
         font-size: 14px;
         margin-left: 10px;
     }
 }

 .el-dropdown-link {
     img {
         width: 30px;
         height: 30px;
         object-fit: cover;
     }
 }

 .Setting-content {
     display: flex;
     float: right;
     margin-left: 10px;
 }

 .el-icon-setting {
     font-size: 30px;
 }
</style>

<script>

export default {
    data() {
        return {
            drawer: false,
            direction: 'rtl',
        }
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
        }

    }
}
</script>