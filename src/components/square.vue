<template>
  <div>
    <button class="square" v-on:click.left="handleClick" >{{ buttonState }}</button>
  </div>
</template>

<script>
export default{
  name: 'square',
  props:{
    buttonState: String,
    IsWon: Boolean,
    current: [],
    number: Number,
  },
  methods:{
    handleClick:function(){
      if(this.current[this.number] == 'X' || this.current[this.number] == 'O'){
        return;
      }
      this.$emit('changeState',this.number);
      this.$emit('store',this.number);
      if(this.IsWon){
        return;
      }
      this.$emit('isWon');
      this.$emit('changeSide');
      this.$emit('counter');
    },
  },
  data(){
    return{
      step: null,
    }
  },
  computed:{
  }
}
</script>

<style>
  .square {
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

  .square:focus {
  outline: none;
}
</style>
