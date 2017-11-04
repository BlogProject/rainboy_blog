<template>
  <div class="markdownbody">
    <article-header 
      :title="title"
      :tags="tags"
      :visited="visited"
      :author="author"
      :time="time"
      ></article-header>
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
      title:'',
      tags:[],
      visited:0,
      time:'',
      author:''
    }
  },
  mounted(){
    this.refresh()
  },
  methods:{
    refresh(){
      let id = this.$route.params.id
      let self = this 
      api.get(id,false).then(function(data){
        if(data.status == 0 )
          self.content = data.doc.content
          self.title = data.doc.title
          self.tags = data.doc.tags
          self.time = data.doc.date
          self.visited = data.doc.visits
        self.author = data.doc.author
          self.markdown = self.markdown_render(self.content)
        self.$nextTick(self.gotoTop)
      })
    }
  },
  components:{
    articleHeader
  }
}
</script>

<style>
.markdownbody {
  padding:10px 20px;
  background:#fff;
  box-shadow: 0 0 1px 1px rgba(0,0,0,0.1);
}
</style>

