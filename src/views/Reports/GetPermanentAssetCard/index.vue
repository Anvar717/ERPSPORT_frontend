<template>
  <b-container fluid>
    <b-card>
      <b-row>
        <b-col>
          <h4 class="text-center mb-3">{{ $t("GetPermanentAssetCard") }}</h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="4" lg="4">
          <div class="d-flex">
            <b-input-group>
              <b-form-input
                v-model="filter.inventoryNumber"
                v-on:keyup.enter="Refresh"
                :placeholder="$t('inventorynumber')"
              ></b-form-input>
              <b-input-group-append>
                <b-button
                  @click="Refresh"
                  variant="outline-info"
                  style="white-space: nowrap"
                >
                  <b-icon v-if="!Loading" icon="search"> </b-icon>
                  <b-spinner small v-if="Loading"></b-spinner>
                  {{ $t("search") }}
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </div>
        </b-col>
        <b-col sm="12" md="4" lg="4"></b-col>
        <b-col sm="12" md="4" lg="4" class="text-right">
          <b-button
            variant="outline-danger"
            class="mr-2"
            @click="$router.back()"
          >
            <b-icon icon="arrow-left-short"></b-icon> {{ $t("gotodashboard") }}
          </b-button>
        </b-col>
      </b-row>
    </b-card>
    <b-card>
      <b-row class="mb-3">
        <b-col>
          <!-- <b-tabs pills card>
            <b-tab :title="$t('permanentAssetInfo')" active> -->
          <permanent-asset-card :loading="Loading" :items="items">
          </permanent-asset-card>
          <!-- </b-tab>
          </b-tabs> -->
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import IdentityDocumentService from "@/services/IdentityDocument.service";
import StudentManageService from "@/services/StudentManage.service";
import PermanentAssetCard from "@/components/PermanentAssetCard.vue";
import PersonService from "@/services/person.service";
import PermanentAssetService from "@/services/PermanentAsset.service";
export default {
  components: { PermanentAssetCard },
  data() {
    return {
      filter: {
        inventoryNumber: "",
      },
      permanentAssetIntakeInfo: {},
      Loading: false,
      items: {},
      history: [],
    };
  },
  created() {
    IdentityDocumentService.GetAllIdentityDocSeries(1).then((res) => {
      this.DocumentSeriesList = res.data.result;
    });
    IdentityDocumentService.GetAll().then((res) => {
      this.DocumentTypeList = res.data.result;
    });
    if (!!this.$route.query.inventorynumber) {
      this.filter.inventoryNumber = this.$route.query.inventorynumber;
      this.Refresh();
    }
  },
  methods: {
    getItemColor(text) {
      return text === "Актив"
        ? "success"
        : text === "Пассив"
        ? "danger"
        : text === "Утвержден"
        ? "success"
        : text === "Отменено"
        ? "danger"
        : "primary";
    },

    Refresh() {
      this.Loading = true;
      PermanentAssetService.GetPermanentAssetCard(this.filter.inventoryNumber)
        .then((res) => {
          this.Loading = false;
          this.items = res.data.result;
          this.filter.inventoryNumber = "";
        })
        .catch((err) => {
          this.makeToast(
            err.response.data.error || error,
            this.$t("error"),
            "danger"
          );
          this.Loading = false;
        });
    },
    makeToast(message, title, type) {
      var self = this;
      self.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    ChangeDocumentType() {
      this.filter.DocumentSeries = "";
      this.filter.DocumentNumber = "";
      this.filter.DateOfBirth = "";
    },
  },
};
</script>

<style></style>
