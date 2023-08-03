<template>
  <b-overlay :show="loading">
    <!-- <b-container style="border:1px solid #eee"> -->
    <b-row>
      <b-col style="position:relative">
        <!-- <p class="text-center mb-1 mt-3" style="font-size : 22px">
          {{ $t("reference") }}
        </p> -->
        <p class="text-center mb-4" style="font-size : 22px">
          <b> {{ items.permanentAssetInfo.fullname }} </b
          ><span
            >({{
              $options.filters.currency(
                items.permanentAssetIntakeInfo.quantity,
                {
                  symbol: "",
                  fractionCount: 0,
                }
              )
            }}
            {{ items.permanentAssetInfo.unitofmeasurename }})</span
          >
        </p>
        <!-- <b-card
          bg-variant="light"
          style="width:140px;height:160px;position:absolute;right : 0;top : 0"
        > -->
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col>
        <img
          style="width:100%;height:250px;"
          :src="
            axios.defaults.baseURL +
              `FileManage/Get?id=${items.permanentAssetInfo.brand.attachmentfileid}`
          "
        />
      </b-col>
      <b-col sm="12" lg="10" md="10">
        <b-card style="font-size : 16px">
          <b-row>
            <b-col sm="12" md="3" lg="3">
              <b> {{ $t("inventorynumber") }} </b>
            </b-col>
            <b-col class="text-right">
              {{ items.permanentAssetInfo.inventorynumber }}
            </b-col>
            <b-col sm="12" md="3" lg="3">
              <b> {{ $t("asboid") }} :</b>
            </b-col>
            <b-col class="text-right">
              {{ items.permanentAssetInfo.asboid }}
            </b-col>
          </b-row>

          <b-row class="mt-1">
            <b-col sm="12" md="3" lg="3">
              <b> {{ $t("pagroup") }}: </b>
            </b-col>
            <b-col class="text-right">
              {{ items.permanentAssetInfo.pagroupname }}
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col sm="12" md="3" lg="3">
              <b> {{ $t("pasubrroup") }} :</b>
            </b-col>
            <b-col class="text-right">
              {{ items.permanentAssetInfo.pasubrroupname }}
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col sm="12" md="3" lg="3">
              <b> {{ $t("deliverydate") }} :</b>
            </b-col>
            <b-col class="text-right">
              {{ items.permanentAssetInfo.deliverydate }}
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col sm="12" md="6" lg="6">
              <b> {{ $t("implementationdate") }} :</b>
            </b-col>
            <b-col class="text-right">
              {{ items.permanentAssetInfo.implementationdate }}
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col sm="12" md="6" lg="6">
              <b> {{ $t("retirementdate") }} :</b>
            </b-col>
            <b-col class="text-right">
              {{ items.permanentAssetInfo.retirementdate }}
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col> </b-col>
      <b-col sm="12" lg="10" md="10">
        <!-- bg-variant="light" -->
        <b-card style="font-size : 16px">
          <b-row>
            <b-col sm="12" md="4" lg="4">
              <b> {{ $t("Manufacturer") }} </b>
            </b-col>
            <b-col class="text-right">
              {{ items.permanentAssetInfo.manufaturername }}
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col sm="12" md="4" lg="4">
              <b> {{ $t("manufacturercountry") }} :</b>
            </b-col>
            <b-col class="text-right">
              {{ items.permanentAssetInfo.manufacturercountryname }}
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col sm="12" md="4" lg="4">
              <b> {{ $t("productclassification") }} </b>
            </b-col>
            <b-col class="text-right">
              {{ items.permanentAssetInfo.productclassificationname }}
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col sm="12" md="4" lg="4">
              <b> {{ $t("brand") }} :</b>
            </b-col>
            <b-col class="text-right">
              {{ items.permanentAssetInfo.brand.fullname }}
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col sm="12" md="4" lg="4">
              <b> {{ $t("seriesnumber") }} </b>
            </b-col>
            <b-col class="text-right">
              {{ items.permanentAssetInfo.seriesnumber }}
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col sm="12" lg="12" md="12">
        <b-card style="font-size : 16px">
          <b-row>
            <b-col>
              <b> {{ $t("quantity") }} :</b>
            </b-col>
            <b-col class="text-right">
              {{
                $options.filters.currency(
                  items.permanentAssetIntakeInfo.quantity,
                  {
                    symbol: "",
                    fractionCount: 0,
                  }
                )
              }}
            </b-col>
            <b-col></b-col>
            <b-col></b-col>
          </b-row>
          <b-row>
            <b-col>
              <b> {{ $t("lastrepairsum") }} :</b>
            </b-col>
            <b-col class="text-right">
              {{
                $options.filters.currency(
                  items.permanentAssetIntakeInfo.lastrepairsum,
                  {
                    symbol: "",
                    fractionCount: 2,
                  }
                )
              }}
            </b-col>
            <b-col></b-col>
            <b-col></b-col>
          </b-row>
          <b-row>
            <b-col>
              <b> {{ $t("amount") }} </b>
            </b-col>
            <b-col class="text-right">
              {{
                $options.filters.currency(
                  items.permanentAssetIntakeInfo.amount,
                  {
                    symbol: "",
                    fractionCount: 2,
                  }
                )
              }}
            </b-col>
            <b-col></b-col>
            <b-col></b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col class="text-center"
              ><b>{{ $t("PermanentAssetIntakeRepairTables") }}</b></b-col
            >
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <b-table-simple responsive bordered striped>
                <b-thead>
                  <b-tr class="headStyle">
                    <b-th>
                      {{ $t("№") }}
                    </b-th>
                    <b-th>
                      {{ $t("contractorname") }}
                    </b-th>
                    <b-th>
                      {{ $t("equipmentconditiontype") }}
                    </b-th>
                    <b-th>
                      {{ $t("repairtypename") }}
                    </b-th>
                    <b-th>
                      {{ $t("sourceoffinancename") }}
                    </b-th>
                    <b-th>
                      {{ $t("lastrepairdate") }}
                    </b-th>
                  </b-tr>
                </b-thead>
                <b-tbody
                  v-for="(item, index) in items.permanentAssetIntakeInfo
                    .PermanentAssetIntakeRepairTables"
                  :key="index"
                >
                  <b-tr>
                    <b-td>{{ item.id }}</b-td>
                    <b-td>{{ item.contractorname }}</b-td>
                    <b-td>{{ item.equipmentconditiontypename }}</b-td>
                    <b-td>{{ item.repairtypename }}</b-td>
                    <b-td>{{ item.sourceoffinancename }}</b-td>
                    <b-td>{{ item.lastrepairdate }}</b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col class="text-center"
              ><b>{{ $t("PermanentAssetIntakeMetrologicalTables") }}</b></b-col
            >
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <b-table-simple responsive bordered striped>
                <b-thead>
                  <b-tr class="headStyle">
                    <b-th>
                      {{ $t("№") }}
                    </b-th>
                    <b-th>
                      {{ $t("contractorname") }}
                    </b-th>
                    <b-th>
                      {{ $t("certificatedate") }}
                    </b-th>
                    <b-th>
                      {{ $t("certificatenumber") }}
                    </b-th>
                    <b-th>
                      {{ $t("sourceoffinancename") }}
                    </b-th>
                    <b-th>
                      {{ $t("nextmetrologydate") }}
                    </b-th>
                    <b-th>
                      {{ $t("expiredate") }}
                    </b-th>
                  </b-tr>
                </b-thead>
                <b-tbody
                  v-for="(item, index) in items.permanentAssetIntakeInfo
                    .PermanentAssetIntakeMetrologicalTables"
                  :key="index"
                >
                  <b-tr>
                    <b-td>{{ item.id }}</b-td>
                    <b-td>{{ item.contractorname }}</b-td>
                    <b-td>{{ item.certificatedate }}</b-td>
                    <b-td>{{ item.certificatenumber }}</b-td>
                    <b-td>{{ item.sourceoffinancename }}</b-td>
                    <b-td>{{ item.nextmetrologydate }}</b-td>
                    <b-td>{{ item.expiredate }}</b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col> </b-col>
    </b-row>
    <!-- </b-container> -->
  </b-overlay>
</template>

<script>
import FileManageService from "@/services/filemanage.service";
import axios from "axios";
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Object,
    },
  },
  data() {
    return {
      axios,
    };
  },
};
</script>

<style>
.headStyle {
  background-color: #c6e2ff;
}
</style>
