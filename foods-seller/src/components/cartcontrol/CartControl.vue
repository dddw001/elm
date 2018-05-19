<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease icon iconfont icon-jian" v-show="food.count>0" @click.stop.prevent="decreaseCount"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon iconfont icon-jia" @click.stop.prevent="addCount($event)"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import eventBus from '../EventBus.js'
export default {
  props:["food"],
  methods:{
    addCount(event){
      if(!this.food.count){
        Vue.set(this.food,'count',1);
      }
      else{
        this.food.count++;
      }
      eventBus.$emit('ballsMove',event.target);
    },
    decreaseCount(){
      if(this.food.count<=1){
        Vue.set(this.food,'count',0);
      }
      else{
        this.food.count--;
      }
    }
  }
}
</script>
<style lang="scss" type="text/css">
.cartcontrol{
  font-size: 0;
  .cart-decrease{
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 18px;
    color: rgb(0, 160, 220);
    opacity: 1;
    transform: translate3d(0,0,0);
    transition: all 0.4s linear;
    &.move-enter,&.move-leave-to{
      opacity: 0;
      transform: translate3d(24px,0,0) rotate(180deg);
    }
    
  }
  .cart-count{
    display: inline-block;
    font-size: 10px;
    width: 12px;
    line-height: 24px;
    text-align: center;
  }
  .cart-add{
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 18px;
    color: rgb(0, 160, 220);
  }
}
</style>
