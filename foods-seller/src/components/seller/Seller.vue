<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{sellerInfo.name}}</h1>
        <div class="desc">
          <star :size="36" :score="sellerInfo.score"></star>
          <span class="text">({{sellerInfo.ratingCount}})</span>
          <span class="text">月售{{sellerInfo.sellCount}}</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{sellerInfo.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{sellerInfo.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{sellerInfo.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite">
          <i class="icon iconfont icon-shoucang" :class="{'active':favorite}" @click="togglefavorite"></i>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{sellerInfo.bulletin}}</p>
        </div>
        <ul v-if="sellerInfo.supports" class="supports">
            <li class="support-item" v-for="(item,index) in sellerInfo.supports">
              <icon-part  :iconName="classMap[sellerInfo.supports[index].type]" :iconIndex="3"></icon-part>
              <span class="text">{{sellerInfo.supports[index].description}}</span>
            </li>
          </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in sellerInfo.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in sellerInfo.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Star from '../star/Star'
import Split from '../split/Split'
import iconPart from '../icon-pics/icon'
import {saveToLocal,loadFromLocal} from '../../../util.js'
export default {
  props:{
    sellerInfo:{
      type: Object
    }
  },
  components:{Star,Split,iconPart},
  data(){
    return{
      favorite:loadFromLocal(this.sellerInfo.id,'favorite',false)
    }
  },
  created(){
    this.classMap=['decrease','discount','special','guarantee','invoice'];
  },
  mounted(){
    this.$nextTick(()=>{
      if(!this.scroll){
        this.scroll=new BScroll(this.$refs.seller,{
            click:true
        })
      }
      else{
        this.scroll.refresh();
      }  
    })
  },
  watch:{
   sellerInfo(val){
     if(this.sellerInfo.pics){
        let picWidth=120;
        let margin=6;
        let width=(picWidth+margin)*this.sellerInfo.pics.length-margin;
        this.$refs.picList.style.width=width+'px';
        this.$nextTick(()=>{
          if(!this.picScroll){
            this.picScroll=new BScroll(this.$refs.picWrapper,{
              scrollX:true,
              eventPassthrough:'vertical'
            })
          }
          else{
            this.picScroll.refresh();
          }  
        })
     }
   }
  },
  methods:{
    togglefavorite(){
      this.favorite=!this.favorite;
      saveToLocal(this.sellerInfo.id,'favorite',this.favorite);
    }
  },
  computed:{
    favoriteText(){
      return this.favorite?'已收藏':'收藏';
    }
  }
}
</script>

<style lang="scss" type="text/css">
.seller{
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview{
    padding: 18px;
    .title{
      margin-bottom: 8px;
      line-height: 14px;
      font-size: 14px;
      color: rgb(7,17,27);
    }
    .desc{
      padding-bottom: 18px;
      line-height: 18px;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      font-size: 0;
      .star{
        display: inline-block;
        vertical-align: top;
        margin-right: 8px;
      }
      .text{
        display: inline-block;
        vertical-align: top;      
        margin-right: 12px;
        font-size: 10px;
        color: rgb(77,85,93);
      }
    }
    .remark{
      display: flex;
      padding-top: 18px;
      .block{
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(7,17,27,0.1);
        &:last-child{
          border: none;
        }
        h2{
          margin-bottom: 4px;
          line-height: 10px;
          font-size: 10px;
          color: rgb(147,153,159);
        }
        .content{
          line-height: 24px;
          font-size: 10px;
          color: rgb(7,17,27);
          .stress{
            font-size: 24px;
            font-weight: 500;
          }
        }
      }
    }
    .favorite{
      position: absolute;
      right: 11px;
      top: 18px;
      width: 50px;
      text-align: center;
      .icon{
        display: block;
        margin-bottom: 4px;
        line-height: 24px;
        font-size: 24px;
        color: #d4d6d9;
        &.active{
          color: rgb(240,20,20);
        }
      }
      .text{
        line-height: 10px;
        font-size: 10px;
        color: rgb(77,85,93);
      }
    }
  }
  .bulletin{
    padding: 18px 18px 0 18px;
    .title{
      margin-bottom: 8px;
      line-height: 14px;
      font-size: 14px;
      color: rgb(7,17,27);
    }
    .content-wrapper{
      padding: 0 12px 16px 12px;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      .content{
        line-height: 24px;
        font-size: 12px;
        color: rgb(240,20,20);
      }
    }
    .supports{
      .support-item{
        padding: 16px 12px;
        font-size: 0;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        &:last-child{
          border: none;
        }
      }
      .text{
        display: inline-block;
        vertical-align: top;
        line-height: 12px;
        font-size: 12px;
        color: rgb(7,17,27);
      }
    }
  }
  .pics{
    padding: 18px;
    .title{
      margin-bottom: 12px;
      line-height: 14px;
      font-size: 14px;
      color: rgb(7,17,27);
    }
    .pic-wrapper{
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      .pic-list{
        font-size: 0;
        .pic-item{
          display: inline-block;
          margin-right: 6px;
          width: 120px;
          height: 90px;
          &:last-child{
            margin: 0;
          }
        }
      }
    }
  }
  .info{
    padding: 18px 18px 0 18px;
    color: rgb(7,17,27);
    .title{
      line-height: 14px;
      font-size: 14px;
    }
    .info-item{
      padding: 16px 12px;
      line-height: 16px;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      font-size: 12px;
      &:last-child{
        border: none;
      }
    }
  }
}
</style>
