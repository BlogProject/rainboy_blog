<template>
  <div class="user-info">
    <div class="avatar">
      <img class="user-avatar" :src="userConfigs.avatar"/>
    </div>
    <div class="user-name">
      {{userConfigs.name}}
    </div>
    <div class="user-signature">
      {{ userConfigs.sign}}
    </div>
    <div class="article-info-block">
      <div class="article-info-block-item">
        {{ tags.length}}
        <span>TAGS</span> 
      </div>
      <div class="article-info-block-item">
        {{ category.length}}
        <span>CATEGORY</span>
      </div>
      <div class="article-info-block-item">
        {{ series.length}}
        <span>SERIES</span>
      </div>
    </div>
    <div class="social-links-block">
      <div class="social-links-block-item" v-for="item in userConfigs.social_links">
        <Tooltip :content="item.name" placement="top">
          <a :href="item.link" target="_blank"><Icon :type="item.icon" /></a>
        </Tooltip>
      </div>
    </div>
  </div>
</template>


<script>

import { mapGetters } from 'vuex'
export default {
  name:'info',
  data(){
    return {
    }
  },
  components:{
  },
  computed:{
    ...mapGetters(['tags','series','category'])
  }
}
</script>
<style>
.user-info {
  background: #fff;
  box-shadow: 0 0 1px 1px rgba(0,0,0,0.1);
}
.user-info div {
  //margin-bottom:10px;
}

img.user-avatar{
    display: block;
    border-radius: 0.4rem;
    margin: 0 auto;
    width: 100%;
    box-shadow: 0 0 1px 1px rgba(0,0,0,0.1);
}
.user-name {
  font: 1.5rem/2.5rem "Microsoft Yahei","Source Sans Pro",Arial,sans-serif;
  color: #333;
  text-align: center;
  font-weight:bold;
}
.user-signature {
  color: gray;
  font: 1.2em "Microsoft Yahei","Source Sans Pro",Arial,sans-serif;
  text-align: center;
  margin: -0.4rem 0 0 0;
  font-weight:bold;
}

.article-info-block {
  margin-top:10px;
  display: -webkit-flex; /* Safari */
  display:flex;
  border-top: 1px solid #eceff2;
  border-bottom: 1px solid #eceff2;
}

.article-info-block-item {
  height:80px;
  padding: 10px 5px;
  text-align: center;
  font-size:20px;
  align-items: flex-start;
  flex:1;
  box-sizing: border-box;
  border-right: 1px solid #eceff2;
}

.article-info-block-item:last-child {
  border-right:0px;
}


.article-info-block-item span {
  display: block;
  font-size: 14px;
  text-transform: uppercase;
}

.social-links-block {
  display: -webkit-flex; /* Safari */
  display:flex;
}

.social-links-block-item {
  height:50px;
  padding: 10px 5px;
  text-align: center;
  font-size:20px;
  align-items: flex-start;
  flex:1;
  box-sizing: border-box;
}

.social-links-block-item a {
  font-size:25px;
  position: relative;
  color: #898d92;
}

</style>
