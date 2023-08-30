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

          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="IM聊天即时通讯" name="second">
        <router-view name="UserIMRouter"></router-view>
      </el-tab-pane>
    </el-tabs>

  </div>
</template> 
<script>
import GoEasy from 'goeasy';

export default {
  components: {},
  props: {

  },
  data() {
    return {
      messages: sessionStorage.getItem('messages') == null ? [] : sessionStorage.getItem('messages').split(','),
      content: '',
      activeName: 'first',

    };
  },
  watch: {},
  beforeCreate() {

  },
  computed: {
  },
  methods: {

    connectGoEasy() {
      const vm = this;

      this.goEasyIM.connect({
        id: "01",
        onProgress: function (attempts) {
          console.log("GoEasy is connecting", attempts);
        },
        onSuccess: function () {
          
          vm.unshiftMessage("连接成功")
          console.log("GoEasy connect successfully.")
        },
        onFailed: function (error) {
          vm.unshiftMessage("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
        }
      });

    }, subscribe() {
      const vm = this;
      this.goEasyIM.pubsub.subscribe({
        channel: "my_channel",
        onMessage: function (message) {
          vm.unshiftMessage(message.content);
        },
        onSuccess: function () {
          vm.unshiftMessage('订阅成功.');
        },
        onFailed: function (error) {
          vm.unshiftMessage("订阅失败，错误编码：" + error.code + " 错误信息：" + error.content);
        }
      });
    }, sendMessage() {
      const vm = this;
      //发送消息
      if (this.content.trim() !== '') {
        try {
          //发送消息
          vm.goEasyIM.pubsub.publish({
            channel: "my_channel",
            message: this.content,
            onSuccess: function () {
              this.content = "";
              console.log("send message success");
            },
            onFailed: function (error) {
              vm.unshiftMessage("消息发送失败，错误编码：" + error.code + " 错误信息：" + error.content);
            }
          });
        } catch (error) {
          // 连接GoEasy
          if (this.goEasyIM.getConnectionStatus() === 'disconnected') {
            this.connectGoEasy();  //连接goeasy
          }
          // 接收消息
          this.subscribe();
          //重新触发当前方法
          this.sendMessage();
        }

      }
      //清空消息
      this.content = '';
    },
    unshiftMessage(content) {
      let formattedTime = this.formatDate(new Date(), "hh:mm");
      let message = formattedTime + " " + content;  
      this.messages.unshift(message); 
      sessionStorage.setItem('messages', this.messages);
    },
    sendMessageByEnter(event) {
      if (event.keyCode === 13) { // enter发送
        event.preventDefault();
        this.sendMessage();
      }
    }, formatDate(date) {
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      return hours + ":" + minutes;
    },
    handleClick(tab, event) {
    },


  },
  created() {


    try {
      // 连接GoEasy
      if (this.goEasyIM.getConnectionStatus() === 'disconnected') {
        this.connectGoEasy();  //连接goeasy
      }
      // 接收消息
      this.subscribe();
    } catch (error) {
      this.$router.replace(this.$route.path)
    }




  },
  mounted() {

  }
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
