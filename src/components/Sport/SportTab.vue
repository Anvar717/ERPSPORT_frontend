<template>
  <div :class="`sp-tab ${active ? 'sp-active' : ''}`">
      <slot></slot>
  </div>
</template>

<script>
export default {
    props:{
        active : {
            type : Boolean,
            default : false
        }
    }
}
</script>

<style>
.sp-tab{
    width: fit-content;
    height: fit-content;
    font-size: 13px;
    padding: 8px 60px;
    border-radius: 12px;
    cursor: pointer;
}
.sp-active{
    background-color: #E9ECF2;
    transition: all 0.25s ease;

}
</style>