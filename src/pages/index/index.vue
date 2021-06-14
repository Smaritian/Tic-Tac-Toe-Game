<template>
    <view>
        <img src='../../static/logo.png'>
    </view>
</template>

<script lang="ts">
import { defineComponent ,computed } from "vue";
import { useStore } from 'vuex';

export default defineComponent({
  setup(){
      const store = useStore();
      return( { title: computed(() => store.state.Winner) } );
  }
});
</script>

<style scoped>

</style>