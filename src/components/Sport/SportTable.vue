<template>
  <div>
    <div  :class="`sp-table d-flex`" >
        <div  class="sp-field juftify-content-between" v-for="(field,fieldIndex) in fields" :key="'field' + fieldIndex" :style="field.style" :class="field.class">
            <label for="" style=""> {{ field.label }} </label>
            <!-- <span> {{ item[field.key] }} </span> -->
        </div>
    </div>
    <div  v-for="(item,index) in items" :key="index" :class="`sp-table d-flex ${oblastid == item[idkey] ? 'sp-active ' : '' }`" @click="SelectOblast(item)">
        <div style="cursor:pointer" class="sp-field juftify-content-between" v-for="(field,fieldIndex) in fields" :key="'field' + fieldIndex" :style="field.style" :class="field.class">
            <!-- <label for=""> {{ field.label }} </label> -->
            <span style="font-size: 14px;"> {{ item[field.key] }} </span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props :{
        items : {
            type : Array,
            default : []
        },
        fields : {
            type : Array,
            default : []
        },
        active : {},
        idkey : {}
    },
    data(){
        return{
            oblastid : null
        }
    },
    created(){
        this.oblastid = this.active
    },
    methods:{
        SelectOblast(item){
            this.oblastid = item[this.idkey]
            this.$emit('select',this.oblastid)
        }
    }
    
}
</script>

<style>
.sp-table{
    width: 100%;
    height: fit-content;
    background-color: white;
    border-radius: 12px;
    padding: 0px 12px 0px 16px;
    margin-bottom: 8px;
}
.sp-field{
    display: grid;
    padding: 7px;
}
.sp-field label {
    margin-bottom: 0;
    color: #707070;
    font-size: 10pt;
}
.sp-field span{
    font-size: 12pt;
}
.sp-active{
    background-color: #E9ECF2;
}
</style>