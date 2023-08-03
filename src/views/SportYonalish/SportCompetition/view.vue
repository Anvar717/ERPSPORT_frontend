<template>
  <b-overlay :show="show">
    <b-card class="mt-3">
      <b-row>
        <b-col sm="12" md="3">
          <b-button variant="danger" @click="$router.push({ name : 'SportCompetition' })"> {{ $t('back') }}</b-button>
        </b-col>
        <b-col sm="12" md="6">
          <h3 class="text-center w-100">{{ $t("SportCompetition") }} : <span style="font-size:22px">  {{ this.mainPart.docnumber  }}  {{  this.mainPart.competitionname  }} </span>  </h3>
        </b-col>
        <b-col sm="12" md="3" class="text-right">
          <b-button variant="primary" @click="printWindow"> {{ $t('Print') }}</b-button>
        </b-col>
      </b-row>
      <!--  -->
      <el-timeline id="timelineVertical" class="timelineVertical mt-3">
        <el-timeline-item v-for="(item,index) in SportCompetition.Steps" :timestamp="item.shortname" placement="top" :key="index">
          <el-card>
            <div v-if="item.ordernumber == 1">
              <b-row>
                <b-col>
                  <h4>{{ $t("SportCompetition") }}</h4>
                </b-col>
                <b-col class="text-right">
                  <b-button variant="success" v-if="mainPart.statusid !=2" class="mr-2" @click="AcceptMainPart"> {{ $t('finishCompetition') }} </b-button>
                  <el-tag v-else type="success">{{ mainPart.statusname }}</el-tag>
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col sm="12" md="4" class="mt-2">
                  <table>
                    <tbody>
                      <tr>
                        <td> {{ $t("sportcompetitiontype") }} :</td>
                        <th> {{ mainPart.sportcompetitiontypename }} </th>
                      </tr>
                      <tr>
                        <td> {{ $t("docnumber") }} :</td>
                        <th> {{ mainPart.docnumber }} </th>
                      </tr>
                      <tr>
                        <td> {{ $t("Sport turi") }} :</td>
                        <th> {{ mainPart.sporttypeclassifiername }} </th>
                      </tr>
                      <tr>
                        <td> {{ $t("SportEvent") }} :</td>
                        <th> {{ mainPart.sporteventname }} </th>
                      </tr>
                    </tbody>
                  </table>
                </b-col>
                <b-col sm="12" md="4" class="mt-2">
                  <table>
                    <tbody>
                      <tr>
                        <td> {{ $t("ihincomedate") }} :</td>
                        <th> {{ mainPart.docdate }} </th>
                      </tr>
                      <tr>
                        <td> {{ $t("SportEventType") }} :</td>
                        <th> {{ mainPart.sporteventtypename }} </th>
                      </tr>
                      <tr>
                        <td> {{ $t("competitionname") }} :</td>
                        <th> {{ mainPart.competitionname }} </th>
                      </tr>
                    </tbody>
                  </table>
                </b-col>
                <b-col sm="12" md="4" class="mt-2">
                  <table>
                    <tbody>
                      <tr>
                        <td> {{ $t("issporteventcalendar") }} :</td>
                        <th> {{ mainPart.issporteventcalendar ? $t('yes') : $t('no') }} </th>
                      </tr>
                      <tr>
                        <td> {{ $t("competitiontype") }} :</td>
                        <th> {{ mainPart.competitiontypename }} </th>
                      </tr>
                    </tbody>
                  </table>
                </b-col>
              </b-row>
            </div>
            <div v-for="i in 15" :key="i">
              <div class="mt-2" v-if="item.ordernumber == (i + 1)">
                <component
                  :is="'step'+item.ordernumber"
                  :SportCompetition="SportCompetition"
                  @GetAction="GetAction"
                  class="componentsCard"
                  :uid="uid"
                  :sportcompetitionindicator="SportCompetition.sportcompetitionindicator"
                  isView
                />
              </div>
            </div>
          </el-card>
        </el-timeline-item>
    </el-timeline>
    </b-card>
  </b-overlay>
</template>

<script>
import { BOverlay, BCard, BRow, BCol, BFormInput, BButton, BTable} from "bootstrap-vue";
import SportCompetitionService from "@/services/SportCompetition.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import SportEventTypeService from "@/services/SportEventType.service";
import CompetitionTypeService from "@/services/CompetitionType.service";
import SportEventService from "@/services/SportEvent.service";
import DatePicker from "vue2-datepicker";
import vSelect from "vue-select";
import EmployeeList from "@/components/EmployeeList";
import PersonList from "@/components/PersonList";
import CustomDatePicker from "../../../components/customDatePicker.vue";
import CalendarPlanList from "../../../components/Musobaqa/CalendarPlanList.vue";
import HelperService from "@/services/helper.service";
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
export default {
  components: { BOverlay, BCard, BRow, BCol, BFormInput, DatePicker, vSelect, BButton, BTable, PersonList, EmployeeList, CustomDatePicker, CalendarPlanList, FormWizard, TabContent,
    step2: () => import("./components/step2.vue"),  // Musobaqaning o'tkazish joyi
    step3: () => import("./components/step3.vue"),  // Musobaqaning sport dasturlari
    step4: () => import("./components/step4.vue"),  // Ҳакамлар ҳайъати сони
    step5: () => import("./components/step5.vue"),  // Musobaqada qatnashuvchi xodimlar soni
    step6: () => import("./components/step6.vue"),  // Мусобақада қатнашувчи ташкилотлар
    step7: () => import("./components/step7.vue"),  // Musobaqa qatnashuvchilariga qo'yiladigan talablar
    step8: () => import("./components/step8.vue"),  // Musobaqaning moliyalashtirish manbalari
    step9: () => import("./components/step9.vue"),  // Musobaqa xarajatlari
    step10: () => import("./components/step10.vue"),// Hakamlar hay'ati tarkibi
    step11: () => import("./components/step11.vue"),// Musobaqaning xodimlar tarkibi
    // step12: () => import("./components/step12.vue"),// Мусобақанинг норматив хужжатлари
    step13: () => import("./components/step13.vue"),// Musobaqada qatnashuvchi sportchilar ro'yxati
    step14: () => import("./components/step14.vue"),// Musobaqa natijalarini kiritish
    step15: () => import("./components/step15.vue"),// Musobaqa g'oliblarini kiritish
  },
  data() {
    return {
      currentTabIndex: 1,
      show: false,    
      firstMainInfo:null,
      financialyearlist: [],
      sporttypeclassifierlist: [],
      sporteventtypelist: [],
      sporteventlist: [],
      oblastlist: [],
      PlanModal: false,
      SportCompetition: {},
      planvalue: {},
      lang: "ru",
      mainPart: {},
      uid: "",
    };
  },
  async created() {
    this.show = true;
    this.lang = localStorage.getItem("locale") || "ru";
    this.uid = this.$route.query.uid || ''
    SportCompetitionService.GetMainPart(this.uid).then(res => {
      this.mainPart = res.data
      this.firstMainInfo = JSON.stringify(res.data)
    })
    this.GetAction()
  
    SportTypeClassifierService.GetAll(true)
      .then((res) => {
        this.sporttypeclassifierlist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    SportEventTypeService.GetAll()
      .then((res) => {
        this.sporteventtypelist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
      this.getSportCompetitions()
      this.getSportEventList()
  },
  computed: {    
  },
  methods: {
    printWindow() {
      var printContents = document.getElementById('timelineVertical').innerHTML;
			var originalContents = document.body.innerHTML;

			document.body.innerHTML = printContents;
      var elementsToDelete = document.getElementsByClassName('el-timeline-item__tail');
      var elementsDotToDelete = document.getElementsByClassName('el-timeline-item__node');

      console.log(1, elementsDotToDelete);
      var elementsArray = Array.from(elementsToDelete);
      var elementsDotArray = Array.from(elementsDotToDelete);

      elementsArray.forEach(function(element) {
        element.remove();
      });

      elementsDotArray.forEach(function(element) {
        element.remove();
      });

			window.print();

			document.body.innerHTML = originalContents;
    },
    GetAction(){
      SportCompetitionService.Get(this.$route.query.uid)
        .then((res) => {
          this.SportCompetition = res.data;
          if (res.data.Steps.filter(element => element.isfilled == false).length) {
            let ordernumber = res.data.Steps.filter(element => element.isfilled == false)[0].ordernumber
            this.currentTabIndex = Number(ordernumber)
          } else {
            this.currentTabIndex = 0
          }
          this.show = false;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    },
    AcceptMainPart() {
      SportCompetitionService.ApproveMainPart(this.uid)
        .then((res) => {
          this.GetAction()
          this.makeToast(
            this.$t("AcceptedSuccessfully"),
            this.$t("message"),
            "success"
          );
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    },
    makeToast(message, title, type) {
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    getSportCompetitions(){
      CompetitionTypeService.GetAll(this.mainPart.sporteventtypeid, this.lang)
      .then((res) => {
        this.mainPart.competitiontypeid=null
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    },
    getSportEventList() {
      SportEventService.GetAll(
          0,
          this.mainPart.sporteventtypeid,
          this.mainPart.competitiontypeid,
          this.lang
        )
          .then((res) => {
            this.sporteventlist = res.data;
          })
          .catch((error) => {
            this.makeToast(
              error.response.data.error,
              this.$t("Error"),
              "danger"
            );
          });
    }, 
  },
};
</script>

<style lang="scss" scoped>
.overflovWidth{
  overflow: auto;
  height: 145px
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.container {
  display: flex;
  column-gap: 40px;
  max-width: 100%;
}

.scrollbar {
  height: 800px;
  width: 100%;
  overflow: auto;
  padding: 0 2px;
}
#scrollbar2::-webkit-scrollbar {
  width: 12px;
}

#scrollbar2::-webkit-scrollbar-track {
  border-radius: 8px;
  background-color: #e7e7e7;
  border: 1px solid #cacaca;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

#scrollbar2::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #363636;
}
.regProgress{
  background: #fff;
  padding: 13px 89px;
  border-radius: 8px;
  margin: 0 0 24px;
  position: relative;
  .centerLine {
    position: absolute;
    top: 50%;
    left: 90px;
    width: 145%; /* add this line */
    height: 1px;
    background: rgba(41, 71, 169, 0.2);
    z-index: 0;
  }
  ul{
    display: flex;
    padding: 0;
    z-index: 2;
    margin: 0;
    width: 170%;
    justify-content: space-between;
    position: relative;
    li{
      position: relative; /* add this line */
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 1px solid rgba(41, 71, 169, 0.2);
      background: #fff;
      list-style: none;
      // &::before{
      //   height: 5px;
      //   width: 317%;
      //   background: rgba(41, 71, 169, 0.2);
      //   content: "";
      //   position: absolute;
      //   top: 9px;
      //   z-index: -1;
      // }
      &:last-child{
        &::before{
          display: none;
        }
      }
      &.visited{
        background: #3557C2;
        box-shadow: 0 0 0 3px rgba(53, 87, 194, 0.3);
        &:before{
          background: #414C92;
        }
        &:after{
          width: 100%;
          height: 100%;
          content:"";
          display: block;
        }
      }
      &.approved{
        background: #2EB85C;
        box-shadow: 0 0 0 3px rgba(53, 87, 194, 0.3);
        &:before{
          background: #2EB85C;
        }
        &:after{
          width: 100%;
          height: 100%;
          content:"";
          display: block;
        }
      }
      &.active{
        border-color: #fff;
        box-shadow: 0px 2px 12px rgba(26, 38, 115, 0.26);
        &:after{
          width: 10px;
          height: 10px;
          background: #2947A9;
          border-radius: 50%;
          content:"";
          display: block;
          margin: 6px;
        }
      }
    }
     .label{
        position: absolute;
        top: 30px;
        right: 0;
        text-overflow: ellipsis;
        -webkit-transform: translateX(50%);
        transform: translateX(50%);
        font-size: 14px;
        color: #2947A9;
        width: 200px;
        text-align: center;
        word-wrap: break-word;
      }
  }
}
.componentsCard{
  b-row{
  .text-right {
    display: none;
  }
  }
}
</style>