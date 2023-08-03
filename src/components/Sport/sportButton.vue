<template>
  <div>
      <button :class="`my-btn-custom d-flex align-items-center justify-content-center my-btn-${variant} ${block ? 'block' : ''}`"  >
          <slot></slot>
      </button>
  </div>
</template>

<script>
export default {
    props : {
        block : {
            type : Boolean,
            default : false
        },
        variant : {
            type : String,
            default : 'info'
        }
    }
}
</script>

<style lang='scss' scoped>

.my-btn-custom{
    padding-top: 14px;
    padding-bottom: 14px;
    outline:none;
    width: fit-content;
    border:none;
    // background-color: $success-light;
    border-radius: 8px;
    font-size: 15px;
    // border: 2px solid $success-light;
    transition: 0.4s;
    // border: 1px solid;
}
.my-btn-custom:hover{
    opacity: 0.7;
    // background-color: transparent;
}
.block{
    width : 100%
}
.my-btn-warning{
    background-color: #F8C80F;
}
.my-btn-info{
    background-color: #4791FF;
    color : white;
}
</style>