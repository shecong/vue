<template>
    <div>
        <el-container>
            <el-header>
                <div class="title-container">
                    <div class="cur" @click="ClickRefresh('热门')" title="热门"><span>热门</span></div>
                    <div @click="ClickRefresh('榜单')"><span>榜单</span></div>
                    <div @click="ClickRefresh('明星')"><span>明星</span></div>
                    <div @click="ClickRefresh('搞笑')"><span>搞笑</span></div>
                    <div @click="ClickRefresh('情感')"><span>情感</span></div>
                    <div @click="ClickRefresh('周末')"><span>周末</span></div>
                    <div @click="ClickRefresh('More')"><span>More</span></div>
                </div>
            </el-header>
            <el-main>
                Main
            </el-main>
        </el-container>

    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        ClickRefresh(item) {
            alert(item);
        }
    }
}
</script>

<style lang="less" scoped>
.el-container{
    margin: 0px 15px; 
}
.el-header {
    padding: 15px 20px;
    box-sizing: border-box;
    flex-shrink: 0;
    background-color: white;
}
.el-main{
    background-color: white;
    margin-top: 20px;
}
.title-container {
    display: flex;

    div {
        width: 12.5%;
        padding: 5px 12px;
        border-radius: 15px;
        line-height: 20px;
        text-align: center;
        cursor: pointer; 
        width: 100%;
        margin: 0 2px;
        padding: 5px;

        span {
            font-size: 15px;
            color: #333;
            color: var(--w-main);
        }
    }
}
.title-container .cur span {
    font-weight: 500;
    color: #ff8200; 
}
</style>