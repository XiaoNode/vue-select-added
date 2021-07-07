<template>
  <div
    class="me-select-input"
    :class="{ readonly: readOnly }"
    ref="selectinput"
  >
    <a-popover
      placement="bottomLeft"
      trigger="click"
      v-if="!readOnly"
      v-model="visible"
    >
      <div slot="content" :style="{ width: divWidth + 'px' }">
        <div class="open">
          <a-input
            :placeholder="searchText"
            v-model="searchVal"
            :allowClear="true"
            @change="goSearch"
            ref="selectadded"
          >
            <a-icon slot="prefix" type="search" />
          </a-input>
        </div>
        <div class="allval me-pt-2 outer1" v-if="searchVal == ''">
          <ul class="scrollbar">
            <li
              v-for="item in items"
              :key="item"
              :class="{ active: selectValue.includes(item) }"
              @click="addOrRemoveItem(selectValue.includes(item), item)"
            >
              {{ item }}
              <a-icon
                slot="prefix"
                class="me-fr"
                type="check"
                v-if="selectValue.includes(item)"
              />
            </li>
          </ul>
        </div>
        <div class="searchval me-pt-2" v-else>
          <div v-if="searchResult.length != 0">
            <ul>
              <li
                v-for="(item, index) in searchResult"
                :key="item + index"
                :class="{ active: selectValue.includes(item) }"
                @click="addOrRemoveItem(selectValue.includes(item), item)"
              >
                {{ item }}
                <a-icon
                  slot="prefix"
                  class="me-fr"
                  type="check"
                  v-if="selectValue.includes(item)"
                />
              </li>
            </ul>
          </div>
          <div v-else class="me-pb-2 me-pt-2">
            {{ searchResultText }}
          </div>
        </div>
        <div class="additem">
          <h3 class="hand" @click="addtemping = !addtemping">
            <a-icon type="plus" class="me-status-link" />
            {{ addItemButtonText }}
          </h3>
          <div class="addinput me-pr-2" v-if="addtemping">
            <a-space>
              <a-input
                :placeholder="addItemText"
                v-model="addtemp"
                :allowClear="true"
                :style="{ width: divWidth - 50 + 'px' }"
              >
              </a-input>
              <a-icon type="check" class="hand" @click="pushTemp" />
              <a-icon
                type="close"
                class="hand"
                @click="
                  addtemp = '';
                  addtemping = false;
                "
              />
            </a-space>
          </div>
          <div v-if="tempValue.length != 0" class="me-pt-2">
            <ul>
              <li
                v-for="item in tempValue"
                :key="item"
                :class="{ active: selectValue.includes(item) }"
                @click="addOrRemoveItem(selectValue.includes(item), item)"
              >
                {{ item }}
                <a-icon
                  slot="prefix"
                  class="me-fr"
                  type="check"
                  v-if="selectValue.includes(item)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="input" @click.self="openDialog">
        <span class="span" v-if="!multiple">{{ selectValue[0] || "" }}</span>
        <div v-else class="tags">
          <transition-group name="list" tag="div">
            <a-tag
              closable
              @close="addOrRemoveItem(true, item)"
              v-for="item in selectValue"
              :key="item"
            >
              {{ item }}
            </a-tag>
          </transition-group>
        </div>
      </div>
    </a-popover>
    <div
      class="input"
      @click.self="openDialog"
      :class="{ readonly: readOnly }"
      v-else
    >
      <span class="span" v-if="!multiple">{{ selectValue[0] || "" }}</span>
      <div v-else class="tags">
        <a-tag
          :closable="!readOnly"
          v-for="item in selectValue"
          :key="item"
          :class="{ readonlyclose: readOnly }"
        >
          {{ item }}
        </a-tag>
      </div>
    </div>
  </div>
</template>

<script>
import { without, indexOf } from "lodash";
export default {
  model: {
    prop: "product",
    event: "input",
  },
  props: {
    product: {
      prop: Array,
      default: [],
    },
    allArr: {
      prop: Array,
      default: [],
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    searchText: {
      type: String,
      default: "请输入",
    },
    searchResultText: {
      type: String,
      default: "未搜索到相关内容",
    },
    addItemButtonText: {
      type: String,
      default: "添加一个新属性值",
    },
    addItemText: {
      type: String,
      default: "添加一个新项",
    },
  },
  mounted() {
    this.$data.items = this.$props.allArr;
    this.$data.selectValue = this.$props.product;

    this.$data.divWidth = this.$refs.selectinput.clientWidth - 32;
  },
  data: () => ({
    visible: false,
    items: [],
    selectValue: [],
    searchVal: "",
    open: false,
    searchResult: [],
    tempValue: [], // 添加的新属性
    addtemp: "",
    addtemping: false,
    divWidth: 0,
  }),
  methods: {
    openDialog() {
      this.$data.open = !this.$data.open;
    },
    addOrRemoveItem(flag, item) {
      // flag== true, remove item
      const { multiple } = this.$props;
      if (multiple) {
        if (flag) {
          this.$data.selectValue = without(this.$data.selectValue, item);
        } else {
          this.$data.selectValue.push(item);
        }
      } else {
        if (flag) {
          this.$data.selectValue = [];
        } else {
          this.$data.selectValue = [];
          this.$data.selectValue.push(item);
          this.hidePopover();
        }
      }
      this.syncData();
    },
    goSearch() {
      const { items, searchVal, tempValue } = this.$data;
      const allItems = items.concat(tempValue);
      this.$data.searchResult = [];
      if (searchVal) {
        setTimeout(() => {
          allItems.map((ele) => {
            if (ele.toString().indexOf(searchVal) > -1) {
              this.$data.searchResult.push(ele);
            }
          });
        }, 500);
      }
    },
    addTempInput() {
      this.$data.addtemping = true;
    },
    // 添加一个新属性
    pushTemp() {
      const { items, selectValue, tempValue, addtemp } = this.$data;
      if (addtemp) {
        // items是否包含新输入项
        const itemsContain = indexOf(items, addtemp) > -1 ? true : false;
        // tempValue是否包含新输入项
        const tempValueContain =
          indexOf(tempValue, addtemp) > -1 ? true : false;
        // 已勾选的selectValue是否包含新输入项
        const selectValueContain =
          indexOf(selectValue, addtemp) > -1 ? true : false;

        if (!itemsContain && !tempValueContain) {
          this.tempValue.push(addtemp);
        }
        if (itemsContain && !selectValueContain) {
          this.selectValue.push(addtemp);
        }
        this.$data.addtemp = "";
        this.$data.addtemping = false;

        this.syncData();
      }
    },
    onVisibleChange(visible) {},
    syncData() {
      this.$emit("input", this.$data.selectValue);
    },
    hidePopover() {
      this.$data.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
$primaryColor: #4c86ff;
$linkColor: #4c86ff;
.me-select-input {
  position: relative;
  .input {
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    line-height: 23px;
    cursor: pointer;
    background: #fff;
    min-height: 33px;
    padding-bottom: 4px;
    &:focus {
      border: 1px solid $primaryColor;
    }
    .span {
      padding-left: 10px;
      display: inline-block;
      padding-top: 3px;
      font-size: 16px;
    }
  }
  .tags {
    padding: 1px 3px;
  }
}
.additem,
.searchval,
.allval {
  max-height: 400px;
  overflow-y: auto;
  margin-right: -16px;
  ul {
    padding-left: 0px;
  }
  li {
    padding: 8px 5px;
    font-size: 14px;
    line-height: 16px;
    color: #333;
    word-break: break-word;
    word-wrap: break-word;
    list-style: none;
    cursor: pointer;
    margin-right: 15px;
    &:hover {
      color: #333;
      background-color: rgba(0, 0, 0, 0.04);
    }
    &.active {
      color: $primaryColor;
    }
  }
}
.additem {
  border-top: 1px solid #e8e8e8;
  h3 {
    height: 35px;
    line-height: 35px;
    color: $linkColor;
    margin-bottom: 0px;
  }
}
.hand {
  cursor: pointer;
}
.me-pb-2 {
  padding-bottom: 10px;
}
.me-pt-2 {
  padding-top: 10px;
}
.me-pt-1 {
  padding-top: 5px;
}
.me-pr-2 {
  padding-right: 10px;
}
.me-pr-1 {
  padding-right: 5px;
}
.me-status-skip {
  color: #a8a8b3;
  font-size: 12px;
}
.me-fr {
  float: right;
}
.readonly {
  cursor: no-drop !important;
  background: #f3f2f2 !important;
}
.readonlyclose {
  cursor: no-drop !important;
}
.scrollbar {
  margin: 0 auto;
}
.outer1::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.outer1::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(39, 38, 38, 0.8);
  background: #535353;
}
.outer1::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
.list-enter-active,
.list-leave-active {
  transition: opacity .5s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
}
</style>
