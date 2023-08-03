<template>
  <b-overlay :show="loading">
    <b-container style="border: 1px solid #eee" v-if="items.id">
      <b-row>
        <b-col style="position: relative">
          <p class="text-center mb-4 mt-3" style="font-size: 20px">
            {{ $t("reference") }}
          </p>
          <p class="text-center mb-4" style="font-size: 18px">
            <b> {{ items.fullname }} </b>
          </p>
          <p
            class="text-center"
            style="font-size: 18px"
            v-if="studentdochistory.length > 0"
          >
            <!-- {{ history.length > 0 ? history[history.length-1].oblastname + ',' + history[history.length-1].regionname + ',' + history[history.length-1].organization + ',' + history[history.length-1].schoolgrade : ''}},  -->
            {{ studentdochistory[0].organizationname }}
          </p>
          <b-card
            bg-variant="light"
            style="
              width: 140px;
              height: 160px;
              position: absolute;
              right: 0;
              top: 0;
            "
          >
            <!-- <img
                          v-if="isImage"
                          :src="!! personPhoto.attachmentfileid ?
                            axios.defaults.baseURL +
                            'FileManage/Get?id=' +
                            personPhoto.attachmentfileid:'data:image/jpg;base64,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'
                          "
                          class="img-thumbnail float-end"
                          fluid
                          style="width: 150px; height: 180px; object-fit: cover"
                        /> -->
            <img
              :src="
                items.PersonPhoto && !!items.PersonPhoto.attachmentfileid
                  ? axios.defaults.baseURL +
                    'FileManage/Get?id=' +
                    items.PersonPhoto.attachmentfileid
                  : 'data:image/jpg;base64,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'
              "
              class="img-thumbnail float-end"
              fluid
              style="
                width: 150px;
                height: 160px;
                object-fit: cover;
                max-width: 160px !important;
                margin-top: -21px;
                margin-left: -30px;
              "
            />
          </b-card>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <b-card bg-variant="light" style="font-size: 16px">
            <b-row>
              <b-col>
                <b> {{ $t("citizenship") }} </b>
              </b-col>
              <b-col class="text-right">
                {{ items.citizenshipname }}
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <b> {{ $t("nationality") }} :</b>
              </b-col>
              <b-col class="text-right">
                {{ items.nationalityname }}
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col> </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <b-card bg-variant="light" style="font-size: 16px">
            <b-row>
              <b-col>
                <h5 class="text-center">{{ $t("AddressPlace") }}</h5>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <h5>{{ $t("birthcountry") }}</h5>
              </b-col>
              <b-col class="text-right">
                {{ items.birthcountryname }}
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <h5>{{ $t("birthoblast") }}</h5>
              </b-col>
              <b-col class="text-right">
                {{ items.birthoblastname }}
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <h5>{{ $t("birthregion") }}</h5>
              </b-col>
              <b-col class="text-right">
                {{ items.birthregionname }}
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <h5>{{ $t("dateofbirth") }}</h5>
              </b-col>
              <b-col class="text-right">
                {{ items.dateofbirth }}
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col>
          <b-card bg-variant="light" style="font-size: 16px">
            <b-row>
              <b-col>
                <h5 class="text-center">{{ $t("InfoLivePlace") }}</h5>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <h5>{{ $t("oblastname") }}</h5>
              </b-col>
              <b-col class="text-right">
                {{ items.LivePlaceTables[0].oblastname }}
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <h5>{{ $t("regionname") }}</h5>
              </b-col>
              <b-col class="text-right">
                {{ items.LivePlaceTables[0].regionname }}
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <h5>{{ $t("mfyname") }}</h5>
              </b-col>
              <b-col class="text-right">
                {{ items.LivePlaceTables[0].mfyname }}
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <h5>{{ $t("address") }}</h5>
              </b-col>
              <b-col class="text-right">
                {{ items.LivePlaceTables[0].address }}
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card bg-variant="light">
            <b-row class="text-center">
              <b-col>
                <h5>{{ $t("birthdocument") }}</h5>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <h5>{{ $t("documentseries") }}</h5>
              </b-col>
              <b-col>
                <h5 class="text-center">{{ $t("documentnumber") }}</h5>
              </b-col>
              <b-col>
                <h5 class="text-right">{{ $t("dateofissue") }}</h5>
              </b-col>
            </b-row>
            <b-row style="font-size: 16px">
              <b-col>
                {{ items.DocumentTables[0].documentseries }}
              </b-col>
              <b-col class="text-center">
                {{ items.DocumentTables[0].documentnumber }}
              </b-col>
              <b-col class="text-right">
                {{ items.DocumentTables[0].dateofissue }}
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card bg-variant="light" style="font-size: 16px">
            <b-row>
              <b-col>
                <h5 class="text-center">{{ $t("personrelative") }}</h5>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <h5>{{ $t("kinshipdegree") }}</h5>
              </b-col>
              <b-col class="text-center">
                <h5>{{ $t("familyname") }}</h5>
              </b-col>
              <b-col class="text-center">
                <h5>{{ $t("firstname") }}</h5>
              </b-col>
              <b-col class="text-center">
                <h5>{{ $t("lastname") }}</h5>
              </b-col>
              <b-col class="text-center">
                <h5>{{ $t("dateofbirth") }}</h5>
              </b-col>
            </b-row>
            <b-row
              v-for="(item, key) in items.PersonRelativeTables"
              :key="key"
              class="mt-2"
            >
              <b-col>
                {{ item.kinshipdegreename }}
              </b-col>
              <b-col class="text-center">
                {{ item.familyname }}
              </b-col>
              <b-col class="text-center">
                {{ item.firstname }}
              </b-col>
              <b-col class="text-center">
                {{ item.lastname }}
              </b-col>
              <b-col class="text-center">
                {{ item.dateofbirth }}
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card bg-variant="light" style="font-size: 16px">
            <b-row>
              <b-col>
                <h5 class="text-center">{{ $t("studenthistory") }}</h5>
              </b-col>
            </b-row>
            <b-row v-for="(item, key) in history" :key="key + 'history'">
              <b-col>
                <h5>{{ item.startdate }} - {{ item.enddate }}</h5>
              </b-col>
              <b-col> {{ item.organization }} , {{ item.schoolgrade }} </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </b-overlay>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Object,
    },
    history: {
      type: Array,
    },
    studentdochistory: {
      type: Array,
    },
  },
};
</script>

<style>
</style>