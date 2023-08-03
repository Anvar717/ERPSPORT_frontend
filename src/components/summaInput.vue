<template>
  <div class="el-input">
    <input type="tel" :maxlength="maxLength" v-model="getModel" v-mask="salaryMask" :placeholder="placeholder" class="el-input__inner" style="text-align:right">
  </div>
  <!-- <el-input v-model="model" v-mask="salaryMask" :placeholder="placeholder" /> -->
</template>

<script>
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
const salaryMask = createNumberMask({
  prefix: '',
  allowDecimal: true,
  thousandsSeparatorSymbol: ' ',
  includeThousandsSeparator: true,
  allowNegative: false,
});
export default {
  props:{
    value: {
      type: [String, Number]
    },
    placeholder: {
      type: String
    },
    maxLength: {
      type: Number,
      default: 21
    },
    mask: {
      type: String,
      default: ''
    },
  },
  data(){
    return {
      salaryMask,
      model: ''
    }
  },
  computed: {
    getModel: {
      get() {
        return this.model == 0 ? '' : this.model;
      },
      set(value) {
        this.model = value
      }
    }
  },
  watch: {
    model(val){
      let value = String(val).replace(/\s/g, '');
      if(this.value != value){
        this.$emit('input', value);
      }
    }
  },
  mounted(){
    // this.model = String(this.value).split('.')[0];
    if (this.mask) {
      this.salaryMask = this.mask
    }
  },
}
</script>
