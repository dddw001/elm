<template>
  <div id="app">
    <sell-header :sellerInfo="sellerInfo"></sell-header>
    <div class="tab">
      <div class="tab-item" v-for="(item,index) in linkList" @click="changeIndex(index)">
        <router-link :to="item.url" :class='{active:activeIndex==index}'>{{item.name}}</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :goodsInfo="goodsInfo" :sellerInfo="sellerInfo" :ratingsInfo="ratingsInfo"/>
    </keep-alive>
  </div>
</template>

<script>
import axios from 'axios'
import SellHeader from './components/header/Header'
import {urlParse} from '../util.js'
const linkList=[{url:'./goods',name:'商品'},{url:'./ratings',name:'评论'},{url:'./seller',name:'商家'}]
export default {
  data(){
    return{
      linkList:linkList,
      sellerInfo:{},
      activeIndex:0,
      goodsInfo:{},
      ratingsInfo:[]
    }
  },
  components: {SellHeader},
  mounted() {
    var path=this.$route.path;
    if(path.includes('goods')){
      this.activeIndex=0;
    }
    else if(path.includes('ratings')){
      this.activeIndex=1;
    }
    else{
      this.activeIndex=2;
    }
    axios.get('../static/data.json').then(res=>{
      this.sellerInfo=res.data.seller;
      this.goodsInfo=res.data.goods;
      this.ratingsInfo=res.data.ratings;
      this.$set(this.sellerInfo,'id',urlParse().id);
    })
  },
  methods:{
    changeIndex(index){
      this.activeIndex=index;
    }
  }
}
</script>

<style lang="scss" type="text/css">
html,body{margin: 0;font-weight: 200;}
ul,li{padding-left: 0;margin-top: 0;list-style: none;}
.tab{
  display:flex;
  width:100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  .tab-item{
    flex: 1;
    text-align: center;
    &>a{
      display: block;
      text-decoration: none;
      color: rgb(77, 85, 93);
      &.active{
        color: rgb(240, 20, 20);
      }
    }
  }
}
.clearfix{
  display: inline-block;
  &:after{
    content: '';
    display: block;
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
  }
}
</style>
