<template>
  <div :class="`sp-list-group mb-2 ${active ? 'sp-active ' : '' }`">
      <div v-if="!label">
          <div class="sp-item" style="margin-top:7px;margin-bottom:7px"> <slot></slot> </div>
      </div>
      <div v-if="!!label">
          <label class="sp-label"> {{ label }} </label>
          <div class="sp-item"> <slot></slot> </div>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        label : {
            type : String,
            default : ''
        },
        active : {
            type : Boolean,
            default : false
        }
    }
}
</script>

<style>
.sp-list-group{
    background-color: #fff;
    border-radius: 12px;
    padding-top: 7px;
    padding-bottom: 7px;
    padding-left: 16px;
    cursor: pointer;
}
.sp-item{
    font-size: 13px;
    color: #000;
}
.sp-label{
    font-size: 10px;
    color: #707070;
    margin-bottom: 0;
}
.sp-active{
    background-color: #E9ECF2;
}
</style>