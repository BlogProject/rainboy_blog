<template>
  <div class="index-content">
  <div class="slide">
    <slide></slide>
  </div>
  <div class="list">
    <h1>文章列表</h1>
    <div class="option">

      <div class="item">
        <Button>标题</Button>
        <Input v-model="search.title" style="width:150px">
        </Input>
      </div>

      <div class="item">
        <Button>标签</Button>
        <Select v-model="search.tags" style="width:100px" clearable>
          <Option v-for="item in tags" :value="item" :key="item"></Option>
        </Select>
      </div>

      <div class="item">
        <Button>系列</Button>
        <Select v-model="search.series" style="width:100px" clearable>
          <Option v-for="item in series" :value="item" :key="item"></Option>
        </Select>
      </div>

      <div class="item">
        <Button>分类</Button>
        <Select v-model="search.category" style="width:100px" clearable>
          <Option v-for="item in category" :value="item" :key="item"></Option>
        </Select>
      </div>

      <div class="item">
        <Button icon="ios-search" type="primary" @click="refresh">搜索</Button>
      </div>
    </div>
    <vtable
      ref="vtable"
      size="default"
      :params="search"
      :columns="columns"
      :count="count"
      :page="page"
      :border="true"
      url="article"
      >
    </vtable>
  </div>
</div>
</template>

<script>
import vtable from '../components/vtable.vue'
import api from '../services/article.js'
import { mapGetters } from 'vuex'
import slide from '../components/slide.vue'
import expand from '../components/expand.vue'
export default {
  data () {
    return {
      search:{
        tags:'',
        title:'',
        category:'',
        series:''
      },
      count:30,
      page:1,
      columns:[
        {
          type: 'expand',
          width: 50,
          render: function(h, params){
            return h(expand, {
              props:{
                data:params.row
              }
            })
          }
        },
        {
          title:'标题',
          className:'cell-title',
          align:'center',
          render:function(h,params){
            let link = h('router-link',{
              props:{
                to:'/article/'+params.row._id
              }
            },params.row.title)

            return h('p',[link])
          }
        },
        {
          title:'系列',
          key:'series',
          width:100,
          align:'center'
        },
        {
          title:'分类',
          align:'center',
          width:150,
          render:function(h,params){
            let tags = []
            for(let i = 0;i < params.row.category.length && i <= 3;i++)
              tags.push(h('Tag',params.row.category[i]));
            if( params.row.category.length > 3){
              tags.pop()
              let more_tags = params.row.category.slice(3).join(',')
              let tip = h('Tooltip',{
                props:{
                  content:more_tags,
                  placement:'top'
                }
              },[
                h('Tag','...')
              ])
              tags.push(tip)
            }
            return h('p',tags)
          }
        },
        {
          title:"浏览量",
          key:'visits',
          width:80,
          align:'center'
        }
      ],
    }
  },
  mounted(){
    this.$store.commit('getState')
    let self= this
    this.getParams()
    this.refresh()
    this.$nextTick(self.gotoTop)
  },
  methods:{
    refresh(){
      this.$refs.vtable.refresh()
    },
    getParams(){
      let query = this.$route.query
      if( query.title)
        this.search.title = query.title
      if( query.tags)
        this.search.tags= query.tags

      if( query.author)
        this.search.author = query.author
    }
  },
  components:{
    vtable,
    slide,
    expand
  },
  computed:{
    ...mapGetters(['tags','series','category'])
  }
}
</script>

<style>
.option {
  padding:20px 0px;
  text-align:justify;
}
.option .ivu-input-group {
  top:0px;
  display:flex;
}
.option .item {
  display:inline-block;
  vertical-align:top;
  margin-left:5px;
}

.index-content {
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items: flex-start;
}
.slide {
  width:200px;
  margin-right:20px;
  flex:0 0 auto;
}
.list {
  background: #fff;
  flex:1 1 auto;
}
.list h1 {
  margin-top:50px;
  margin-bottom:20px;
  text-align:center;
  font-size:30px;
  color: #ddd;
  letter-spacing: 0;
  text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135 
}

.cell-title {
  font-size:20px;
  font-weight:bold;
}
</style>
