<template>
  <div
    class="custom-datepicker"
    :class="{ 'my-datepicker-disabled': disabled }"
  >
    <label for="" v-if="label"> {{ label }} </label>
    <date-picker
      v-model="inputVal"
      format="DD.MM.YYYY"
      type="date"
      @change="onChange"
      input-class="my-custom-date "
      :clearable="true"
      :disabled="disabled"
      :disabled-date="disabledDate"
      lang="ru"
      style="width: 100%"
    >
      <template #input>
        <b-form-input
          :disabled="disabled"
          @keyup="onKeyup"
          @input="Change"
          :placeholder="placeholder"
          v-mask="'##.##.####'"
          type="text"
          maxlength="10"
          v-model="value"
          class="my-custom-date"
        />
      </template>
    </date-picker>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
// import uz from "../components/Uz_datepickr";
// import ru from "vue2-datepicker/locale/ru";
import { BFormInput } from "bootstrap-vue";
export default {
  components: { DatePicker, BFormInput },
  props: {
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    disabledDate: {},
    value: {},
  },
  data() {
    return {
      value1: "",
      // uz,
      // ru,
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {},
  computed: {
    inputVal: {
      get() {
        console.log(this.value)
        var arr = !!this.value ? this.value.split(".") : "";

        return arr != "" ? new Date(arr[2], arr[1] - 1, arr[0]) : this.value;
        // return !!this.value ? this.value.replaceAll(".","") : ''
        // return this.value.replaceAll(".","") 
      },
      set(val) {
        if (val) {
          var dd = String(val.getDate()).padStart(2, "0");
          var mm = String(val.getMonth() + 1).padStart(2, "0");
          var yy = val.getFullYear();
          this.value1 = `${dd}.${mm}.${yy}`;
          this.$emit("input", `${dd}.${mm}.${yy}`);
        }
      },
    },
  },
  methods: {
    onChange() {
      var a = this.value
      this.inputVal = `${a[0]}${a[1]}.${a}`
      console.log(this.value,'s')
      console.log(this.inputVal,'rt')
      this.$emit('change', this.value)  
    },
    dateMask(value) {
      const day = [/[0-3]/, value.charAt(0) == 0 ? /[1-9]/ : value.charAt(0) == 3 ? /[0-1]/ : /[0-9]/]
      const month = [/[0-1]/, value.charAt(3) == 0 ? /[1-9]/ : /[0-2]/]
      const year = [/[1-2]/, value.charAt(6) == 1 ? /[9-9]/ : /[0-1]/, /[0-9]/, /[0-9]/]
      return [...day,'.',...month,'.',...year]
    },
    onKeyup() {
      // var dateLength = this.value.length
      // if (dateLength > 1) {
      //   var day = this.value.slice(0, 2)
      //   if (day > 31) {
      //     this.value[0] = '3'
      //     this.value[1] = '1'
      //   }
      //   if (day == '00') {
      //     this.inputVal[0] = 0
      //     this.inputVal[1] = 1
      //   }
      // }
      // if (dateLength > 4) {
      //   var month = this.value.slice(3, 5)
      //   if (month > 12) {
      //     this.inputVal[3] = 1
      //     this.inputVal[4] = 2
      //   }
      //   if (day == '00') {
      //     this.inputVal[3] = 0
      //     this.inputVal[4] = 1
      //   }
      // }
      // if (dateLength > 9) {
      //   var year = this.value.slice(6, 10)
      //   if (day < 1900) {
      //     this.inputVal[6] = 1
      //     this.inputVal[7] = 9
      //     this.inputVal[8] = 0
      //     this.inputVal[9] = 0
      //   }
      // }
      this.$emit('keyup', this.value)  
    },
    Change() {},
    handleInput() {
      this.$emit("input", this.value);
      // alert(this.value)
    },
  },
  watch: {
    value: {
      handler(newValue) {
        this.value1 = newValue;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~vue2-datepicker/scss/index.scss";
</style>
