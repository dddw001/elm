<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="sellerInfo.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{sellerInfo.name}}</span>
        </div>
        <div class="desc">
          {{sellerInfo.description}}/{{sellerInfo.deliveryTime}}分钟送达
        </div>
        <div v-if="sellerInfo.supports" class="support">
          <icon-part  :iconName="classMap[sellerInfo.supports[0].type]" :iconIndex="1"></icon-part>
          <span class="text">{{sellerInfo.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="sellerInfo.supports" class="support-count" @click="showDetail">
        <span class="count">{{sellerInfo.supports.length}}个</span>
        <i class="icon iconfont icon-youjiantou"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{sellerInfo.bulletin}}</span>
      <i class="icon iconfont icon-youjiantou"></i>
    </div>
    <div class="bg">
      <img :src="sellerInfo.avatar" alt="">
    </div>
    <transition name="fade">
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{sellerInfo.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="sellerInfo.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="sellerInfo.supports" class="supports">
            <li class="support-item" v-for="(item,index) in sellerInfo.supports">
              <icon-part  :iconName="classMap[sellerInfo.supports[index].type]" :iconIndex="2"></icon-part>
              <span class="text">{{sellerInfo.supports[index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{sellerInfo.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="closeDetail">
        <i class="icon iconfont icon-cha"></i>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import Star from '../star/Star';
import iconPart from '../icon-pics/icon'
export default {
  props:["sellerInfo"],
  components:{Star,iconPart},
  data(){
    return{
      detailShow: false
    }
  },
  created(){
    this.classMap=['decrease','discount','special','guarantee','invoice'];
  },
  methods:{
    showDetail(){
      this.detailShow=true;
    },
    closeDetail(){
      this.detailShow=false;
    }
  }
}
</script>

<style lang="scss" type="text/css">
@mixin bg-image($url){
  @media screen and (max-width:750px){
    background-image:url('./img/'+$url+'@2x.png')
  }
  @media screen and (min-width:750px){
    background-image:url('./img/'+$url+'@3x.png')
  }
}
.header{
  position: relative;
  color: #fff;
  background: rgba(7,17,27,0.5);
  overflow: hidden;
  .content-wrapper{
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
    min-width: 300px;
    .avatar{
      display: inline-block;
      vertical-align: top;
      img{
        width: 64px;;
        height: 64px;
        border-radius: 2px;
      }
    }
    .content{
      display: inline-block;
      margin-left: 16px;
      .title{
        margin: 2px 0 8px 0;
        .brand{
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          @include bg-image('brand');
          background-size: 30px 18px;
        }
        .name{
          font-size: 16px;
          margin-left: 6px;
          line-height: 18px;
          font-weight:bold;
        }
      }
      .desc{
        font-size: 12px;
        line-height: 12px;
        margin-bottom: 10px;
      }
      .support{
        .text{
          line-height: 12px;
          font-size: 10px;
        }
      }
    }
    .support-count{
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      background: rgba(0,0,0,0.2);
      text-align: center;
      .count{
        font-size: 10px;
      }
      .iconfont{
        margin-left: 2px;
        line-height: 24px;
        font-size: 10px;
      }
    }
  }
  .bulletin-wrapper{
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: -8px;
    background: rgba(7,17,27,0.2);
    .bulletin-title{
      display: inline-block;
      width: 22px;
      height: 12px;
      vertical-align: top;
      margin-top: 8px;
      @include bg-image('bulletin');
      background-size: 22px 12px;
    }
    .bulletin-text{
      font-size: 10px;
      letter-spacing: 0;
      vertical-align: top;
      margin: 0 4px;
    }
    .iconfont{
      position: absolute;
      font-size: 10px;
      right: 12px;
    }
  }
  .bg{
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    filter: blur(10px);
    img{
      width: 100%;
      height: 100%;
    }
  }
  .detail{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7,17,27,0.8);
    transition: all 0.5s;
    &.fade-enter,&.fade-leave-to{
      opacity: 0;
      background: rgba(7,17,27,0);
    }
    .detail-wrapper{
      min-height: 100%;
      width: 100%;
      .detail-main{
        margin-top: 64px;
        padding-bottom: 64px;/*must be padding*/
        .name{
          line-height: 16px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
        }
        .star-wrapper{
          margin-top: 18px;
          padding: 2px;
          text-align: center;
        }
        .title{
          display: flex;
          width: 80%;
          margin: 28px auto 24px auto;
          .line{
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255,255,255,0.2);
          }
          .text{
            padding: 0 12px;
            font-weight: 700;
            font-size: 14px;
          }
        }
        .supports{
          width: 80%;
          margin: 0 auto;
          .support-item{
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;
            &:last-child{
              margin-bottom: 0;
            }
            .text{
              line-height: 16px;
              font-size: 12px;
            }
          }
        }
        .bulletin{
          width: 80%;
          margin: 0 auto;
          .content{
            padding: 0 12px;
            line-height: 24px;
            font-size: 12px;
          }
        }
      }
    }
    .detail-close{
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto;
      clear: both;
      font-size: 32px;
      text-align: center;
      line-height: 32px;
    }
  }
}
</style>
