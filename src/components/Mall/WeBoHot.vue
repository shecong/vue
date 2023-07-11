<template>
  <div style="height: 820px;overflow: hidden;overflow-y: scroll;">
    <!-- <el-switch v-model="loading" /> -->
    <div style="justify-content: space-between;display: flex;">
      <el-link @click="change('换一换')" target="_blank"><i class="el-icon-refresh"></i>换一换</el-link>
      <el-link @click="change('切换')" target="_blank">切换<span style="color: red;">微博/百度</span>热搜</el-link>
    </div>
    <el-skeleton :rows="6" :loading="loading" animated />
    <div ref="hoecontent">
      <div v-for="(item, index) in baiduHot">
      <div class="grid-content" style="padding-top: 5px;font-size: 20px;text-wrap: nowrap;
}">
        <span
          style="font-size: 18px;width: 22px; height: 36px;line-height: 36px;background-size: 100% 100%;text-align: left;margin-right: 4px;top: 1px;">
          {{ index + 1 }}</span>
        <el-link :href="item.url" target="_blank">{{ item.word }}
        </el-link>
      </div>
    </div>
    </div>
    
  </div>
</template>


 

<script>
import axios from 'axios';
import request from '../../utils/request'
import { time } from 'echarts';

export default {
  name: "FirstPage",
  data() {
    return {
      baiduHot: [],
      weboHot: [],
      loading: true

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // //微博热搜
      // request.get('/webo/api/container/getIndex?containerid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot')
      //   .then(response => {
      //     // 请求成功的处理逻辑

      //     this.weboHot = response.data.data.realtime
      //     this.loading=false;
      //     console.log(this.weboHot);
      //   })
      //   .catch(error => {
      //     // 请求失败的处理逻辑
      //     console.error(error);
      //   });
      //百度热搜
      request.get('/baidu/getbaiduhot/')
        .then(response => {
          // 请求成功的处理逻辑 
          this.baiduHot = response.data.data
          this.loading = false;
          console.log(this.baiduHot);
        })
        .catch(error => {
          // 请求失败的处理逻辑
          console.error(error);
        });


    }, change(item) {
      if (item === "换一换") {
        this.loading = true;
        this.$refs.hoecontent.style.display = 'none';
        request.get('/baidu/getbaiduhot/')
          .then(response => {
            // 请求成功的处理逻辑 
            this.baiduHot = response.data.data
            this.loading = false;
            this.$refs.hoecontent.style.display = 'block';
            this.$message({
              message: '刷新成功！',
              type: 'success'
            });
          })
          .catch(error => {
            // 请求失败的处理逻辑
            console.error(error);
          });
      } else if (item === "切换") {
        const h = this.$createElement;
        this.$message({
          message: h('p', null, [
            h('span', null, '您点击了：'),
            h('i', { style: 'color: teal' }, '切换')
          ])
        });
      }
    }
  }, mounted() {

  }
}



</script>