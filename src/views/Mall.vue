<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="grid-content">
                    <el-button type="primary" @click="clickOpenHidden">{{ isOpen ?  '展开': '折叠' }}</el-button>
                    <div class="thumb-example" ref="openBox">
                        <!-- swiper1 -->
                        <swiper class="swiper gallery-top" :options="swiperOptionTop" ref="swiperTop">
                            <swiper-slide class="slide-1"></swiper-slide>
                            <swiper-slide class="slide-2"></swiper-slide>
                            <swiper-slide class="slide-3"></swiper-slide>
                            <swiper-slide class="slide-4"></swiper-slide>
                            <swiper-slide class="slide-5"></swiper-slide>
                            <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
                            <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
                        </swiper>
                        <!-- swiper2 Thumbs -->
                        <swiper class="swiper gallery-thumbs" :options="swiperOptionThumbs" ref="swiperThumbs">
                            <swiper-slide class="slide-1"></swiper-slide>
                            <swiper-slide class="slide-2"></swiper-slide>
                            <swiper-slide class="slide-3"></swiper-slide>
                            <swiper-slide class="slide-4"></swiper-slide>
                            <swiper-slide class="slide-5"></swiper-slide>
                        </swiper>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <div class="grid-content bg-purple post-entry-1 lg">
                    <div class="headlogo"><img src="../Content/Mall/bglb0006.jpg" alt=""></div>
                    <div class="post-meta"><span class="date">Culture</span> <span class="mx-1">•</span> <span>Jul 5th
                            '22</span></div>
                    <h2><a href="#">11 Work From Home Part-Time Jobs You Can Do Now</a></h2>
                    <p class="mb-4 d-block">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero temporibus
                        repudiandae, inventore pariatur numquam cumque possimus exercitationem? Nihil tempore odit ab minus
                        eveniet praesentium, similique blanditiis molestiae ut saepe perspiciatis officia nemo, eos quae
                        cumque. Accusamus fugiat architecto rerum animi atque eveniet, quo, praesentium dignissimos</p>

                    <div class="d-flex align-items-center author">
                        <div class="photo"><img src="../assets/logo.gif" alt="" class="img-fluid"></div>
                        <div class="name">
                            <h3 class="m-0 p-0">sc_piter</h3>
                        </div>
                    </div>

                </div>
            </el-col>
            <el-col :span="18">
                <div class="grid-content">
                    <el-col :span="18">
                        <div class="grid-content">
                            <div class="center-title-contianer">
                                <WeBoMain />
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple-light">
                            <WeBoHot />
                        </div>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <el-backtop title="滑动到顶部"></el-backtop>
      
    </div>
</template>
 

<script>

// 局部引入 vue-awesome-swiper 及其样式
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import WeBoMain from '../components/Mall/WeBoMain.vue'
import WeBoHot from '@/components/Mall/WeBoHot.vue'

export default {
    name: 'swiper-example-thumbs-gallery',
    title: 'Thumbs gallery with Two-way control',
    components: {
        swiper,
        WeBoMain,
        swiperSlide,
        WeBoHot
    },
    data() {
        return {
            swiperOptionTop: {
                loop: true,
                loopedSlides: 5, // looped slides should be the same
                spaceBetween: 10,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            },
            swiperOptionThumbs: {
                loop: true,
                loopedSlides: 5, // looped slides should be the same
                spaceBetween: 10,
                centeredSlides: true,
                slidesPerView: 'auto',
                touchRatio: 0.2,
                slideToClickedSlide: true
            },isOpen: false, // 是否展开下方折叠内容
			openHeight: 0, // 折叠面板内容初始高度
        }
    },
    mounted() {
        this.$nextTick(() => {
            const swiperTop = this.$refs.swiperTop.swiper
            const swiperThumbs = this.$refs.swiperThumbs.swiper
            swiperTop.controller.control = swiperThumbs
            swiperThumbs.controller.control = swiperTop
        })
    },methods:{
        // 展开折叠
		clickOpenHidden() {
			this.isOpen = !this.isOpen
			
			let openBox = this.$refs.openBox
			let boxheight = openBox.offsetHeight
            
			if(boxheight === this.openHeight) { //展开
				openBox.style.height = 'auto'
				boxheight = openBox.offsetHeight
				openBox.style.height = '480px' 
				let f = document.body.offsetHeight  // 必加 (不知道具体是为什么必加, 测试时发现若不加在展开时候会没有过渡效果) 
				openBox.style.height = '480px'
			} else { //折叠
				openBox.style.height = this.openHeight + 'px'
			}
		},
    }
}

</script> 

<style lang="less" scoped>
//标准样式
.el-row {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}

//标准样式

//轮播图部分 
.thumb-example {
    height: 480px;
    background-color: black;
    overflow: hidden;
    transition: height 0.5s ease-in-out; //动画效果
		background: transparent;
		box-sizing: border-box;

		.content {
			margin-top: 16px;
			background: darkslategray;
		}
}

.swiper {
    .swiper-slide {
        background-size: cover;
        background-position: center;

    }

    &.gallery-top {
        height: 80%;
        width: 100%;
    }

    &.gallery-thumbs {
        height: 20%;
        box-sizing: border-box;
        padding: 0;
    }

    &.gallery-thumbs .swiper-slide {
        width: 25%;
        height: 100%;
        opacity: 0.4;
    }

    &.gallery-thumbs .swiper-slide-active {
        opacity: 1;
    }
}

&.slide-1 {
    background-image: url('../Content/Mall/bglb0001.jpg');
}

&.slide-2 {
    background-image: url('../Content/Mall/bglb0002.jpg');
}

&.slide-3 {
    background-image: url('../Content/Mall/bglb0003.jpg');
}

&.slide-4 {
    background-image: url('../Content/Mall/bglb0004.jpg');
}

&.slide-5 {
    background-image: url('../Content/Mall/bglb0005.jpg');
}

//轮播图部分


///headlogo部分 
.headlogo img {
    max-width: 100%;
    height: auto;
}

a:hover {
    color: var(--color-links-hover);
    text-decoration: none;
}

.post-entry-1 {
    margin-bottom: 30px;
}

.post-entry-1 img {
    margin-bottom: 30px;
}

.post-entry-1 h2 {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.2;
    font-weight: 500;
}

.post-entry-1 h2 a {
    color: var(--color-black);
}

.post-entry-1.lg h2 {
    font-size: 40px;
    line-height: 1;
}

.post-meta {
    font-size: 11px;
    letter-spacing: 0.07rem;
    text-transform: uppercase;
    font-weight: 600;
    font-family: var(--font-secondary);
    color: rgba(var(--color-black-rgb), 0.4);
    margin-bottom: 10px;
}

///headlogo部分 

///webo部分

//
</style>