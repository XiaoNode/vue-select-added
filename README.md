# vue-select-added

> A Vue.js 2.0 select added component

## Installation

#### NPM / Yarn

```bash
npm install vue-select-add --save
```

Then you need to import and register it:

```js
import SelectAdded from "vue-select-added";
```

```js
Vue.component("vue-select-added", vue-select-added);
```

## Usage

```js
<SelectAdded
  :allArr="items"
  :checkArr="selectValue"
  v-model="selectValue"
/>/>
```
