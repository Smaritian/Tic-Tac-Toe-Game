<template>
   <div class="game">       
        <div class="gameinfo">
            <p v-if="!isWon">
                Next Player : {{state}}
            </p>
            <p v-if="isWon">
                Winner : {{ Winner }}
            </p>
        </div>
        <div class="board">
            <div class="boardrow">
                    <square :buttonState = "temp[0]" @changeState = 'changeState' :state = state @changeSide = 'changeSide' @store = 'storeHistory' @isWon = 'IsWon' @counter = 'counter' :number = '0' :IsWon="isWon" :current="temp"/>
                    <square :buttonState = "temp[1]" @changeState = 'changeState' :state = state @changeSide = 'changeSide' @store = 'storeHistory' @isWon = 'IsWon' @counter = 'counter' :number = '1' :IsWon="isWon" :current="temp" />
                    <square :buttonState = "temp[2]" @changeState = 'changeState' :state = state @changeSide = 'changeSide' @store = 'storeHistory' @isWon = 'IsWon' @counter = 'counter' :number = '2' :IsWon="isWon" :current="temp" />
            </div>
            <div class="boardrow">
                    <square :buttonState = "temp[3]" @changeState = 'changeState' :state = state @changeSide = 'changeSide' @store = 'storeHistory' @isWon = 'IsWon' @counter = 'counter' :number = '3' :IsWon="isWon" :current="temp" />
                    <square :buttonState = "temp[4]" @changeState = 'changeState' :state = state @changeSide = 'changeSide' @store = 'storeHistory' @isWon = 'IsWon' @counter = 'counter' :number = '4' :IsWon="isWon" :current="temp" />
                    <square :buttonState = "temp[5]" @changeState = 'changeState' :state = state @changeSide = 'changeSide' @store = 'storeHistory' @isWon = 'IsWon' @counter = 'counter' :number = '5' :IsWon="isWon" :current="temp" />
            </div> 
            <div class="boardrow">
                    <square :buttonState = "temp[6]" @changeState = 'changeState' :state = state @changeSide = 'changeSide' @store = 'storeHistory' @isWon = 'IsWon' @counter = 'counter' :number = '6' :IsWon="isWon" :current="temp" />
                    <square :buttonState = "temp[7]" @changeState = 'changeState' :state = state @changeSide = 'changeSide' @store = 'storeHistory' @isWon = 'IsWon' @counter = 'counter' :number = '7' :IsWon="isWon" :current="temp" />
                    <square :buttonState = "temp[8]" @changeState = 'changeState' :state = state @changeSide = 'changeSide' @store = 'storeHistory' @isWon = 'IsWon' @counter = 'counter' :number = '8' :IsWon="isWon" :current="temp" />
            </div>
        </div>
        <div class="history">
            <ol><button class="historyButton" @click="initGame">Go to the game start</button></ol>
            <ol v-for="(item, index) in history" :key="index">
                <button class="historyButton" v-if="item" @click="JumpTo(index)" >Go to move #{{index + 1}}</button>
            </ol>
        </div>
   </div>
</template>

<script>
import square from './square.vue'

export default{
    name: 'game',
    props:{
    },
    data(){
        return{
            state: 'X',
            step: 0,
            isXNext: false,
            isWon: false,
            temp: Array(9).fill(null),
            history: Array(9).fill(null),
            Winner: String,
        }
    },
    components:{
        square
    },
    methods:{
        initGame:function(){
            this.state = 'X';
            this.step = '0';
            this.isXNext = false;
            this.isWon = false;
            this.temp = Array(9).fill(null);
            this.history = Array(9).fill(null);
        },
        changeState:function(i){
            this.temp[i] = this.state;
        },
        changeSide:function(){
            // if(this.isWon){
            //     this.state = null;
            //     return;
            // }
            if(this.isXNext){
                this.state = 'X';
                this.isXNext = ! this.isXNext;
            }else{
                this.state = 'O';
                this.isXNext = ! this.isXNext;
            }
        },
        storeHistory:function(){
            if(this.isWon){
                return;
            }
            const history = this.temp.slice();
            this.history[this.step] = {history};
        },
        IsWon:function(){
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
                if (this.temp[a] && this.temp[a] === this.temp[b] && this.temp[a] === this.temp[c]) {
                    this.isWon = true;
                    this.Winner = this.temp[a];
                }
            }
        },
        counter:function(){
            this.step++;
        },
        JumpTo:function(i){
            for(let j = 0; j < 9; j++){
                this.temp[j] = this.history[i].history[j];
            }
            this.step = i + 1;
            for(let j = this.history.length - 1; j > i; j--){
                this.history[j] = null;
            }
            this.isWon = false;
            this.IsWon();
            if(this.step % 2 == 0){
                this.state = 'X';
                this.isXNext = false;
            }else{
                this.state = 'O';
                this.isXNext = true;
            }
        },
    },
    computed:{
    }
}
</script>

<style>
    .boardrow:after {
    clear: both;
    content: "";
    display: table;
  }
  .historyButton{
    display: block;
  }
</style>
