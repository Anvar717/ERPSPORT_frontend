<template>
  <div>
    <CInput
        :placeholder="$t('search')"
        autocomplete="text"
        v-model="displayValue"
        v-on:keyup.enter="Search"
        ref="search"
        >
        <template #append>
            <CButton
                @click="clear"
                size="sm"
                variant="outline"
                type="button"
                color="danger"
                >
                <b-icon icon="x"></b-icon>
                {{ $t("clear") }}
            </CButton>
            <CButton
                @click="Search"
                size="sm"
                variant="outline"
                type="button"
                color="primary"
                >
                <b-icon icon="search"></b-icon>
                {{ $t("search") }}
            </CButton>
        </template>
    </CInput>
  </div>
</template>

<script>
export default {
    props: {
        value : {}  
    },
    data() {
        return {
            filter: {
                Search : ""
            }
        }
    },
    computed: {
        displayValue: {
            get: function() {
                return this.value
            },
            set: function (val) {
                this.$emit('input',val)
            }
        }
    },
    methods: {
        Search() {
            this.$emit('search',this.displayValue)
        },
        clear() {
            this.displayValue = ""
             this.$emit('search',this.displayValue)
        }
    }
}
</script>

<style>

</style>