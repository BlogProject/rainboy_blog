<template>
  <div class = "firends-panel">
    <h2>Friends</h2>
    <ul class="friends-list" >
      <li v-for="item in userConfigs.friends">
        <a :href="item.link" target="_blank">
          {{ item.name}}
        </a>
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
  }
}
</script>

<style>
.firends-panel {
  width:100%;
  background:#fff;
  margin-top:20px;
  padding:5px;
  box-shadow: 0 0 1px 1px rgba(0,0,0,0.1);
}
.firends-panel h2 {
  text-align:center;
}

.firends-panel ul.friends-list {
  list-style:none;
  display:block;
}

.firends-panel ul.friends-list li{
  display:inline-block;
}

.firends-panel ul.friends-list li a{
  color:gray;
  display:block;
  text-align:center;
  margin:5px;
}
</style>
