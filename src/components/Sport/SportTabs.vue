<template>
  <div class="sp-tabs">
      <slot></slot>
      
  </div>
</template>

<script>
export default {

}
</script>

<style>
.sp-tabs{
  display: flex;
  transition: all 0.33s cubic-bezier(0.38, 0.8, 0.32, 1.07);
}
</style>