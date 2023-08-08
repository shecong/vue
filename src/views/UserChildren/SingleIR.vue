<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="Websocket" name="first">
        <div class="index">
          <div class="container">
            <div class="header">
              <span class="title">消息发送通知</span>
              <span class="description"></span>
            </div>
            <div class="send-box">
              <input v-model="content" @keydown="sendMessageByEnter" />
              <span @click="sendMessage">发送</span>
            </div>
            <div class="message-container">
              <div class="message-content">
                <div class="message-text" v-for="(message, key) in messages" :key="key">{{ message }}</div>
              </div>
            </div>
            <text class="version">{{ version }}</text>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="IM聊天即时通讯" name="second">
         <router-view name="UserIMRouter"></router-view>
      </el-tab-pane>
    </el-tabs>

  </div>
</template> 
<script setup>
import { ref, onBeforeMount, inject } from 'vue';
import GoEasy from 'goeasy';
import { version } from '../../../package.json';

//即时通讯https://docs.goeasy.io/2.x/pubsub/get-start
const goEasy = GoEasy.getInstance({
  host: 'hangzhou.goeasy.io', //应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
  appkey: 'BC-31498816867c4859b5b652aa58a43b44', // common key,
  modules: ['pubsub'],
});

let messages = ref([]);
let content = ref('');

onBeforeMount(() => {
  //连接GoEasy
  connectGoEasy()
  //接收消息
  subscribe()
})

function connectGoEasy() {
  goEasy.connect({
    onProgress: function (attempts) {
      console.log("GoEasy is connecting", attempts);
    },
    onSuccess: function () {
      unshiftMessage("连接成功")
      console.log("GoEasy connect successfully.")
    },
    onFailed: function (error) {
      unshiftMessage("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
    }
  });
}

function subscribe() {
  goEasy.pubsub.subscribe({
    channel: "my_channel",
    onMessage: function (message) {
      unshiftMessage(message.content);
    },
    onSuccess: function () {
      unshiftMessage('订阅成功.');
    },
    onFailed: function (error) {
      unshiftMessage("订阅失败，错误编码：" + error.code + " 错误信息：" + error.content);
    }
  });
}

function sendMessageByEnter(event) {
  if (event.keyCode === 13) { // enter发送
    event.preventDefault();
    sendMessage();
  }
}

function sendMessage() {//发送消息
  if (content.value.trim() !== '') {
    //发送消息
    goEasy.pubsub.publish({
      channel: "my_channel",
      message: content.value,
      onSuccess: function () {
        content.value = "";
        console.log("send message success");
      },
      onFailed: function (error) {
        unshiftMessage("消息发送失败，错误编码：" + error.code + " 错误信息：" + error.content);
      }
    });
  }
}

function unshiftMessage(content) {
  let formattedTime = formatDate(new Date(), "hh:mm");
  let message = formattedTime + " " + content;
  messages.value.unshift(message);
}

function formatDate(date) {
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  return hours + ":" + minutes;
}
</script>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      activeName: 'first'
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }

  },
  created() { },
  mounted() { }
};
</script>
<style>
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

.version {
  color: #FFFFFF;
  text-align: center;
  line-height: 30px;
  font-size: 18px;
}
</style>
