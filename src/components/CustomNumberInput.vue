<template>
        <div>
           <CInput :placeholder="placeholder" :horizontal="horizontal" :label="label" :disabled="disabled" class="mb-0 CurrenyInput"  type="text" v-model="displayValue" @blur="isInputActive = false" @focus="isInputActive = true"/>
        </div>
</template>

<script>
export default {
    props: {
        value:{},
        decimals: {
            default: 2
        },
        horizontal:{
            default : false,
            type : Boolean
        },
        label:{
            default: '',
            type : String
        },
        disabled:{
            default : false,
            type : Boolean
        },
        size:{
            default : 'md',
            type : String
        },
        placeholder:{
            default: '',
            type : String
        },
    },
    data(){
        return{
            isInputActive: false
        }
    },
    computed: {
        displayValue: {
            get: function () {
                let numberdec = 3;
                if (isNaN(this.decimals) || this.decimals === null || this.decimals === '') {
                    numberdec = 3;
                }
                else {
                    numberdec = parseFloat(this.decimals);
                }
                if (this.isInputActive) {
                    // Cursor is inside the input field. unformat display value for user
                    return isNaN(this.value) || this.value === null || this.value === ''
                        ? ''
                        : this.value.toString().replace('.', ',');
                } else {
                    return isNaN(this.value) || this.value === null || this.value === ''
                        ? this.value : this.decimalToRussianF(this.value, numberdec)
                }
            },
            set: function (modifiedValue) {
                // Recalculate value after ignoring "$" and "," in user input
                let newValue = parseFloat(modifiedValue.replace(",", ".").replace(/[^.0-9a-z]/gi, ''));
                // Ensure that it is not NaN
                if (isNaN(newValue)) {
                    newValue = 0;
                }
                // Note: we cannot set this.value as it is a "prop". It needs to be passed to parent component
                // $emit the event so that parent component gets it
                this.$emit('input', newValue);
            }
        },
    },
    methods : {
            decimalToRussianF(value, fraction) {
                var number = value;
                return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: fraction, minimumFractionDigits: fraction }).format(number);
            }
        }
}
</script>

<style>
.CurrenyInput input{
    text-align: right;
}
</style>