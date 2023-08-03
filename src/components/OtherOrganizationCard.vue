<template>
  <b-overlay :show="loading" class="my-2">
    <b-row>
      <b-col sm="12" md="6">
        <b-card>
          <b-list-group>
            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("Director") }}:</p>
              <p class="ml-5" style="color:blue">
                {{ items.Director }}
              </p>
            </b-list-group-item>

            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("SchoolCreateDate") }}:</p>
              <span class="font-weight-bold">
                {{ items.docdate }}
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("YearRepair") }}:</p>
              <span class="font-weight-bold">
                {{ items.docdate }}
              </span>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
      <b-col sm="12" md="6">
        <b-card>
          <b-list-group>
            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("SectorNumber") }} :</p>
              <span class="font-weight-bold">
                {{ items.docnumber }}
              </span>
            </b-list-group-item>

            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("Location") }}:</p>
              <span class="font-weight-bold">
                {{ items.docdate }}
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("LegalAddress") }}:</p>
              <span class="font-weight-bold">
                {{ items.docdate }}
              </span>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" md="4">
        <b-card>
          <div>
            <h5 class="font-weight-bold">{{ $t("studentscount") }}</h5>
          </div>
          <b-list-group>
            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("Ўзбек синфдаги ўқувчилар сони") }} :</p>
              <span class="font-weight-bold">
                {{ items.docnumber }}
              </span>
            </b-list-group-item>

            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("Рус синфдаги ўқувчилар сони") }}:</p>
              <span class="font-weight-bold">
                {{ items.docdate }}
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("Жами") }}:</p>
              <span class="font-weight-bold">
                {{ items.docdate }}
              </span>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
      <b-col sm="12" md="4">
        <b-card>
          <div>
            <h5 class="font-weight-bold">{{ $t("NumberOfClasses") }}</h5>
          </div>
          <b-list-group>
            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("Ўзбек синфлар сони") }} :</p>
              <span class="font-weight-bold">
                {{ items.docnumber }}
              </span>
            </b-list-group-item>

            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("Рус синфлар сони") }}:</p>
              <span class="font-weight-bold">
                {{ items.docdate }}
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("Жами") }}:</p>
              <span class="font-weight-bold">
                {{ items.docdate }}
              </span>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
      <b-col sm="12" md="4">
        <b-card>
          <div>
            <h5 class="font-weight-bold">{{ $t("TeachingStaff") }}</h5>
          </div>
          <b-list-group>
            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("Шундан, олий маълумоти") }} :</p>
              <span class="font-weight-bold">
                {{ items.docnumber }}
              </span>
            </b-list-group-item>

            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("Ўрта махсус маълумотли") }}:</p>
              <span class="font-weight-bold">
                {{ items.docdate }}
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("Жами") }}:</p>
              <span class="font-weight-bold">
                {{ items.docdate }}
              </span>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" md="4">
        <b-card>
          <div>
            <h5 class="font-weight-bold">{{ $t("ByCategory") }}</h5>
          </div>
          <b-list-group>
            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("Олий тоифали") }} :</p>
              <span class="font-weight-bold">
                {{ items.docnumber }}
              </span>
            </b-list-group-item>

            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t(" I-тоифа") }}:</p>
              <span class="font-weight-bold">
                {{ items.docdate }}
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("II-тоифа") }}:</p>
              <span class="font-weight-bold">
                {{ items.docdate }}
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("Мутахассис") }}:</p>
              <span class="font-weight-bold">
                {{ items.docdate }}
              </span>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
      <b-col sm="12" md="4">
        <b-card>
          <div>
            <h5 class="font-weight-bold">{{ $t("Sequence") }}</h5>
          </div>
          <b-list-group>
            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("I-сменаги ўқувчилар сони") }} :</p>
              <span class="font-weight-bold">
                {{ items.docnumber }}
              </span>
            </b-list-group-item>

            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("II-сменадаги ўқувчилар сони") }}:</p>
              <span class="font-weight-bold">
                {{ items.docdate }}
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("Жами") }}:</p>
              <span class="font-weight-bold">
                {{ items.docdate }}
              </span>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
      <b-col sm="12" md="4">
        <b-card>
          <div>
            <h5 class="font-weight-bold">{{ $t("OtherINformation") }}</h5>
          </div>
          <b-list-group>
            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("Чет тилидан устама оладиган ўқитувчилар ") }} :</p>
              <span class="font-weight-bold">
                {{ items.docnumber }}
              </span>
            </b-list-group-item>

            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("11-синф битирувчилар сони") }}:</p>
              <span class="font-weight-bold">
                {{ items.docdate }}
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex">
              <p class="mr-1; font-weight-bold">{{ $t("ОТМга кирганлар сони") }}:</p>
              <span class="font-weight-bold">
                {{ items.docdate }}
              </span>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
  </b-overlay>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BButton,
  BSpinner,
  BTabs,
  BTab,
  BCardText,
  BModal,
  BListGroup,
  BListGroupItem,
  BTable,
  BSidebar,
  BOverlay,
  BBadge,
  BFormInput,
} from "bootstrap-vue";
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Object,
    },
    kadastr: {
      type: Array,
    },
  },
  components: {
    BRow,
    BCol,
    BCard,
    BButton,
    BSpinner,
    BTabs,
    BTab,
    BListGroup,
    BListGroupItem,
    BCardText,
    BTable,
    BSidebar,
    BModal,
    BBadge,
    BOverlay,
    BFormInput,
  },
  data() {
    return {
      kadastrfield: [
        {
          key: "cad_number",
          label: this.$t("cad_number"),
          class: "text-center",
        },
        { key: "area", label: this.$t("area"), class: "text-center" },
        { key: "district", label: this.$t("district"), class: "text-center" },
        { key: "region", label: this.$t("region"), class: "text-center" },
      ],
    };
  },
};
</script>

<style>
</style>