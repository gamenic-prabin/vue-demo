<template>
  <div class="greetings">
    <input type="text" placeholder="Text" v-model="numberToGenerate"/>
    <button @click.prevent="generateNumber">Generate</button>
  </div>
</template>


<script>
import { reactive, computed, onMounted, onUnmounted, watch, ref } from 'vue'

export default{
  setup(props){

    const numberToGenerate = ref('')

    function generateNumber(){
      for(let i = 0; i < 1000; i++){
        let number = ('000' + i).slice(-3) 
        console.log(numberToGenerate.value + '' + number)
      }
    }

    return {
      numberToGenerate,
      generateNumber
    }
  }
}
</script>


<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
