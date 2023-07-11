<template>
    <div>
        <el-container>
            <el-header>
                <el-menu :default-active="activeIndex" class="el-menu-header" style="justify-content: space-around;
    display: flex;" mode="horizontal" @select="handleSelect">
                    <el-menu-item @click="ClickRefresh('热门')" title="热门" index="1">热门</el-menu-item>
                    <el-menu-item @click="ClickRefresh('榜单')" title="榜单" index="2">榜单</el-menu-item>
                    <el-menu-item @click="ClickRefresh('明星')" title="明星" index="3">明星</el-menu-item>
                    <el-menu-item @click="ClickRefresh('搞笑')" title="搞笑" index="4">搞笑</el-menu-item>
                    <el-menu-item @click="ClickRefresh('情感')" title="情感" index="5">情感</el-menu-item>
                    <el-menu-item @click="ClickRefresh('周末')" title="热门" index="6">周末</el-menu-item>
                    <el-submenu index="7">
                        <template slot="title">More</template>
                        <el-menu-item index="7-1">选项1</el-menu-item>
                        <el-menu-item index="7-2">选项2</el-menu-item>
                        <el-menu-item index="7-3">选项3</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-header>
            <el-main>
                <el-skeleton :rows="6" :loading="headloading" animated />
                <div class="infinite-list-wrapper" style="overflow:auto" ref="hotmain">
                    <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
                        <li v-for="i in count" class="list-item">
                            <div class="webo-head">
                                <div style="justify-content: space-around;display: flex;">
                                    <div class="webo-head-avatar list-item-div" style="width: 3.25rem;height: 3.25rem;">
                                        <img src="../../assets/logo.png" alt="">
                                    </div>
                                    <div class="list-item-div">
                                        <div class="list-title-name">时光旅行者
                                            <span class="woo-icon-vipimg">
                                                <img src="https://h5.sinaimg.cn/upload/108/1866/2022/11/02/vip_6.png"
                                                    class="woo-icon-vipimg"></span>
                                        </div>
                                        <div class="list-title-info">
                                            <div style="color: #939393;margin-right: 3px;">一天前</div>
                                            <div style="color: #939393;">永旺前行，不负时光</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="list-item-div" style="padding-top: 12px;">
                                    <el-button round style="color: #ff8200;border: 1px solid #ff8200;padding: 6px 11px;">
                                        <span class="" style=""><i class="el-icon-plus"></i>关注</span>
                                    </el-button>
                                </div>
                            </div>
                            <div class="weob-container">
                                <div class="detail-text "> 
                                    这样的男生不可能是渣男<br><br>

1.穿衣服不是黑色就是白色<br>
2.经常不发朋友圈，从来不自拍<br>
3.长时间你怎么换头像<br>
4.会把情绪写下脸上，为人心直口快<br>
5.女生碰他一下都会自动保持距离<br>
6.从来不去酒吧夜店的<br>
7.不忙的时候随叫随到，信息秒回<br>
8. 除了有点直男不浪漫，抢着买单从不犹豫<br>
9.直男毛病改不了，但是真的爱你，也照顾你的情绪<br>
                                </div>
                                <div class="detail-picture" style="height: 100px;width: 100%;overflow: hidden;    display: flex;
    justify-content: start;">
                                     <img @click="pictureFunction('https://img0.baidu.com/it/u=1879638641,2189704731&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=979')" 
                                     src="https://img0.baidu.com/it/u=1879638641,2189704731&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=979" style=" 
    height: 144%;
    cursor: zoom-in;padding:0px 10px;display: flex;" alt="">
    <img @click="pictureFunction('https://img1.artron.net/auction/2012/art502875/d/art5028750576.jpg')" 
    src="https://img1.artron.net/auction/2012/art502875/d/art5028750576.jpg" style=" 
    height: 144%;
    cursor: zoom-in;padding:0px 10px;display: flex;" alt="">
    <img @click="pictureFunction('https://img0.baidu.com/it/u=3353722478,1897885792&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=967')" 
    src="https://img0.baidu.com/it/u=3353722478,1897885792&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=967" style=" 
    height: 144%;
    cursor: zoom-in;padding:0px 10px;display: flex;" alt="">
                                </div>
                                <div  class="detail-movie">

                                </div>
                            </div>
                            <div class="weob-foot">
                                <div style="justify-content: space-around;display: flex;color: grey; cursor: pointer;">
                                    <div @click="footFunction('分享')"><i class="el-icon-share"
                                            title="分享"></i><span>120</span></div>
                                    <div @click="footFunction('评论', i)"><i class="el-icon-s-comment"
                                            title="评论"></i><span>360</span></div>
                                    <div @click="footFunction('点赞')"><i class="el-icon-s-custom"
                                            title="点赞"></i><span>231</span></div>
                                </div>
                                <div class="wb-comment-container" v-if="visibleIndex === i" :key="i">
                                    <div>
                                        <el-divider style="    display: block;
    height: 1px;
    width: 88%;
    margin: auto;
    margin-top: 10px;"></el-divider>
                                        <div class="wb-tab3">
                                            <div class="item" style="">按倒序</div>
                                            <div class="item">按正序</div>
                                            <div class="item">按热度</div>
                                        </div>
                                        <div>
                                            <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
                                                <li v-for="i in count1" class="list-item">
                                                    <div class="webo-head">
                                                        <div
                                                            style="justify-content: space-around;display: flex;padding: 7px 20px;">
                                                            <div class="webo-head-avatar list-item-div"
                                                                style="width: 2.125rem;height: 2.125rem;">
                                                                <img src="../../assets/logo.png" alt="">
                                                            </div>
                                                            <div class="list-item-chrild-div">
                                                                <div class="list-title-chrild-name">时光旅行者
                                                                    <span>
                                                                        <img src="https://h5.sinaimg.cn/upload/108/1866/2022/11/02/vip_6.png"
                                                                            class="woo-icon-vipimg">:</span>
                                                                    <div
                                                                        style="color: #939393; display: flex;    padding: 10px 20px;">
                                                                        永旺前行，不负时光，
                                                                        努力奋斗，追逐梦想的光芒。
                                                                        脚步稳健，勇往直前，
                                                                        挑战困难，向前进发的决心。
                                                                        珍惜每分每秒，把握当下，
                                                                        用智慧和实力，创造美好未来的航向。
                                                                        无论风雨如何，永远坚定不移，
                                                                        让时光见证我们的成长与辉煌。
                                                                    </div>
                                                                    <div
                                                                        style="justify-content: space-between;display: flex;">
                                                                        <div>
                                                                            <span style="color:#939393;">23-6-30
                                                                                00:05</span>
                                                                            <span
                                                                                style="margin-left: 8px;color:#939393;">来自安徽</span>
                                                                        </div>
                                                                        <div>
                                                                            <div
                                                                                style="justify-content: space-around;display: flex;color: grey; cursor: pointer;">
                                                                                <div @click="footFunction1('分享')"
                                                                                    class=" wb-tab3-function"><i
                                                                                        class="el-icon-share"
                                                                                        title="分享"></i><span>120</span>
                                                                                </div>
                                                                                <div @click="footFunction1('评论')"
                                                                                    class=" wb-tab3-function"><i
                                                                                        class="el-icon-s-comment"
                                                                                        title="评论"></i><span>360</span>
                                                                                </div>
                                                                                <div @click="footFunction1('点赞')"
                                                                                    class=" wb-tab3-function"><i
                                                                                        class="el-icon-s-custom"
                                                                                        title="点赞"></i><span>231</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
            count1: 3,
            loading: false,
            activeIndex: '1',
            visibleIndex: null,
            headloading: false
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
        }, ClickRefresh(item) {
            this.$refs.hotmain.style.display = 'none';
            this.headloading = true;
            //模拟刷新效果
            this.timer = setTimeout(() => {   //设置延迟执行 
                this.headloading = false;
                this.$refs.hotmain.style.display = 'block';
            }, 1000);
        }, footFunction(item, i) {
            if (item === "评论") {
                if (this.visibleIndex === i) {
                    this.visibleIndex = null;
                } else {
                    this.visibleIndex = i;
                }
            } else if (item === "分享") {
                const shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href);
                window.open(shareUrl, '_blank');
            } else {
                const h = this.$createElement;
                this.$message({
                    message: h('p', null, [
                        h('span', null, '您点击了：'),
                        h('i', { style: 'color: teal' }, item)
                    ])
                });
            }
        }, handleSelect(key, keyPath) {
            //微博导航栏
            console.log(key, keyPath);
        },pictureFunction(src){
            window.open(src)
        }
    }
}
</script>

<style lang="less" scoped>
.el-container {
    margin: 0px 15px;
}

.el-header {
    padding: 0 0px;
}

.el-menu-header {

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
    //display: flex;
    align-items: center;
    justify-content: center;
    background: #e8f3fe;
    color: black;
    margin-bottom: 10px;
    width: 100%;

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

.webo-head-avatar {
    display: flex;
}

.webo-head-avatar img {
    width: 100%;
    height: 100%;
}

.woo-icon-vipimg {
    height: 80%;
    width: auto;
}

.list-title-name {
    height: 21px;
    display: flex;
    font-size: 15px;
    width: 100%;
    margin-bottom: 3px;
    font-size: 15px;
    color: black;
    font-weight: bold;
}

.list-title-info {
    height: 21px;
    display: flex;
    width: 100%;
    font-size: 13px;
}

.list-title-chrild-name {
    width: 100%;
    line-height: 22px;
    font-size: 13px;
    letter-spacing: .1px;

    .woo-icon-vipimg {
        width: 14px;
        height: 14px;
    }
}

.wb-tab3 {
    display: flex;
    justify-content: flex-start;

    .item {
        padding: 14px 15px;
        font-size: 14px;
        color: #333;
        color: var(--w-main);
        cursor: pointer;
    }
}


.wb-tab3-function {
    margin-right: 10px;
}


.weob-container{
    padding:0 62px;
}
</style>