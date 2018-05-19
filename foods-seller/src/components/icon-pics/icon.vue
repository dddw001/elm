<template>
  <div class="icons" :class="`${iconName}_${iconIndex}`">
  </div>
</template>

<script>
export default {
  props:["iconName","iconIndex"]
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
.icons{
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 2px;
  background-size: 12px 12px;
  vertical-align: top;
  &.decrease_1{
  @include bg-image('decrease_1');
  }
  &.discount_1{
    @include bg-image('discount_1');
  }
  &.guarantee_1{
    @include bg-image('guarantee_1');
  }
  &.invoice_1{
    @include bg-image('invoice_1');
  }
  &.special_1{
    @include bg-image('special_1');
  }
  &.decrease_2{
  @include bg-image('decrease_2');
  }
  &.discount_2{
    @include bg-image('discount_2');
  }
  &.guarantee_2{
    @include bg-image('guarantee_2');
  }
  &.invoice_2{
    @include bg-image('invoice_2');
  }
  &.special_2{
    @include bg-image('special_2');
  }
  &.decrease_3{
  @include bg-image('decrease_3');
  }
  &.discount_3{
    @include bg-image('discount_3');
  }
  &.guarantee_3{
    @include bg-image('guarantee_3');
  }
  &.invoice_3{
    @include bg-image('invoice_3');
  }
  &.special_3{
    @include bg-image('special_3');
  }
}
</style>
