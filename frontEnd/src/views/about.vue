<template>
  <div class="markdownbody">
    <div class="markdown-body" v-html="markdown">
    </div>
  </div>
</template>

<script>
import api from '../services/article.js'
import articleHeader from '../components/articleHeader.vue'
export default {
  name: 'article',
  data () {
    return {
      content:'',
      markdown:'',
    }
  },
  mounted(){
    this.refresh()
  },
  methods:{
    refresh(){
      let self = this
      $.get('aboutme.md',false).then(function(data){
        self.markdown = self.markdown_render(data)
        self.$nextTick(self.gotoTop)
      })
    }
  },
}
</script>

<style>
.markdownbody {
  padding:10px 20px;
  background:#fff;
  box-shadow: 0 0 1px 1px rgba(0,0,0,0.1);
}
</style>
