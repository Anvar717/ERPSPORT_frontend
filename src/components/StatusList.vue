<template>
    <b-button-group @click="$emit('refresh',status)" size="sm" class="sportTitle-btn-group">
        <b-button @click="status = 0" :variant="status == 0 ? 'primary' : 'outline-primary'
            ">
            {{ $t("All") }}
        </b-button>
        <b-button @click="status = 1" :variant="status == 1 ? 'primary' : 'outline-primary'
            ">
            {{ $t("AllNew") }}
        </b-button>
        <b-button @click="status = 4" :variant="status == 4 ? 'primary' : 'outline-primary'
            ">
            {{ $t("edited") }}
        </b-button>
        <b-button @click="status = 2" :variant="status == 2 ? 'primary' : 'outline-primary'
            ">
            {{ $t("accepted") }}
        </b-button>
        <b-button @click="status = 3" :variant="status == 3 ? 'primary' : 'outline-primary'
            ">
            {{ $t("canceled1") }}
        </b-button>
    </b-button-group>
</template>
<script>
export default {
    data() {
        return {
            status : 0
        }
    }
}
</script>
<style></style>