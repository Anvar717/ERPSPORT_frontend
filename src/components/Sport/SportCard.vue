<template>
  <div :class="`sp-card ${shadow ? 'sp-shadow' : ''}`" :style="{width : width,padding : padding,height : height}">
      <slot></slot>
  </div>
</template>

<script>
export default {
    props :{
        width : {
            type : String,
            default : 'fit-content'
        },
        padding : {
            type : String,
            default : '2px'
        },
        shadow : {
            type : Boolean,
            default : true
        },
        height : {
            type : String,
            default : 'fit-content'
        }
    }
}
</script>

<style scoped>
.sp-card{
    background-color: white;
    height: 100%;
    border-radius: 12px;
    /* height: fit-content; */
    /* overflow: hidden; */
    /* visibility: hidden; */
    /* clear: both; */
    z-index: 1;
}
.sp-shadow{
    box-shadow: 0 14px 24px rgba(0, 0, 0, 0.04);
}
</style>