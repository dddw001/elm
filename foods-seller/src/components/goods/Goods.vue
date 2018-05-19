<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu-wrapper">
      <ul>
        <li v-for="(item,index) in goodsInfo" class="menu-item" :class="{'current':currentIndex==index}" @click="selectMenu(index)">
          <span class="text">
            <icon-part v-show="item.type>0" :iconName="classMap[item.type]" :iconIndex="3"></icon-part>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods-wrapper">
      <ul>
        <li v-for="item in goodsInfo" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="selecteFood(food,$event)">
              <div class="icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}</span><span>好评率{{food.rating}}</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart :deliveryPrice="sellerInfo.deliveryPrice" :minPrice="sellerInfo.minPrice" :selectFoods="selectFoods"></shop-cart>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import iconPart from '../icon-pics/icon'
import ShopCart from '../shopcart/ShopCart'
import CartControl from '../cartcontrol/CartControl'
import Food from '../food/Food'
export default {
  props:["sellerInfo","goodsInfo"],
  components:{iconPart,ShopCart,CartControl,Food},
  data(){
    return{
      heightList:[],
      scrollY:0,
      selectedFood:{}
    }
  },
  created(){
    this.classMap=['decrease','discount','special','guarantee','invoice'];
    var that=this;
    this.$nextTick(()=>{
      this.menuScroll=new BScroll(this.$refs["menu-wrapper"],{click:true});
      this.foodsScroll=new BScroll(this.$refs["foods-wrapper"],{probeType:3,click:true});
      this.foodsScroll.on('scroll',(pos)=>{
        this.scrollY=Math.abs(Math.round(pos.y));
      })
      var _this=this;
      setTimeout(function(){
        //获取高度
        let foodList=_this.$refs["foods-wrapper"].getElementsByClassName('food-list-hook');
        let height=0;
        _this.heightList.push(height);
        //console.log(foodList.length)
        for(let i=0;i<foodList.length;i++){
          let item=foodList[i];
          height+=item.clientHeight;
          _this.heightList.push(height);
        }
      },0);
    })
  },
  computed:{
    currentIndex(){
      for(let i=0;i<this.heightList.length;i++){
        let height1=this.heightList[i];
        let height2=this.heightList[i+1];
        if(!height2||this.scrollY>=height1&&this.scrollY<height2){
          return i;
        }
      }
      return 0;
    },
    selectFoods(){
      let foods=[];
      if(this.goodsInfo.length>0){
        this.goodsInfo.forEach((good)=>{
        good.foods.forEach((food)=>{
          if(food.count){
            foods.push(food);
          }
        })
      })
      }
      return foods;
    }
  },
  methods:{
    selectMenu(index){
      let foodList=this.$refs["foods-wrapper"].getElementsByClassName('food-list-hook');
      let el=foodList[index];
      this.foodsScroll.scrollToElement(el,300);
      // for(let i=0;i<this.heightList.length;i++){
      //   let height1=this.heightList[i];
      //   let height2=this.heightList[i+1];
      //   if(!height2||this.scrollY>=height1&&this.scrollY<height2){
      //   }
      // }
    },
    selecteFood(food,event){
      this.selectedFood=food;
      this.$refs["food"].showFood();
    }
  }
}
</script>

<style lang="scss" type="text/css">
.goods{
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  .menu-wrapper{
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    .menu-item{
      display: table;
      width: 56px;
      height: 54px;
      padding: 0 12px;
      line-height: 14px;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      &:last-child{
        border-bottom: none;
      }
      &.current{
        position: relative;
        z-index:10;
        margin-top: -1px;
        background: #fff;
        font-weight: 700;
        .text{
          border:none;
        }
      }
      .text{
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        font-size: 12px;
      }
    }
  }
  .foods-wrapper{
    flex: 1;
    .title{
      padding-left: 14px;
      margin: 0;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }
    .food-item{
      display: flex;
      margin: 18px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      &:last-child{
        border-bottom: none;
        margin-bottom: 0;
      }
      .icon{
        flex: 0 0 57px;
        img{
          width: 100%;
        }
      }
      .content{
        flex: 1;
        margin-left: 5px;
        position: relative;
        .name{
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7,17,27);
        }
        .desc{
          margin: 0;
          margin-bottom: 8px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .extra{
          padding-top: 8px;
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
          span{
            padding-right: 4px;
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
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
