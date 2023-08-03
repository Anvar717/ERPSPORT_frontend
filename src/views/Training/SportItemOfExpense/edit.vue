<template>
    <CRow>
        <CCol>
            <CCard accent-color="primary" class="pb-4">
                <CCardHeader>
                    <CRow>
                        <CCol>
                            <h4 class="text-center">{{ $t('SportItemOfExpense') }}</h4>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <ValidationObserver ref="form" v-slot="errors">
                        {{ setAllErrors(errors.errors) }}

                        <CRow>
                            <CCol sm="3"></CCol>
                            <CCol sm="6">
                                <ValidationProvider v-slot="v" name="code" rules="required">
                                    <CInput :placeholder="$t('shortname')" autocomplete="text" horizontal
                                        :label="$t('shortname')" v-model="SportItemOfExpense.shortname"
                                        :addInputClasses="{ 'is-invalid': v.classes.invalid, 'is-valid': v.classes.valid, }">
                                        <template #append>
                                            <CButton v-if="SportItemOfExpense.TranslatableColumns.includes('shortname')"
                                                @click="translate('shortname')" style="height:35px" variant="outline"
                                                type="button" color="primary">
                                                <b-icon icon="globe2"></b-icon>
                                            </CButton>
                                        </template>
                                        <template slot="invalid-feedback">
                                            <div class="invalid-feedback">{{ v.errors[0] }}</div>
                                        </template>
                                    </CInput>
                                </ValidationProvider>
                            </CCol>
                            <CCol sm="3"></CCol>
                        </CRow>
                        <CRow>
                            <CCol sm="3"></CCol>
                            <CCol sm="6">
                                <ValidationProvider v-slot="v" name="code" rules="required">
                                    <CInput :placeholder="$t('fullname')" autocomplete="text" horizontal
                                        :label="$t('fullname')" v-model="SportItemOfExpense.fullname"
                                        :addInputClasses="{ 'is-invalid': v.classes.invalid, 'is-valid': v.classes.valid }">
                                        <template #append>
                                            <CButton v-if="SportItemOfExpense.TranslatableColumns.includes('fullname')"
                                                @click="translate('fullname')" style="height:35px" variant="outline"
                                                type="button" color="primary">
                                                <b-icon icon="globe2"></b-icon>
                                            </CButton>
                                        </template>
                                        <template slot="invalid-feedback">
                                            <div class="invalid-feedback">{{ v.errors[0] }}</div>
                                        </template>
                                    </CInput>
                                </ValidationProvider>
                            </CCol>
                            <CCol sm="3"></CCol>
                        </CRow>
                        <CRow>
                            <CCol sm="3"></CCol>
                            <CCol sm="6">
                                <ValidationProvider v-slot="v" name="code" rules="required|max:9">
                                    <CInput :placeholder="$t('code1')" autocomplete="code" horizontal :label="$t('code1')"
                                        v-model="SportItemOfExpense.code" type="number"
                                        @keyup="calculateCode"
                                        :addInputClasses="{ 'is-invalid': v.classes.invalid || SportItemOfExpense.code < 0 || SportItemOfExpense.code > 4, 'is-valid': v.classes.valid }">
                                        <template slot="invalid-feedback">
                                            <div class="invalid-feedback">{{ v.errors[0] }}</div>
                                        </template>
                                    </CInput>
                                </ValidationProvider>
                            </CCol>
                            <CCol sm="3"></CCol>
                        </CRow>
                        <CRow>
                            <CCol sm="3"></CCol>
                            <CCol sm="6">
                                <ValidationProvider v-slot="v" name="analyticalcode" rules="required|max:9">
                                    <CInput :placeholder="$t('analyticalcode')" autocomplete="analyticalcode" horizontal
                                        @keyup="calculateCode"
                                        :label="$t('analyticalcode')" v-model="SportItemOfExpense.analyticalcode"
                                        :addInputClasses="{ 'is-invalid': v.classes.invalid || !isCorrectNumber(SportItemOfExpense.analyticalcode), 'is-valid': v.classes.valid || isCorrectNumber(SportItemOfExpense.analyticalcode)}"
                                        type="number">
                                        <template slot="invalid-feedback">
                                            <div class="invalid-feedback">{{ v.errors[0] }}</div>
                                        </template>
                                    </CInput>
                                </ValidationProvider>
                            </CCol>
                            <CCol sm="3"></CCol>
                        </CRow>
                        <CRow>
                            <CCol sm="3"></CCol>
                            <CCol sm="6">
                                <ValidationProvider v-slot="v" name="subcode" rules="required|max:9">
                                    <CInput :placeholder="$t('subcode')" autocomplete="subcode" horizontal
                                        @keyup="calculateCode"
                                        :label="$t('subcode')" v-model="SportItemOfExpense.subcode"
                                        :addInputClasses="{ 'is-invalid': v.classes.invalid || !isCorrectNumber(SportItemOfExpense.subcode), 'is-valid': v.classes.valid || !isCorrectNumber(SportItemOfExpense.subcode)}"
                                        type="number">
                                        <template slot="invalid-feedback">
                                            <div class="invalid-feedback">{{ v.errors[0] }}</div>
                                        </template>
                                    </CInput>
                                </ValidationProvider>
                            </CCol>
                            <CCol sm="3"></CCol>
                        </CRow>
                        <CRow>
                            <CCol sm="3"></CCol>
                            <CCol sm="6">
                                <ValidationProvider v-slot="v" name="classificationcode" rules="required|max:9">
                                    <CInput :placeholder="$t('classificationcode')" autocomplete="classificationcode"
                                        horizontal :label="$t('classificationcode')"
                                        v-model="SportItemOfExpense.classificationcode"
                                        :addInputClasses="{ 'is-invalid': v.classes.invalid || !isCorrectNumber(SportItemOfExpense.classificationcode), 'is-valid': v.classes.valid || !isCorrectNumber(SportItemOfExpense.classificationcode) }">
                                        <template slot="invalid-feedback">
                                            <div class="invalid-feedback">{{ v.errors[0] }}</div>
                                        </template>
                                    </CInput>
                                </ValidationProvider>
                            </CCol>
                            <CCol sm="3"></CCol>
                        </CRow>
                        <CRow>
                            <CCol sm="3"></CCol>
                            <CCol sm="6">
                                <div class="form-group form-row">
                                    <label class="col-form-label col-sm-3" for>{{
                                        $t("isgroup")
                                    }}</label>
                                    <b-form-checkbox v-model="SportItemOfExpense.isgroup" @input="getItemOfExpenseList" switch
                                        class="mt-2 ml-1"></b-form-checkbox>
                                </div>
                            </CCol>
                            <CCol sm="3"></CCol>
                        </CRow>
                        <CRow>
                            <CCol sm="3"></CCol>
                            <CCol sm="6">
                                <div class="form-group form-row">
                                    <label class="col-form-label col-sm-3" for>{{
                                        $t("isinuzbekistan")
                                    }}</label>
                                    <b-form-checkbox @input="calculateCode" v-model="SportItemOfExpense.isinuzbekistan" switch
                                        class="mt-2 ml-1"></b-form-checkbox>
                                </div>
                            </CCol>
                            <CCol sm="3"></CCol>
                        </CRow>
                        <CRow>
                            <CCol sm="3"></CCol>
                            <CCol sm="6">
                                <div class="form-group form-row">
                                    <label class="col-form-label col-sm-3" for>{{
                                        $t("isoutuzbekistan")
                                    }}</label>
                                    <b-form-checkbox @input="calculateCode" v-model="SportItemOfExpense.isoutuzbekistan" switch
                                        class="mt-2 ml-1"></b-form-checkbox>
                                </div>
                            </CCol>
                            <CCol sm="3"></CCol>
                        </CRow>
                        <CRow>
                            <CCol sm="3"></CCol>
                            <CCol sm="6">
                                <div class="form-group form-row">
                                    <label class="col-form-label col-sm-3" for>{{ $t('parent') }}</label>
                                    <v-select class="col-sm-9" :options="sportitemofexpenselist"
                                        v-model="SportItemOfExpense.parentid" :reduce="item => item.id"
                                        :placeholder="$t('ChooseBelow')" label="name"></v-select>
                                </div>
                            </CCol>
                            <CCol sm="3"></CCol>
                        </CRow>
                        <CRow>
                            <CCol sm="3"></CCol>
                            <CCol sm="6">
                                <div class="form-group form-row">
                                    <label class="col-form-label col-sm-3" for>{{ $t('state') }}</label>
                                    <v-select class="col-sm-9" :options="statelist" v-model="SportItemOfExpense.stateid"
                                        :reduce="item => item.id" :placeholder="$t('ChooseBelow')" label="name"></v-select>
                                </div>
                            </CCol>
                            <CCol sm="3"></CCol>
                        </CRow>
                    </ValidationObserver>
                </CCardBody>
                <CModal :title="$t('translate')" :show.sync="translatemodal" size="lg" :closeOnBackdrop="false">
                    <b-table :fields="translitefields" :items="translatelist" class="bg-color-table text-center"
                        style="vertical-align:middle" bordered responsive="sm">
                        <template v-slot:thead-top>
                            <b-tr>
                                <b-th style="width:30%">
                                    <v-select :placeholder="$t('ChooseBelow')" class="mb-0" :options="languagelist"
                                        :reduce="item => item.id" label="name" v-model="translaterow.languageid"
                                        style="z-index:9999"></v-select>
                                </b-th>
                                <b-th style="width:60%">
                                    <CInput class="mb-0" v-model="translaterow.translatetext"></CInput>
                                </b-th>
                                <b-th style="width:10%">
                                    <CButton @click="addtranslite" color="primary" variant="outline"
                                        class="text-center mx-auto d-block">
                                        <b-icon icon="plus"> </b-icon>
                                    </CButton>
                                </b-th>
                            </b-tr>
                        </template>
                        <template v-slot:cell(translatetext)="{ item }">
                            <CInput v-model="item.translatetext" class="mb-0"></CInput>
                        </template>
                    </b-table>
                    <template #footer>
                        <CButton @click="SaveTranslate" color="primary" size="sm" variant="outline">
                            <b-icon icon="check2"></b-icon>
                            {{ $t('Save') }}
                        </CButton>
                    </template>
                </CModal>
                <CRow>
                    <CCol>
                        <div class="text-left">
                            <CButton class="ml-4" size="sm" color="danger"
                                @click="$router.push({ name: 'SportItemOfExpense' })">
                                <b-icon icon="arrow-left-short"></b-icon>
                                {{ $t('back') }}
                            </CButton>
                        </div>
                    </CCol>
                    <CCol>
                        <div class="text-right">
                            <CButton size="sm" color="success" class="mr-4" @click="SaveData">
                                <b-spinner v-if="SaveLoading" small></b-spinner>
                                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                                {{ $t('Save') }}
                            </CButton>
                        </div>
                    </CCol>
                </CRow>
            </CCard>
        </CCol>
    </CRow>
</template>

<script>
import HelperService from "@/services/helper.service";
import SportItemOfExpenseService from '@/services/sportitemofexpense.service'
export default {
    data() {
        return {
            SaveLoading: false,
            translatemodal: false,
            SportItemOfExpense: { TranslatableColumns: [] },
            selectedrowid: 0,
            translitefields: [
                { key: "languagename", label: this.$t("languagename") },
                { key: "translatetext", label: this.$t("name") },
                { key: "actions", label: "" }
            ],
            translatelist: [],
            languagelist: [],

            translaterow: {
                tableid: 0,
                tablerowid: 0,
                languageid: 0,
                languagename: "",
                columnname: "",
                translatetext: ""
            },
            translatebyname: "",
            toastCount: 0,
            allSignupErrors: {},
            statelist: [],
            sportitemofexpenselist: []
        };
    },
    created() {
        var self = this;
        self.selectedrowid = self.$route.params.id;
        HelperService.GetLanguageList().then(res => {
            self.languagelist = res.data;
        });
        HelperService.GetStateList().then(res => {
            self.statelist = res.data;
        });
        SportItemOfExpenseService.Get(self.selectedrowid).then(res => {
            self.SportItemOfExpense = res.data;
            self.getItemOfExpenseList()
        });
        
    },
    methods: {
        getItemOfExpenseList() {
            var self = this
            SportItemOfExpenseService.GetAll(true).then(res => {
                self.sportitemofexpenselist = res.data;
            });
        },
        ChangeCheckUzb(item) {
            if (item == 'in') {
                if (this.SportItemOfExpense.isinuzbekistan) {
                    this.SportItemOfExpense.classificationcode[7] = 1
                }
                else {
                    this.SportItemOfExpense.classificationcode[7] = 0
                }
            }   
            else {
                
            }
        },
        checkControl(value) {

        },
        isCorrectNumber(value) {
            var self = this
            if (value === self.SportItemOfExpense.code) {
                if (value >= 0 && value <= 4) {
                    return true;
                } else {
                    return false;
                }
            }
            if (value === self.SportItemOfExpense.analyticalcode) {
                let numberToString = `${value}`
                if (numberToString.length === 2) {
                    return true;
                } else{
                    return false;
                }
            }
            if (value === self.SportItemOfExpense.subcode) {
                let numberToString = `${value}`
                if (numberToString.length === 3) {
                    return true;
                } else{
                    return false;
                }
            }
            if (value === self.SportItemOfExpense.classificationcode) {
                let numberToString = `${value}`
                if (numberToString.length === 8) {
                    return true;
                } else{
                    return false;
                }
            }
        },
      check() {
            var self = this;
            if (
                self.SportItemOfExpense.code === 0 ||
                self.SportItemOfExpense.code === null ||
                self.SportItemOfExpense.code === "" ||
                self.SportItemOfExpense.code === undefined ||
                self.SportItemOfExpense.code < 0 || self.SportItemOfExpense.code > 4
            ) {
                this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
                return false;
            }
            if (
                self.SportItemOfExpense.analyticalcode === 0 ||
                self.SportItemOfExpense.analyticalcode === null ||
                self.SportItemOfExpense.analyticalcode === "" ||
                self.SportItemOfExpense.analyticalcode === undefined ||
                `${self.SportItemOfExpense.analyticalcode}`.length != 2
            ) {
                this.makeToast(this.$t("analyticalcodeNotCorrect"), this.$t("Error"), "danger");
                return false;
            }
            if (
                self.SportItemOfExpense.subcode === 0 ||
                self.SportItemOfExpense.subcode === null ||
                self.SportItemOfExpense.subcode === "" ||
                self.SportItemOfExpense.subcode === undefined ||
                `${self.SportItemOfExpense.subcode}`.length != 3
            ) {
                this.makeToast(this.$t("subcodeNotCorrect"), this.$t("Error"), "danger");
                return false;
            }
            if (
                self.SportItemOfExpense.classificationcode === 0 ||
                self.SportItemOfExpense.classificationcode === null ||
                self.SportItemOfExpense.classificationcode === "" ||
                self.SportItemOfExpense.classificationcode === undefined ||
                `${self.SportItemOfExpense.classificationcode}`.length != 8

            ) {
                this.makeToast(this.$t("subcodeNotCorrect"), this.$t("Error"), "danger");
                return false;
            }
            if (
                self.SportItemOfExpense.shortname === 0 ||
                self.SportItemOfExpense.shortname === null ||
                self.SportItemOfExpense.shortname === undefined ||
                self.SportItemOfExpense.shortname === ""
            ) {
                this.makeToast(
                    this.$t("shortnameNotCorrect"),
                    this.$t("Error"),
                    "danger"
                );
                return false;
            }
            if (
                self.SportItemOfExpense.fullname === 0 ||
                self.SportItemOfExpense.fullname === null ||
                self.SportItemOfExpense.fullname === undefined ||
                self.SportItemOfExpense.fullname === ""
            ) {
                this.makeToast(
                    this.$t("fullnameNotCorrect"),
                    this.$t("Error"),
                    "danger"
                );
                return false;
            }
            return true;
        },
        SaveData() {
            if (!this.check()) {
                return false;
                5;
            }
            var self = this;
            SportItemOfExpenseService.Update(self.SportItemOfExpense)
                .then(res => {
                    self.makeToast(
                        self.$t("SuccessMessage"),
                        self.$t("message"),
                        "success"
                    );
                    self.$router.push({ name: "SportItemOfExpense" });
                })
                .catch(error => {
                    self.makeToast(
                        error.response.data.error,
                        self.$t("message"),
                        "danger"
                    );
                });
        },
        calculateCode() {
            this.SportItemOfExpense.classificationcode = (this.SportItemOfExpense.code || '') + (this.SportItemOfExpense.analyticalcode || '') + (this.SportItemOfExpense.subcode || '') + (this.SportItemOfExpense.isinuzbekistan ? '1' : '0') + (this.SportItemOfExpense.isoutuzbekistan ? '1' : '0')
        },
        translate(selectcolumnname) {
            var self = this;
            self.translatebyname = selectcolumnname;
            self.translatelist = self.SportItemOfExpense.Translates.filter(
                item => item.columnname == selectcolumnname
            );
            self.translatemodal = true;
        },
        addtranslite() {
            var self = this;
            if (
                self.translaterow.languageid === 0 ||
                self.translaterow.languageid === undefined ||
                self.translaterow.languageid === null
            ) {
                this.makeToast(
                    this.$t("languageidNotSelect"),
                    this.$t("Error"),
                    "danger"
                );
            } else if (
                self.translaterow.translatetext === "" ||
                self.translaterow.translatetext === undefined ||
                self.translaterow.translatetext === null
            ) {
                this.makeToast(
                    this.$t("translatetextNotSelect"),
                    this.$t("Error"),
                    "danger"
                );
            } else {
                var dublikate = false;
                self.translatelist.forEach(item => {
                    if (item.languageid === self.translaterow.languageid) {
                        this.makeToast(this.$t("dublikate"), this.$t("Error"), "danger");
                        dublikate = true;
                    }
                });
                if (!dublikate) {
                    self.translaterow.languagename = self.languagelist.filter(function (
                        item
                    ) {
                        if (item.id === self.translaterow.languageid) return item;
                    })[0].name;
                    self.translaterow.columnname = self.translatebyname;
                    self.translatelist.push(self.translaterow);
                    self.translaterow = {
                        tableid: 0,
                        tablerowid: 0,
                        languageid: 0,
                        languagename: "",
                        columnname: "",
                        translatetext: ""
                    };
                }
            }
        },
        SaveTranslate() {
            var self = this;
            self.SportItemOfExpense.Translates = self.SportItemOfExpense.Translates.filter(
                x => x.columnname !== self.translatebyname
            );
            self.translatelist.forEach(item => {
                self.SportItemOfExpense.Translates.push(item);
            });
            self.translatemodal = false;
        },
        makeToast(message, title, type) {
            var self = this;
            self.toastCount++;
            self.$bvToast.toast(message, {
                title: title,
                autoHideDelay: 2000,
                variant: type,
                solid: true
            });
        },
        setAllErrors(errors) {
            this.allSignupErrors = errors;
        }
    }
};
</script>

<style></style>