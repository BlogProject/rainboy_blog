<template>
  <Menu mode="horizontal" theme="dark" @on-select="menuGo">
    <div class="layout-logo" @click="goIndex">
      <Icon type="planet"></Icon>
      Rainboy'Blog
    </div>
    <div class="layout-nav">
      <MenuItem name="2">
      <Icon type="ios-information"></Icon>
      标签云
      </MenuItem>
      <MenuItem name="about">
      <Icon type="ios-information"></Icon>
      关于
      </MenuItem>
    </div>
  </Menu>
</template>

<script>
export default {
  data(){
    return {}
  },
  methods:{
    goIndex(){
      this.$router.push({path:'/'})
    },
    menuGo(val){
      if(val == 'about')
      this.$router.push({name:'About'})
    }
  }
}
</script>

<style>
.layout-logo{
  cursor:pointer;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  left: 20px;
  font-weight:bolder;
  font-size:20px;
  color:#fff;
  padding:0 20px;
}

.layout-logo:hover {
  background:#797F8E;
  color:#00fdd1;
}

.layout-nav{
  float:right;
  right:20px;
}
</style>
