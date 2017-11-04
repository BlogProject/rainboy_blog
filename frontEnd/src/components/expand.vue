<template>
  <div class="expand">
    <div class="show-tags">
      <article-header
        :tags="data.tags"
        :visited="data.visits"
        :author="data.author"
        :time="data.date"
        >
      </article-header>
    </div>
    <div class="markdown-body" v-html="summaryhtml">
    </div>
  </div>
</template>


<script>

import articleHeader from './articleHeader.vue'
export default {
  name:'info',
  data(){
    return {
    }
  },
  props:{
    data:Object
  },
  components:{
    articleHeader
  },
  computed:{
    summaryhtml(){
      return this.markdown_render(this.data.summary)
    }
  }
}
</script>
<style>
.expand {
  padding:20px;
}

</style>
