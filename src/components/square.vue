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
    //handleClick
    handleClick:function(){
      //判断是否获胜
      if(this.IsWon){ return; }
      //判断格子是否为空
      if(this.current[this.number] == 'X' || this.current[this.number] == 'O'){ return; }
      //调用父类changeState方法
      this.$emit('changeState',this.number);
      //调用父类storeHistory方法
      this.$emit('store',this.number);
      //调用父类IsWon方法
      this.$emit('isWon');
      //调用父类changeSide方法
      this.$emit('changeSide');
      //调用父类counter方法
      this.$emit('counter');
    },
  },
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
