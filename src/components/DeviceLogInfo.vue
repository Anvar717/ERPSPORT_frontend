<template>
  <CCard>
    <CCardHeader>
      <CRow>
        <CCol>
          <h5 class="float-left">{{ $t("devicelog") }}</h5>
        </CCol>
      </CRow>
    </CCardHeader>
    <CCardBody>
      <CRow>
        <CCol class="mobileStyle p-0 mx-2">
           <div class="table-container">
          <table class="table table-bordered ">
            <thead>
              <tr>
                <th
                  rowspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("OrderNumber") }}
                  <!-- {{ $t("totalschools") }} -->
                </th>
                <th
                  colspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("devicelog") }}
                  <!-- {{ $t("Included") }} -->
                </th>
                <th
                  colspan="3"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("about") }}
                  <!-- {{ $t("Included") }} -->
                </th>
                <th
                  colspan="3"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("image") }}
                  <!-- {{ $t("Included") }} -->
                </th>
              </tr>
              <tr>
                 <th style="text-align: center; vertical-align: middle">                  
                  {{ $t("id") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("name") }}
                </th>
                <th style="text-align: center; vertical-align: middle">                  
                  {{ $t("date") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("uploading") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("uploaderror") }}
                </th>
                 <th style="text-align: center; vertical-align: middle">                  
                  {{ $t("date") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("uploading") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("uploaderror") }}
                </th>
              </tr>
            </thead>
            <tbody v-if="!Loading">
              <tr
                v-for="(item, i) in devicelog"
                style="text-align: center; vertical-align: middle"
                :key="i"
              >
                <td>
                  {{ i + 1 }}
                </td>
                <td>
                  {{
                   item.orgtourniquetdeviceid
                  }}
                </td>
                 <td>
                  {{
                   item.orgtourniquetdevicecode
                  }}
                </td>
                 <td>
                  {{
                   item.dateofmodifieddata
                  }}
                </td>
                 <td>
                   <div v-if="lang == 'ru'">
                      <b-badge :variant="getItemColor(item.isdataupload)">{{
                        item.isdataupload ? "Да" : "Нет"
                      }}</b-badge>
                    </div>
                    <div v-if="lang == 'uz_latn'">
                      <b-badge :variant="getItemColor(item.isdataupload)">{{
                        item.isdataupload ? "Ha" : "Yoq"
                      }}</b-badge>
                    </div>
                    <div v-if="lang == 'uz_cyrl'">
                      <b-badge :variant="getItemColor(item.isdataupload)">{{
                        item.isdataupload ? "Ҳа" : "Йўқ"
                      }}</b-badge>
                    </div>
                </td>
                 <td>
                  {{
                   item.datauploaderrormessage
                  }}
                </td>
                 <td>
                  {{
                   item.dateofmodifiedpicture
                  }}
                </td>
                 <td>
                   <div v-if="lang == 'ru'">
                      <b-badge :variant="getItemColor(item.ispictureupload)">{{
                        item.ispictureupload ? "Да" : "Нет"
                      }}</b-badge>
                    </div>
                    <div v-if="lang == 'uz_latn'">
                      <b-badge :variant="getItemColor(item.ispictureupload)">{{
                        item.ispictureupload ? "Ha" : "Yoq"
                      }}</b-badge>
                    </div>
                    <div v-if="lang == 'uz_cyrl'">
                      <b-badge :variant="getItemColor(item.ispictureupload)">{{
                        item.ispictureupload ? "Ҳа" : "Йўқ"
                      }}</b-badge>
                    </div>
                </td>
                 <td>
                  {{
                   item.pictureuploaderrormessage
                  }}
                </td>
              </tr>
            </tbody>
            <tbody v-if="Loading">
              <tr>
                <td class="text-center" colspan="19">
                  <b-spinner></b-spinner>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
        </div>
        </CCol>
        <!--<CCol></CCol>-->
      </CRow>
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  props: {
    devicelog: {
      type: Array,
    },
  },
  data() {
    return {
        Loading: false,
       lang: localStorage.getItem("locale") || "ru",
    };
  },
  methods: {
     getItemColor(text) {
      return text === "Актив"
        ? "success"
        : text === "Пассив"
        ? "danger"
        : text === "Aktiv"
        ? "success"
        : text === "Passiv"
        ? "danger"
        : text === "Утвержден"
        ? "success"
        : text === "Отменено"
        ? "danger"
        : text === true
        ? "success"
        : text === false
        ? "danger"
        : "primary";
    },
  },
};
</script>

<style></style>
