<template>
  <CCard>
    <CCardHeader>
      <CRow>
        <CCol>
          <h5 class="float-left">{{ $t("history") }}</h5>
        </CCol>
      </CRow>
    </CCardHeader>
    <CCardBody>
      <CRow>
        <CCol>
          <ul class="timeline">
            <li v-for="(item, index) in history" :key="index">
              <CRow>
                <CCol class="ml-4 float-left">
                  <p class="ml-4" style="white-space:nowrap;width:100%">
                    <CBadge
                      style="color:white"
                      class="mt-n1"
                      :color="getColor(item.statusname)"
                      >{{ item.statusname }}
                    </CBadge>
                    - {{ item.userinfo }}({{ item.username }})
                    <span
                      style="vertical-align:middle"
                      class="float-right mr-4"
                      >{{ item.dateofcreated }}</span
                    >
                  </p>
                  <p
                    class="ml-4 mt-n3"
                    style="white-space:nowrap;width:100%;color:blue"
                  >
                    {{ item.organizationinfo }}
                  </p>
                  <p
                    v-if="!!item.returnreason"
                    class="ml-4 mt-n3"
                    style="white-space:nowrap;width:100%"
                  >
                    {{ item.returnreason }}
                  </p>
                  <p style="color:blue" class="ml-4 mt-n3">
                    {{ item.adddata }}
                  </p>
                </CCol>
                <!--<CCol sm="2" class="ml-4 float-right">
                                    <p style="color:blue" class="ml-4 float-right">{{ item.dateofcreated }}</p>
                                    
                                </CCol>-->
                <!--<CCol sm="3" class="ml-4 float-left">
                                    <p style="color:blue" class="ml-4 float-right">{{ item.userinfo }}({{ item.username }})</p>                                          
                                </CCol>-->
                <!--<CCol sm="3" class="ml-4 float-left">
                                    <p style="color:blue" class="ml-4 float-right">{{ item.organizationinfo }}</p>                                          
                                </CCol>-->
                <!--<CCol sm="3" class="ml-4 float-left">
                                    <p style="color:blue" class="ml-2 float-right">{{ item.adddata }}</p>                                          
                                </CCol>-->

                <!--<CCol ></CCol>-->
              </CRow>
            </li>
          </ul>
        </CCol>
        <!--<CCol></CCol>-->
      </CRow>
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  props: {
    history: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  methods: {
    getColor(i) {
      if (i === "Утвержден" || i === "Принято" || i == "Одобрен") {
        return "success";
      }
      if (i === "Отправлен" || i === "Доставлен") {
        return "warning";
      }
      if (i === "Yuborilgan" || i === "Юборилган" || i === "Отправлен") {
        return "warning";
      }
      if (i === "Rad etilgan" || i === "Рад этилган" || i === "Отклонен") {
        return "danger";
      }
      else {
        if (i === "Не принято" || i === "Отменено") {
          return "danger";
        } else {
          return "primary";
        }
      }
    },
  },
};
</script>

<style></style>
