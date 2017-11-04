<template>
  <div class = "hot-panel">
    <h2>浏览最多文章</h2>
    <ul class="hot-list" >
      <li v-for="item in hot">
        <router-link :to="'/article/'+item._id">
          {{ item.title}}
          <span>
            {{ item.visits}}
          </span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name:'slide',
  data(){
    return {
    }
  },
  props:{
    hot:Array
  }
}
</script>

<style>
.hot-panel {
  width:100%;
  background:#fff;
  margin-top:20px;
  box-shadow: 0 0 1px 1px rgba(0,0,0,0.1);
}
.hot-panel h2 {
  padding:10px 0px;
  text-align:center;
}

.hot-list li {
  padding:5px;
  border-top:1px solid #eee;
  with:%100;
}
.hot-list li span{
  float:right;
  width:30px;
  text-align:center;
  background-color:#eee;
  color:#2c2c2c;
  border-radius:5px;
}

</style>
