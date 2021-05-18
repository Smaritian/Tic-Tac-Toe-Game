<template>
  <div class="game">
    <div class="gameInfo"></div>
    <p>Winner: {{ Winner }}</p>
    <div class="gameBoard">
      <div class="row">
        <square @handleClick="handleClick" :number="0" :state="now[0]" />
        <square @handleClick="handleClick" :number="1" :state="now[1]" />
        <square @handleClick="handleClick" :number="2" :state="now[2]" />
      </div>
      <div class="row">
        <square @handleClick="handleClick" :number="3" :state="now[3]" />
        <square @handleClick="handleClick" :number="4" :state="now[4]" />
        <square @handleClick="handleClick" :number="5" :state="now[5]" />
      </div>
      <div class="row">
        <square @handleClick="handleClick" :number="6" :state="now[6]" />
        <square @handleClick="handleClick" :number="7" :state="now[7]" />
        <square @handleClick="handleClick" :number="8" :state="now[8]" />
      </div>
    </div>
    <div class="historyButton">
      <li>
        <button @click.left="initGame">Go to the game start.</button>
      </li>
      <li v-for="(item, index) in history" :key="index">
        <button @click.left="jumpTo(index)" v-if="item != ''">
          #{{ index + 1 }}
        </button>
      </li>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from "vue";
import square from "../components/square.vue";

export default {
  components: { square },
  props: {},
  setup() {
    const now = ref([""]);
    const chessman = ref("X");
    const isWon = ref(false);
    const isBlank = ref(true);
    const Winner = ref("");
    let history: string[][] = [[]];
    let step = 0;

    const changeSide = () => {
      if (chessman.value === "X") {
        chessman.value = "O";
      } else {
        chessman.value = "X";
      }
    };

    const initGame = () => {
      now.value = [''];
      chessman.value = 'X';
      isWon.value = false;
      isBlank.value = false;
      Winner.value = '';
      history = [[]];
      step = 0;
    }

    const isWin = () => {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
          now.value[a] &&
          now.value[a] === now.value[b] &&
          now.value[a] === now.value[c]
        ) {
          isWon.value = true;
          Winner.value = now.value[a];
          return;
        }
      }
      isWon.value = false;
      Winner.value = "";
    };

    watch(now.value, isWin);

    const IsBlank = (num: number) => {
      if (now.value[num] === "X" || now.value[num] === "O") {
        isBlank.value = false;
      } else {
        isBlank.value = true;
      }
    };

    const storeBoard = () => {
      history[step] = now.value.slice();
      step++;
    };

    const jumpTo = (index: number) => {
      for(let i = 0; i < 9 ; i++){
        now.value[i] = history[index][i];
      }
      for (let i = 8; i > index; i--) {
        history[i] = [""];
      }
      step = index + 1;
      if(index % 2 == 0){
        chessman.value = 'O';
      }else{
        chessman.value = 'X';
      }
      isWin();
    };

    const handleClick = (num: number) => {
      //判断能否改值(输赢>>是否为空)
      IsBlank(num);
      if (isWon.value || !isBlank.value) return;
      //改值
      now.value[num] = chessman.value;
      //存值
      storeBoard();
      //换边
      changeSide();
    };

    return {
      now,
      history,
      Winner,
      initGame,
      jumpTo,
      handleClick,
    };
  },
};
</script>

<style>
.row:after {
  clear: both;
  content: "";
  display: table;
}
</style>
