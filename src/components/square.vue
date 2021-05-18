<template>
  <div>
    <button class="grid" @click.left="$emit('handleClick', number)">
      {{ state }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    state: String,
    number: Number,
  },
});
</script>

<style>
.grid {
  background: rgb(238, 238, 238);
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.grid:focus {
  outline: none;
}
</style>