<template>
  <div class="box">
    <!-- 左侧拖拽组件 -->
    <!-- v-if="false" -->
    <div class="drap">
      <!-- <p>元素</p> -->
      <!-- 
            @dragstart  < -- 是元素开始拖拽的时候触发
            draggable="true"  < -- 为了使元素可拖动，把 draggable 属性设置为 true ：
            @dragover.prevent < -- 阻止浏览器默认行为，不然会显示一个叉叉，不好看, 加上会显示一个添加的符号
         -->
      <div
        v-for="(item, index) in drapLeftElList"
        class="drap-item"
        :key="index"
        @dragstart="handleDrapEvList($event, item)"
        @dragover.prevent
        draggable="true"
      >
        <img
          class="drap-item-img"
          draggable="false"
          :src="item.imgUrl"
          :alt="item.name"
        />
        <div class="drap-item-name">{{ item.name }}</div>
      </div>
    </div>
    <!-- 主体部分 -->
    <div
      class="drap-container"
      @dragover.prevent
      @mousedown="laryerMouseDown"
      @mousemove="laryerMouseMove"
      @mouseup="laryerMouseUp"
      @drop="handleDrap"
    >
      <h1>画布</h1>
      <div
        v-for="(component, index) in componentsList"
        class="drap-container-item"
        :class="{
          'drap-container-item-active':
            curControl && component.identifier == curControl.identifier,
        }"
        :key="index"
        :style="{
          top: `${component.position.y}px`,
          left: `${component.position.x}px`,
          width: `${component.position.w}px`,
          height: `${component.position.h}px`,
          'background-color': `${component.position.bg}`,
          borderWidth: component.style.borderWidth + 'px',
          borderStyle: component.style.borderStyle,
          borderColor: component.style.borderColor,
          borderRadius: component.style.radius + 'px',
        }"
        @mousedown.stop="handleMouseDown($event, component, index)"
      >
        <img
          class="drap-item-img"
          :src="component.imgUrl"
          draggable="false"
          :alt="component.name"
        />
        <div class="drap-item-name">{{ component.name }}</div>

 
      </div>
    </div>
    <!-- 属性配置 -->
    <div class="drap-right" style="width: 300px; height: 100%">
      <h2>属性配置</h2>
      <p>样式配置</p>
      <div v-if="curControl">
        <table>
          <tr>
            <td>宽度</td>
            <td>
              <el-input type="number" v-model="curControl.position.w" />
            </td>
          </tr>
          <tr>
            <td>高度</td>
            <td>
              <el-input type="number" v-model="curControl.position.h" />
            </td>
          </tr>
          <tr>
            <td>背景色</td>
            <td>
              <el-input type="color" v-model="curControl.position.bg" />
            </td>
          </tr>
          <tr>
            <td>边框大小</td>
            <td>
              <el-input type="number" v-model="curControl.style.borderWidth" />
            </td>
          </tr>
          <tr>
            <td>边框样式</td>
            <td>
              <el-select
                v-model="curControl.style.borderStyle"
                placeholder="请选择"
              >
                <el-option
                  label="solid"
                  value="solid"
                ></el-option>
                <el-option
                  label="dashed"
                  value="dashed"
                ></el-option>
                <el-option
                  label="dotted"
                  value="dotted"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>边框颜色</td>
            <td>
              <el-input type="color" v-model="curControl.style.borderColor" />
            </td>
          </tr>
          <tr>
            <td>圆角大小</td>
            <td>
              <el-input type="number" v-model="curControl.style.radius" />
            </td>
          </tr>
        </table>
      </div>
      identifier: {{ identifier }}
      <br />
      curControl: {{ curControl }}
      <br />
      {{ containerMoveObj }}
    </div> 
  </div>
</template>

<script>
export default {
  name: "drap",
  data() {
    return {
      // 保存拖拽的元素的列表
      componentsList: [
        {
          id: 11,
          name: "团队1",
          imgUrl:
            "https://img0.baidu.com/it/u=1604010673,2427861166&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
          sort: 1,
          identifier: 666,
          position: {
            x: 100,
            y: 100,
            w: 180,
            h: 320,
            bg: "#ffffff",
          },
          // 
          style: {
            borderWidth: 0,
            borderStyle: "solid",
            borderColor: "#000",
            radius: 0,
          },
          temp: {
            position: {
              x: 100,
              y: 100,
            },
          },
        },
      ],
      //   元件库
      drapLeftElList: [
        {
          id: 11,
          name: "团队1",
          imgUrl:
            "https://img0.baidu.com/it/u=1604010673,2427861166&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
          sort: 1,
          position: {
            x: 0,
            y: 0,
            w: 80,
            h: 120,
            bg: "#fff",
          },
          style: {
            borderWidth: 0,
            borderStyle: "solid",
            borderColor: "transparent",
            radius: 0,
          },
          temp: {
            position: {
              x: 0,
              y: 0,
            },
          },
        },
        {
          id: 13,
          name: "团队2",
          imgUrl:
            "https://img0.baidu.com/it/u=1604010673,2427861166&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
          sort: 2,
          position: {
            x: 0,
            y: 0,
            w: 80,
            h: 120,
            bg: "#fff",
          },
          style: {
            borderWidth: 0,
            borderStyle: "solid",
            borderColor: "transparent",
            radius: 0,
          },
          temp: {
            position: {
              x: 0,
              y: 0,
            },
          },
        },
        {
          id: 14,
          name: "团队3",
          imgUrl:
            "https://img0.baidu.com/it/u=1604010673,2427861166&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
          sort: 3,
          position: {
            x: 0,
            y: 0,
            w: 80,
            h: 120,
            bg: "#fff",
          },
          style: {
            borderWidth: 0,
            borderStyle: "solid",
            borderColor: "transparent",
            radius: 0,
          },
          temp: {
            position: {
              x: 0,
              y: 0,
            },
          },
        },
        {
          id: 15,
          name: "团队4",
          imgUrl:
            "https://img0.baidu.com/it/u=1604010673,2427861166&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
          sort: 3,
          position: {
            x: 0,
            y: 0,
            w: 80,
            h: 120,
            bg: "#fff",
          },
          style: {
            borderWidth: 0,
            borderStyle: "solid",
            borderColor: "transparent",
            radius: 0,
          },
          temp: {
            position: {
              x: 0,
              y: 0,
            },
          },
        },
      ],
      identifier: "", // 当前项的 唯一标识
      curControl: null, // 当前选择的组件
      flag: "", // 当前操作标识位
      containerMoveObj: {
        x: "",
        y: "",
      }, // 移动组件相关变量
      resizeItem: {
        startPx: 0,
        startPy: 0,
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      }, //resize组件 相关变量
    };
  },
  methods: {
    resizeMousedown(component, ev, index, type) {
      console.log(component, ev, index, type);
      this.flag = type;

      this.handleClickTarget(component, index);
      this.resizeItem.startPx = ev.pageX;
      this.resizeItem.startPy = ev.pageY;

      //记录初始信息-resize
      this.resizeItem.x = component.position.x;
      this.resizeItem.y = component.position.y;
      this.resizeItem.w = component.position.w;
      this.resizeItem.h = component.position.h;
    },

    // 点击画布的时候, 取消选择组件
    laryerMouseDown() {
      console.log("laryerMouseDown");
      this.curControl = null;
    },

    // 给画布绑定的mousemove事件
    laryerMouseMove(ev) {
      // 判断是需要移动的类型
      if (this.flag == "move") {
        // 用当前移动的距离减去点击的位置
        let dx = ev.pageX - this.containerMoveObj.x,
          dy = ev.pageY - this.containerMoveObj.y;

        // 上次旧的位置加上 处理完的距离就得到当前位置
        let x = this.curControl.temp.position.x + dx,
          y = this.curControl.temp.position.y + dy;
        // 这里只是让元素跟着鼠标移动, 如果再这里直接赋值
        this.curControl.position.x = x;
        this.curControl.position.y = y;
        // 判断是需要改变元素大小
      } else if (this.flag.includes("resize")) {
        console.log("resize,---", this.flag);
        switch (this.flag) {
          case "resize-rt":
            const { pageX, pageY } = ev;
            let dx = pageX - this.resizeItem.startPx,
              dy = pageY - this.resizeItem.startPy;

            this.curControl.position.w = this.resizeItem.w + dx;
            this.curControl.position.h = this.resizeItem.h + dy;
            console.log(dx, dy);

            break;
        }
      }
    },

    // 给画布绑定的mouseup事件
    laryerMouseUp() {
      // 在鼠标抬起的时候判断是否
      if (this.flag == "") {
        return false;
      }
      if ((this.flag = "move")) {
        const x = this.curControl.position.x;
        const y = this.curControl.position.y;
        // 这里才是实际给元素位置赋值的地方！！！！
        // 查询是否有对应的模块然后, 对应的赋值
        this.componentsList.forEach((item) => {
          if (item.identifier == this.identifier) {
            console.log(item, "找到了");

            item.temp.position.x = x;
            item.temp.position.y = y;

            item.position.x = x;
            item.position.y = y;
          }
        });
      } else if (this.flag.includes("resize")) {
      }

      this.flag = "";
    },

    // 拖拽元素
    handleDrapEvList(event, value) {
      let { offsetX, offsetY } = event;
      var infoJson = JSON.stringify({
        ...value,
        position: {
          ...value.position,
          x: offsetX,
          y: offsetY,
        },
      });
      //   将数据绑定到dataTransfer身上
      event.dataTransfer.setData("drapData", infoJson);
      //   console.log(
      //     "🚀 ~ file: index.vue ~ line 58 ~ handleDrapEvList ~ ev, value",
      //     event,
      //     value
      //   );
    },

    // 监听拖拽元素结束
    handleDrap(event) {
      event.preventDefault();
      const value = event.dataTransfer.getData("drapData");
      //   获取绑定到拖拽元素身上的 drapData属性
      if (value) {
        let drapData = JSON.parse(value);
        const { position } = drapData;
        const identifier = Math.floor(Math.random() * 10000);
        this.componentsList.push({
          ...drapData,
          identifier,
          position: {
            ...position,
            x: event.offsetX - position.x,
            y: event.offsetY - position.y,
          },
          temp: {
            position: {
              x: event.offsetX - position.x,
              y: event.offsetY - position.y,
            },
          },
        });
      }
    },

    // 点击元素获取组件配置
    handleClickTarget(row, index) {
      console.log(row);
      this.identifier = row.identifier;
      this.curControl = row;
    },

    // 移动元素
    handleMouseDown(e, row, index) {
      this.flag = "move";
      // 获取组件配置, 为接下来的属性配置做准备
      this.handleClickTarget(row, index);
      e = e || window.event;

      // 记录下当前点击的位置

      this.containerMoveObj.x = e.pageX;
      this.containerMoveObj.y = e.pageY;
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  height: 500px;
  .drap {
    width: 300px;
    height: 500px;
    background: #f2f2f2;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    cursor: pointer;
    .drap-item {
      height: 120px;
      margin-right: 20px;
      .drap-item-img {
        display: block;
        width: 80px;
        height: 80px;
      }
      .drap-item-name {
        text-align: center;
      }
    }
  }
  .drap-container {
    flex: 1;
    height: 100vh;
    background: #ccc;
    position: relative;

    .drap-container-item {
      -webkit-user-select: none;
      -moz-user-select: none;
      -o-user-select: none;
      user-select: none;
      position: absolute;
      user-select: none;
      cursor: pointer;
      border: 1px solid transparent;
      .drap-item-img {
        display: block;
        width: 100%;
        // height: 80px;
        user-select: none;
      }
      .drap-item-name {
        text-align: center;
      }

      .resize-icon {
        position: absolute;
        height: 10px;
        width: 10px;
        background-color: white;
        border: 1px solid #0cf;
        // cursor: nwse-resize;
        border-radius: 50%;
      }

      .resize-left-top {
        left: -15px;
        top: -15px;
        cursor: nwse-resize;
      }

      .resize-left-center {
        left: -15px;
        top: 50%;
        margin-top: -10px;
        cursor: ew-resize;
      }

      .resize-left-bottom {
        left: -15px;
        bottom: -15px;
        cursor: nesw-resize;
      }

      .resize-right-top {
        right: -15px;
        top: -15px;
        cursor: nesw-resize;
      }

      .resize-right-center {
        right: -15px;
        top: 50%;
        margin-top: -10px;
        cursor: ew-resize;
      }

      .resize-right-bottom {
        right: -15px;
        bottom: -15px;
        cursor: nwse-resize;
      }

      .resize-center-top {
        top: -15px;
        left: 50%;
        margin-left: -10px;
        cursor: ns-resize;
      }

      .resize-center-bottom {
        bottom: -15px;
        left: 50%;
        margin-left: -10px;
        cursor: ns-resize;
      }
    }
    .drap-container-item-active {
      border: 1px solid skyblue;
    }
  }
}
</style>
