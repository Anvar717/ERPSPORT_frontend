<template>
  <b-container fluid>
       <CRow class="form-group">
            <CCol lg="3" md="5" sm="5" class="text-left mt-2">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4" for>{{
                  $t("Date")
                }}</label>
                <div class="col-sm-6">
                  <date-picker
                    v-model="filter.OnDate"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('OnDate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  ></date-picker>
                </div>
              </div>
            </CCol>
            <CCol lg="2" md="5" sm="11" class="text-left mt-2">
              <ValidationProvider v-slot="v" name="Department">
                <div class="form-group form-row">
                  <v-select
                    class="col-sm-9"
                    :options="departmentlist"
                    v-model="filter.departmentid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('Department')"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </div>
              </ValidationProvider>
            </CCol>
            <CCol lg="4" md="5" sm="11" class="text-left mt-2">
              <ValidationProvider v-slot="v" name="ResponsiblePerson">
                <div class="form-group form-row">
                  <v-select
                    class="col-sm-9"
                    :options="personlist"
                    v-model="filter.responsiblepersonid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ResponsiblePerson')"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </div>
              </ValidationProvider>
            </CCol>
            <CCol lg="3" md="5" sm="11" class="text-left mt-2">
              <CInput
                :placeholder="$t('IHName')"
                autocomplete="text"
                v-model="filter.ihname"
                v-on:keyup.enter="Search"
              >
                <template #append>
                  <CButton
                    @click="Search"
                    size="sm"
                    variant="outline"
                    type="button"
                    color="primary"
                  >
                    <b-icon icon="search"></b-icon>
                    {{ $t("search") }}
                  </CButton>
                </template>
              </CInput>
            </CCol>
            <CCol lg="9" md="6" sm="12" class="text-left mt-2 pl-0">
              <!-- <CButton @click="Search" size="sm" variant="outline" type="button" color="primary">
                <b-icon icon="search"></b-icon>
                {{$t('search')}}
              </CButton>-->
              <!--               <CButton
                color="danger"
                class="float-sm-right mr-2"
                @click="$router.push('/')"
                size="sm"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>-->
            </CCol>
          </CRow>
          <b-row>
              <b-col>
                  <vs-table
                :data="ContractorList"
                @sort="handleSort"
                @selected="SelectedItem"
                v-model="selected"
                style="border:1px solid #eee"
                :max-items="filter.PageLimit">
                <template slot="thead">
                     <vs-th sort-key="inn">
                        {{$t('inn')}}
                    </vs-th>
                    <vs-th sort-key="shortname">
                        {{$t('shortname')}}
                    </vs-th>
                    <vs-th sort-key="fullname">
                        {{$t('fullname')}}
                    </vs-th>
                    <vs-th sort-key="vatcode">
                        {{$t('vatcode')}}
                    </vs-th>
                    <!-- <vs-th sort-key="gender">
                        {{$t('gender')}}
                    </vs-th> -->
                    <vs-th sort-key="adress">
                        {{$t('adress')}}
                    </vs-th>
                    <vs-th sort-key="contactinfo">
                        {{$t('contactinfo')}}
                    </vs-th>
                    <vs-th sort-key="mobilenumber">
                        {{$t('mobilenumber')}}
                    </vs-th>
                    <!-- <vs-th sort-key="workschedule">
                        {{$t('workschedule')}}
                    </vs-th> -->
                </template>
                <template slot-scope="{data}" style="overflow-y:scroll;height:400px">
                        <vs-tr v-if="Loading" class="text-center">
                            <vs-td colspan="10"><b-spinner variant="primary"></b-spinner></vs-td>
                        </vs-tr>
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" v-show="!Loading" @dblclick.native="dblclick(tr)">
                            <vs-td :data="data[indextr].inn">
                                {{data[indextr].inn}}
                            </vs-td>
                            <vs-td :data="data[indextr].shortname">
                                {{data[indextr].shortname}}
                            </vs-td>

                            <vs-td :data="data[indextr].id">
                                {{data[indextr].fullname}}
                            </vs-td>

                            <vs-td :data="data[indextr].id">
                                {{data[indextr].vatcode}}
                            </vs-td>
                            <!-- <vs-td :data="data[indextr].id">
                                {{data[indextr].gender}}
                            </vs-td> -->
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].adress}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].contactinfo}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].mobilenumber}}
                            </vs-td>
                            <!-- <vs-td :data="data[indextr].id">
                                {{data[indextr].workschedule}}
                            </vs-td> -->
                        </vs-tr>
                </template>
                </vs-table>
              </b-col>
          </b-row>
  </b-container>
</template>

<script>
export default {
    data(){
        return{
            filter : {
                OnDate : '',
                departmentid : '',
                responsiblepersonid : '',
                ihname : ''
            }
        }
    }
}
</script>

<style>

</style>