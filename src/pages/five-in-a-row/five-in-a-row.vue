<template>
  <view>
    <view class="board">
      <view v-for="y in 10" :key="y">
        <button
          v-for="x in 10"
          :key="x"
          @click="$store.dispatch('handleClick', { x:x+1, y:y+1 })"
          class="tile"
          data-status=board[x][y]
        >
          {{ board[x][y] }}
        </button>
      </view>
    </view>
    <view class="gameInfo">Winner: {{ Winner }}</view>
  </view>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();

    return { 
      Winner: computed(() => store.state.Winner),
      board: computed(()=> store.state.board)
    };
  },
});
</script>

<style scoped>
.board {
  justify-content: center;
  display: inline-grid;
  padding: 10rpx;
  grid-template-columns: repeat(10, 70rpx);
  grid-template-rows: repeat(10, 70rpx);
  gap: 0rpx;
  background-color: rgb(107, 103, 103);
}
.tile {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2%;
  color: rgb(0, 0, 0);
  border: 1rpx solid rgb(0, 0, 0);
  user-select: none;
  font-size: 45rpx;
  background-color: rgb(224, 177, 118);
}
.tile[data-status='']{
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 2%;
  color: rgb(224, 177, 118);
  border: 1rpx solid rgb(0, 0, 0);
  user-select: none;
  font-size: 45rpx;
  background-color: rgb(224, 177, 118);
}
</style>