<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="小游戏1" name="one">
        <div class="index">
           
        </div>
      </el-tab-pane> 
      <el-tab-pane label="小游戏2" name="two">
        <div class="index">
           
        </div>
      </el-tab-pane> 
      <el-tab-pane label="小游戏3" name="sthree">
        <div class="index">
           
        </div>
      </el-tab-pane> 
    </el-tabs>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      activeName: 'one',
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleClick(tab, event) {
    },
  },
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped> 
.index {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}

.container {
  width: 850px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #D02129;
}

.header .title {
  font-size: 22px;
  font-weight: bold;
}

.header .description {
  font-size: 24px;
  line-height: 25px;
}

.send-box {
  height: 40px;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.send-box input {
  width: 345px;
  height: 30px;
  background: #EFEFEF;
  border: 1px solid #C8C7CC;
  outline: none;
  border-radius: 6px;
}

.send-box span {
  margin-left: 20px;
  color: #D02129;
  text-align: right;
  cursor: pointer;
}

.message-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.message-content {
  margin-top: 15px;
  width: 700px;
  background-color: #FFFFFF;
  border: 1px solid #DADADA;
  height: 500px;
  font-size: 15px;
  overflow-y: auto;
  scrollbar-width: thin;
}

.message-content::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/*滚动条里面小方块*/
.message-content::-webkit-scrollbar-thumb {
  border-radius: 10px !important;
  background: #b6b6b6 !important;
}

.message-text {
  padding: 4px 11px;
} 
</style>