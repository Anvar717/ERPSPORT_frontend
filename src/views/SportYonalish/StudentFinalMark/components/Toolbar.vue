<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import OrganizationService from "@/services/organization.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
export default {
    data() {
        return {
            radio1: this.$t('all_marked_unmarked'),
            personname: "",
            OblastList: [],
            oblastid: 0,
            regionid: 0,
            organizationid: 0,
            RegionList: [],
            organizationslist: [],
        }
    },
    computed: {
        ...mapState('StudentFinalMark', ['getting_students_list']),
    },
    created() {
        this.getStudentsList()
        OblastService.GetAll().then((res) => {
            this.OblastList = res.data;
        });
        if (!!this.oblastid) {
            RegionService.GetAll(this.lang, this.oblastid).then((res) => {
                this.RegionList = res.data;
            });
        }
       
    },
    methods: {

        ...mapActions('StudentFinalMark', [
            'getStudentsList',
        ]),
        ...mapMutations('StudentFinalMark', [
            'SET_QUERY_PARAM'
        ]),
        ChangeOblast() {
            console.log("oblast changed")

            this.SET_QUERY_PARAM({ name: "regionid", value: 0 })
            this.SET_QUERY_PARAM({ name: "oblastid", value: this.oblastid })
            this.SET_QUERY_PARAM({ name: "organizationid", value: 0 })
            this.SET_QUERY_PARAM({ name: 'PageNumber', value: 1 })
            this.getStudentsList()
            this.regionid = 0;
            this.organizationid = 0;
            this.RegionList = [];
            if (!!this.oblastid) {
                RegionService.GetAll(this.lang, this.oblastid).then((res) => {
                    this.RegionList = res.data;
                });
            }
            this.getStudentsList()

        },
        changeOrg() {
            this.SET_QUERY_PARAM({ name: "organizationid", value: this.organizationid })
            this.SET_QUERY_PARAM({ name: 'PageNumber', value: 1 })
            this.getStudentsList()
        },
        changeRegion() {
            this.SET_QUERY_PARAM({ name: "regionid", value: this.regionid })
            this.SET_QUERY_PARAM({ name: "organizationid", value: 0 })
            this.SET_QUERY_PARAM({ name: 'PageNumber', value: 1 })
            OrganizationService.GetAll(
                this.oblastid,
                this.regionid,
                "",
                "",
                ""
            ).then((res) => {
                this.organizationslist = res.data;
            });
            this.getStudentsList()
        },
        setPersonName() {
            this.SET_QUERY_PARAM({ name: "Search", value: this.personname })
            this.SET_QUERY_PARAM({ name: 'PageNumber', value: 1 })
        },
        Search() {
            this.getStudentsList()
        },
        setHasMarkFilter(filter_val) {
            this.SET_QUERY_PARAM({ name: 'hasstudentfinalmark', value: false })
            switch (filter_val) {
                case this.$t('all_marked_unmarked'):
                    this.SET_QUERY_PARAM({ name: 'hasstudentfinalmark', value: null })
                    break;
                case this.$t('only_marked'):
                    this.SET_QUERY_PARAM({ name: 'hasstudentfinalmark', value: true })
                    break;
                case this.$t('not_marked'):
                    this.SET_QUERY_PARAM({ name: 'hasstudentfinalmark', value: false })
                    break;
                default:
                    break;
            }
            this.SET_QUERY_PARAM({ name: 'PageNumber', value: 1 })
            this.getStudentsList()

        }
    }
}

</script>

<template>
    <el-col>
        <el-row>
            <el-col :span="24" style="display: flex; justify-content: space-between; align-items: center">
                <!-- filters-column -->
                <div style="display: flex; flex: 1; align-items: center; gap: 1em">
                    <el-radio-group size="small" v-model="radio1" @change="setHasMarkFilter">
                        <el-radio-button :label="$t('all_marked_unmarked')"></el-radio-button>
                        <el-radio-button :label="$t('only_marked')"></el-radio-button>
                        <el-radio-button :label="$t('not_marked')"></el-radio-button>
                    </el-radio-group>
                </div>
                <el-input :placeholder="$t('StudentFIO')" style="width: 20rem" size="small" clearable v-model="personname"
                    @change="setPersonName">
                    <el-button :loading="getting_students_list" :disabled="getting_students_list" slot="append" size="small"
                        icon="el-icon-search" @click="Search">{{ $t("search") }}</el-button>
                </el-input>
            </el-col>
            <el-col :span="14">
                    <CRow class="form-group">
                        <CCol lg="12" md="12" sm="12" class="text-left mt-2">
                            <CRow class="">
                                <CCol lg="4" sm="12" class="achievement-input">
                                    <div class="mr-2" style="width: 100%">
                                        <v-select :options="OblastList" :reduce="(item) => item.id"
                                            :placeholder="$t('oblast')" label="name" v-model="oblastid"
                                            @input="ChangeOblast"></v-select>
                                    </div>
                                </CCol>
                                <CCol lg="4" sm="12" class="achievement-input">
                                    <div class="mr-2" style="width: 100%">
                                        <v-select :options="RegionList" :reduce="(item) => item.id"
                                            @input="changeRegion"
                                            :placeholder="$t('region')" label="name" v-model="regionid"></v-select>
                                    </div>
                                </CCol>
                                <CCol lg="4" sm="12" class="">
                                    <div class="mr-2" style="width: 100%">
                                        <v-select :options="organizationslist" v-model="organizationid"
                                        @input="changeOrg"
                                            :reduce="(item) => item.id" :placeholder="$t('organization')" label="name">
                                        </v-select>
                                    </div>
                                </CCol>

                            </CRow>
                        </CCol>
                    </CRow>
            </el-col>
        </el-row>
    </el-col>
</template>


<style lang="scss"> label.el-radio-button.el-radio-button--mini {
     margin-bottom: 0 !important;
 }
</style>