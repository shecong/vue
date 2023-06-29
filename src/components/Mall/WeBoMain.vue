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
                <div class="infinite-list-wrapper" style="overflow:auto">
                    <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
                        <li v-for="i in count" class="list-item">{{ i }}
                            <div class="webo-head">
                                <div class="webo-head-avatar list-item-div" style="width: 3.25rem;height: 3.25rem;">
                                    <img src="../../assets/logo.png" alt="">
                                </div>
                                <div class="list-item-div">
                                    <div class="list-title-name">时光旅行者
                                        <span class="woo-icon-vipimg">
                                            <img src="https://h5.sinaimg.cn/upload/108/1866/2022/11/02/vip_6.png" class="woo-icon-vipimg"></span></div>
                                    <div class="list-title-info"><div style="color: #939393;margin-right: 3px;">一天前</div>
                                    <div style="color: #939393;">永旺前行，不负时光</div></div>
                                </div>
                                <div class="list-item-div" style="padding-top: 12px;">
                                    <el-button round style="color: #ff8200;border: 1px solid #ff8200;padding: 6px 11px;">
                                        <span class="" style=""><i class="el-icon-plus"></i>关注</span>
                                    </el-button> 
                                </div>
                            </div>
                            <div class="weob-container"></div>
                            <div class="weob-foot"></div>
                        </li>
                    </ul>
                    <p v-if="loading">加载中...</p>
                    <p v-if="noMore">没有更多了</p>
                </div>

            </el-main>
        </el-container>

    </div>
</template>

<script>
export default {
    data() {
        return {
            count: 10,
            loading: false
        }
    },
    computed: {
        noMore() {
            return this.count >= 40
        },
        disabled() {
            return this.loading || this.noMore
        }
    },
    methods: {
        load() {
            this.loading = true
            setTimeout(() => {
                this.count += 2
                this.loading = false
            }, 2000)
        }
    }
}
</script>

<style lang="less" scoped>
.el-container {
    margin: 0px 15px;
}

.el-header {
    padding: 15px 20px;
    box-sizing: border-box;
    flex-shrink: 0;
    background-color: white;
}

.el-main {
    background-color: white;
    margin-top: 20px;
    max-height: 1000px;
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

.weob-head {
    display: flex;
    height: 52px;
}

.infinite-list-wrapper .list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e8f3fe;
    color: #7dbcfc;
    margin-bottom: 10px;
    width:100%;
    
    .webo-head {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: 3px 3px;
    }
}

.infinite-list-wrapper {
    height: 700px;
    padding: 0;
    margin: 0;
    list-style: none;
    
}

.infinite-list-wrapper::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
}

.webo-head-avatar img {
    width: 100%;
    height: 100%;
}
.woo-icon-vipimg{
    height: 80%;
    width: auto;
}

.list-title-name{
    height: 21px;
    display: flex;
    font-size: 15px;
    width: 100%;
    margin-bottom: 3px;
    font-size: 15px;
    color: black;
    font-weight: bold; 
}
.list-title-info{
    height: 21px;
    display: flex; 
    width: 100%; 
    font-size: 13px;
}
</style>