<template>
  <div id="app">
    <section class="page-header">
      <h1 class="project-name">Vue Select Added 可添加选项多选框</h1>
      <p>
        a Multiple options box can be added component of Vue.js
      </p>
      <a
        class="btn"
        href="https://github.com/XiaoNode/vue-select-added"
        target="_blank"
        >GitHub</a
      >
      <!-- <a
        class="btn"
        href="https://www.npmjs.com/package/vue-select-added"
        target="_blank"
        >NPM</a
      > -->
    </section>

    <section class="main-content">
      <h3>Install</h3>
      <p><code>npm install vue-select-added</code></p>
      <p><code>yarn add vue-select-added</code></p>

      <span class="tips">
        <a-icon
          type="exclamation-circle"
          theme="twoTone"
          two-tone-color="#ff4a4a"
        />
        npm or yarn installation seems to cause dependency problems. You can
        also copy selectadded.vue in components to install the required
        dependencies globally</span
      >
      <!-- <h3>Playground</h3> -->
      <div class="playground">
        <div>
          <span></span>
          <h3>Preview</h3>
          selectValue:{{ selectValue }}
          <SelectAdded :allArr="items" v-model="selectValue" />
          <br />
          selectValue:{{ selectValue2 }}
          <SelectAdded :allArr="items2" v-model="selectValue2" />
        </div>

        <footer class="site-footer">
          <span class="site-footer-credits">
            <a
              href="https://github.com/XiaoNode/vue-select-added"
              target="_blank"
              >blog</a
            >
          </span>
        </footer>
      </div>
    </section>
  </div>
</template>

<script>
import SelectAdded from "./components/SelectAdded.vue";

export default {
  name: "app",

  components: {
    SelectAdded,
  },
  data() {
    return {
      items: ["aa", "bb", "cc", "dd", "ee", "ff", "aaa"],
      selectValue: ["dd"],
      items2: [],
      selectValue2: [22],
    };
  },
  mounted() {
    for (var i = 0; i < 1000; i++) {
      this.items2.push(i);
    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto");
@import "styles/normalize.css";
@import "styles/github-light.css";
@import "styles/stylesheet.css";
</style>
