<template>
  <div :class="`sp-chip d-flex justify-content-between ${cardid == item.Id ? 'sp-active ' : '' }`" @click="SelectOblast(item)">
      <div style="margin-right:13px;white-space:nowrap">{{item.Name}}</div>
      <div style="color:#4791FF"> {{ item.Count }} </div>
  </div>
</template>

<script>
export default {
    props : {
        item :{},
        active : {},
    },
    data(){
        return{
            cardid : null
        }
    },
    created(){
        this.cardid = this.active
    },
    methods:{
        SelectOblast(item){
            this.cardid = item.Id
            this.$emit('select',this.cardid)
        }
    }
}
</script>

<style>
.sp-chip{
    width: fit-content;
    background-color: white;
    border-radius: 12px;
    margin-right : 9px;
    margin-left : 9px;
    margin-bottom : 7px;
    padding: 8px 12px;
    cursor: pointer;
}
.sp-active{
    background-color: #E9ECF2;
}
</style>