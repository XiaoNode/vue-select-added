<template>
  <div class="me-select-input">
    <a-popover
      placement="bottomLeft"
      trigger="click"
      overlayClassName="popoverbox"
      @visibleChange="onVisibleChange"
    >
      <div slot="content">
        <div class="open">
          <a-input
            placeholder="search"
            v-model="searchVal"
            :allowClear="true"
            @change="goSearch"
            ref="selectadded"
          >
            <a-icon slot="prefix" type="search" />
          </a-input>
        </div>
        <div class="allval" v-if="searchVal == ''">
          <ul>
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
        <div class="searchval" v-else>
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
            未搜索到相关结果
          </div>
        </div>
        <div class="additem">
          <h3 class="hand" @click="addtemping = !addtemping">
            <a-icon type="plus" class="me-status-link" />
            添加一个新属性值
          </h3>
          <div class="addinput" v-if="addtemping">
            <a-space>
              <a-input
                placeholder="添加一个新属性值"
                v-model="addtemp"
                :allowClear="true"
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
          <div v-if="tempValue.length != 0">
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
        <ul>
          <li v-for="item in selectValue" :key="item">
            <span class="me-pr-1"> {{ item }} </span>
            <a-icon
              type="close"
              class="hand me-status-skip me-fr me-pt-1"
              @click.stop="addOrRemoveItem(true, item)"
            />
          </li>
        </ul>
      </div>
    </a-popover>
  </div>
</template>

<script>
import { without, indexOf } from "lodash";
export default {
  // model: {
  //   prop: 'items',
  //   event: 'input'
  // },
  props: {
    allArr: {
      type: Array,
    },
    checkArr: {
      type: Array,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.$data.items = this.$props.allArr;
    this.$data.selectValue = this.$props.checkArr;
  },
  data: () => ({
    items: [],
    selectValue: [],
    searchVal: "",
    open: false,
    searchResult: [],
    tempValue: [], // 添加的新属性
    addtemp: "",
    addtemping: false,
  }),
  methods: {
    openDialog() {
      this.$data.open = !this.$data.open;
    },
    addOrRemoveItem(flag, item) {
      if (flag) {
        this.$data.selectValue = without(this.$data.selectValue, item);
      } else {
        this.$data.selectValue.push(item);
      }
      this.syncData();
    },
    goSearch() {
      const { items, searchVal } = this.$data;
      this.$data.searchResult = [];
      if (searchVal) {
        setTimeout(() => {
          items.map((ele) => {
            if (ele.indexOf(searchVal) > -1) {
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
  },
};
</script>

<style lang="scss" scoped>
$primaryColor: #ff6b38;
$linkColor: #4c86ff;
.me-select-input {
  position: relative;
  .input {
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    line-height: 32px;
    height: 32px;
    cursor: pointer;
    background: #fff;
    &:focus {
      border: 1px solid $primaryColor;
    }
    ul {
      padding-left: 10px;
      li {
        position: relative;
        float: left;
        max-width: 99%;
        margin-right: 4px;
        padding: 0 10px 0 10px;
        overflow: hidden;
        color: rgba(0, 0, 0, 0.65);
        background-color: #fafafa;
        border: 1px solid #e8e8e8;
        border-radius: 2px;
        height: 24px;
        margin-top: 3px;
        line-height: 22px;
        span {
          transform: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
      }
    }
  }
}
.popoverbox {
  border: 1px solid #d9d9d9;
  background: #ffffff;
  border-radius: 3px;
  margin-top: 3px;
}
ul {
  padding-left: 0px;
}
li {
  padding: 8px 12px;
  font-size: 14px;
  line-height: 16px;
  color: #333;
  word-break: break-word;
  word-wrap: break-word;
  list-style: none;
  cursor: pointer;
  &:hover {
    color: #333;
    background-color: rgba(0, 0, 0, 0.04);
  }
  &.active {
    color: $primaryColor;
  }
}
.additem {
  border-top: 1px solid #e8e8e8;
  h3 {
    height: 35px;
    line-height: 35px;
    color: $linkColor;
  }
}
.ant-popover-inner-content {
  padding: 5px 10px !important;
}
.ant-popover-placement-bottom,
.ant-popover-placement-bottomLeft,
.ant-popover-placement-bottomRight {
  padding-top: 0px;
}
.hand {
  cursor: pointer;
}
</style>
