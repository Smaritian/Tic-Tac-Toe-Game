<template>
  <div>
    <game v-bind:state= '1' />
  </div>
</template>

<script>
import game from './components/game.vue'

export default {
  name: 'App',
  components: {
   game,
  }
}
</script>


