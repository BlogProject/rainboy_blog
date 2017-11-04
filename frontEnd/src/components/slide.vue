<template>
  <div>
    <info></info>
    <friends></friends>
    <myhot :hot="hot"></myhot>
  </div>
</template>
<script>
import info from './info.vue'
import friends from './friends.vue'
import myhot from './hot.vue'
import { mapGetters } from 'vuex'
export default {
  name:'slide',
  data(){
    return {
    }
  },
  components:{
    info,
    friends,
    myhot
  },
  computed:{
    ...mapGetters(['tags','series','category','hot'])
  }
}
</script>
