<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon iconfont icon-zuojiantou"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cart-control :food="food"></cart-control>
          </div>
          <transition class="buy">
            <div class="buy" v-show="!food.count||food.count==0" @click.stop.prevent="addFirst">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <rating-selectinging :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" @ratingType="changeRatingType" @toggleContent="toggleContent"></rating-selectinging>
          <div class="rating-wrapper">
            <ul v-show="food.ratings&&food.ratings.length">
              <li v-for="rating in food.ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" width="12" height="12" class="avatar">
                </div>
                <div class="time">{{rating.rateTime | _formatDate}}</div>
                <p class="text">
                  <i class="icon iconfont" :class="{'icon-xihuan1':rating.rateType===0,'icon-dislike-b':rating.rateType===1}"></i>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import CartControl from '../cartcontrol/CartControl'
import eventBus from '../EventBus.js'
import Split from '../split/Split'
import RatingSelectinging from '../ratingselect/RatingSelecting'
import {formatDate} from '../date.js'
const POSITIVE=0;
const NEGATIVE=1;
const ALL=2;
export default {
  props:["food"],
  components:{CartControl,Split,RatingSelectinging},
  data(){
    return{
      showFlag:false,
      selectType:ALL,
      onlyContent:false,
      desc:{
        all:'全部',
        positive:'推荐',
        negative:'吐槽'
      }
    }
  },
  methods:{
    showFood(){
      this.showFlag=true;
      this.selectType=ALL;
      this.onlyContent=false;   
      this.$nextTick(()=>{
        if(!this.scroll){
          this.scroll=new BScroll(this.$refs.food,{
            click:true
          })
        }
        else{
          this.scroll.refresh();
        }
      })
    },
    hide(){
      this.showFlag=false;
    },
    addFirst(event){
      eventBus.$emit('ballsMove',event.target);
      Vue.set(this.food,'count',1);
    },
    changeRatingType(type){
      this.selectType=type;
      this.$nextTick(()=>{
        this.scroll.refresh();
      })
    },
    toggleContent(){
      this.onlyContent=!this.onlyContent;
      this.$nextTick(()=>{
        this.scroll.refresh();
      })
    },
    needShow(type,text){
      if(this.onlyContent&&!text){
        return false;
      }
      if(this.selectType===ALL){
        return true;
      }
      else{
        return type===this.selectType;
      }
    }
  },
  filters:{
    _formatDate(time){
      let date=new Date(time);
      return formatDate(date,'yyyy-MM-dd hh:mm');
    }
  }
}
</script>

<style lang="scss" type="text/css">
.food{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 3;
  width: 100%;
  background: #fff;
  transition: all 0.2s linear;
  transform: translate3d(0,0,0);
  &.move-enter,&.move-leave-to{
    transform: translate3d(100%,0,0);
  }
  .img-header{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    img{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .back{
      position: absolute;
      top: 10px;
      left: 0;
      .icon-zuojiantou{
        display: block;
        padding: 10px;
        font-size: 20px;
        color: #fff;
      }
    }
  }
  .content{
    position: relative;
    padding: 18px;
    .title{
      line-height: 14px;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 700;
      color: rgb(7,17,27);
    }
    .detail{
      margin-bottom: 8px;
      line-height: 10px;
      font-size: 0;
      .sell-count,.rating{
        font-size: 10px;
        color: rgb(147,153,159);
      }
      .sell-count{
        margin-right: 12px;
      }
    }
    .price{
      font-weight: 700;
      line-height: 24px;
      .now{
        margin-right: 8px;
        font-size: 14px;
        color: red;
      }
      .old{
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }
    .cartcontrol-wrapper{
    position: absolute;
    right: 12px;
    bottom: 12px;
    }
    .buy{
    position: absolute;
    right: 18px;
    bottom: 18px;
    z-index: 10;
    height: 24px;
    line-height: 24px;
    padding: 0 12px;
    box-sizing: border-box;
    border-radius: 12px;
    font-size: 10px;
    color: #fff;
    background: rgb(0,160,220);
    transition: all 0.2s;
    opacity: 1;
    &.buy-enter,&.buy-leave{
      opacity: 0;
    }
    }
  }
  .info{
    padding: 18px;
    .title{
      line-height: 14px;
      margin-bottom: 6px;
      font-size: 14px;
      color: rgb(7,17,27);
    }
    .text{
      line-height: 24px;
      padding: 0 8px;
      font-size: 12px;
    }
  }
  .rating{
    padding-top: 18px;
    .title{
      line-height: 14px;
      margin-left: 18px;
      font-size: 14px;
      color: rgb(7,17,27);
    }
    .rating-wrapper{
      padding: 0 18px;
      .rating-item{
        position: relative;
        padding: 16px 0;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        .user{
          position: absolute;
          right: 0;
          top: 16px;
          line-height: 12px;
          font-size: 0;
          .name{
            display: inline-block;
            margin-right: 6px;
            vertical-align: top;
            font-size: 10px;
            color: rgb(147,153,159);
          }
          .avatar{
            border-radius: 50%;
          }
        }
        .time{
          margin-bottom: 6px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .text{
          line-height: 16px;
          font-size: 12px;
          color: rgb(7,17,27);
          .icon{
            margin-right: 4px;
            font-size: 12px;
          }
          .icon-xihuan1{
            color: rgb(0,160,220);
          }
          .icon-dislike-b{
            color: rgb(147,153,159);
          }
        }
      }
      .no-rating{
        padding: 16px 0;
        font-size: 12px;
        color: rgb(147, 153, 159);
      }
    }
  }
}
</style>
