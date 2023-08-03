<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("OnlineQueueInfo") }}</h3>
        <CCardHeader>
          <CRow class="form-group">
            <CCol lg="2" md="2" sm="5" class="text-left mt-2">
              <label class="col-form-label" for>{{ $t("StartDate") }}</label>

              <date-picker
                v-model="filter.StartDate"
                style="width: 100%"
                size="sm"
                lang="ru"
                :placeholder="$t('StartDate')"
                value-type="format"
                format="DD.MM.YYYY"
              ></date-picker>
            </CCol>
            <CCol lg="2" md="2" sm="11" class="text-left mt-2">
              <ValidationProvider v-slot="v" name="EndDate">
                <label class="col-form-label" for>{{ $t("EndDate") }}</label>

                <!-- <custom-date-input />  -->
                <date-picker
                  v-model="filter.EndDate"
                  style="width: 100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('EndDate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                >
                  <template slot="invalid-feedback">
                    <div class="invalid-feedback">{{ v.errors[0] }}</div>
                  </template>
                </date-picker>
              </ValidationProvider>
            </CCol>
            <CCol lg="2" md="3" sm="11" class="text-left mt-3">
              <label for>{{ $t("typequota") }}</label>
              <v-select
                :options="isaddquotalist"
                v-model="filter.isaddquota"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
              ></v-select>
            </CCol>
            <CCol lg="3" md="3" sm="11" class="text-left mt-5">
              <custom-search v-model="filter.Search" @search="Search"></custom-search>
            </CCol>
            <CCol lg="3" md="4" sm="12" class="text-right mt-5 pl-0">
              <!-- <label for=""></label> -->
              <CButton
                color="danger"
                class="float-sm-right mr-2 text-right"
                @click="$router.push('/')"
                size="sm"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
              </CButton>
            </CCol>
          </CRow>
          <CRow class="text-left">
            <CCol class="text-left mt-2">
              <b-button-group class="text-center">
                <b-button
                  size="sm"
                  :variant="
                    filter.statusid == 0 ? 'primary' : 'outline-primary'
                  "
                  @click="All"
                >
                  <b-icon icon="liost-task" class="mr-2"></b-icon>
                  {{ $t("All") }}
                </b-button>
                <b-button
                  size="sm"
                  :variant="
                    filter.statusid == 1 ? 'primary' : 'outline-primary'
                  "
                  @click="AllNew"
                >
                  <b-icon icon="text-indent-left" class="mr-2"></b-icon>
                  {{ $t("AllNew") }}
                </b-button>
                <b-button
                  size="sm"
                  :variant="
                    filter.statusid == 12 ? 'primary' : 'outline-primary'
                  "
                  @click="AllWaiting"
                >
                  <b-icon icon="person-plus" class="mr-2"></b-icon>
                  {{ $t("Waiting") }}
                </b-button>
                <b-button
                  size="sm"
                  :variant="
                    filter.statusid == 10 ? 'primary' : 'outline-primary'
                  "
                  @click="AllNotReceived"
                >
                  <b-icon icon="x"></b-icon>
                  {{ $t("AllNotReceived") }}
                </b-button>
                <b-button
                  size="sm"
                  :variant="
                    filter.statusid == 3 ? 'primary' : 'outline-primary'
                  "
                  @click="AllNotAccept"
                >
                  <b-icon icon="arrow90deg-down" class="mr-2"></b-icon>
                  {{ $t("AllNotAccept") }}
                </b-button>
                <b-button
                  size="sm"
                  :variant="
                    filter.statusid == 9 ? 'primary' : 'outline-primary'
                  "
                  @click="AllReceived"
                >
                  <b-icon icon="check2"></b-icon>
                  {{ $t("ReceivedAll") }}
                </b-button>
              </b-button-group>
            </CCol>

            <CCol class="text-right mt-2">
              <CButton
                v-if="
                  OnlineQueueInfoUpdate &&
                  $can('OnlineQueueInfoForMNOView', 'permissions')
                "
                @click="Create"
                color="primary"
                variant="outline"
                class="mr-2"
                size="sm"
              >
                <b-icon icon="plus"> </b-icon>
                &nbsp; {{ $t("Create") }}
              </CButton>
              <CButton
                @click="SendBatchSMSModal"
                color="primary"
                variant="outline"
                class="mr-2"
                size="sm"
                v-if="$can('OnlineQueueInfoForMNOView', 'permissions')"
              >
                <b-icon icon="envelope" class="mt-n1"></b-icon>
                &nbsp; {{ $t("SendBatchSMS") }}
              </CButton>
              <CButton
                @click="Print"
                color="primary"
                variant="outline"
                class="mr-2"
                size="sm"
              >
                <b-icon icon="printer"></b-icon>
                &nbsp; {{ $t("Export") }}
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <b-modal
          id="SendBatchSMSModal"
          :title="$t('SendBatchSMS')"
          no-close-on-backdrop
        >
          <b-row>
            <b-col>
              <label class="col-form-label" for>{{ $t("ondate") }}</label>

              <date-picker
                v-model="SendBatchSMS.ondate"
                style="width: 100%"
                size="sm"
                lang="ru"
                :placeholder="$t('ondate')"
                value-type="format"
                format="DD.MM.YYYY"
              ></date-picker>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <label class="col-form-label" for
                >{{ $t("message") }} {{ messagelength }}/250</label
              >
              <b-form-textarea
                id="textarea"
                v-model="SendBatchSMS.message"
                placeholder
                rows="3"
                max-rows="6"
                @keyup="CalculateLength"
                maxlength="250"
              ></b-form-textarea>
            </b-col>
          </b-row>
          <template v-slot:modal-footer="{ cancel }">
            <!-- Emulate built in modal footer ok and cancel button actions -->

            <b-button size="sm" variant="danger" @click="cancel()">{{
              $t("NotAccept")
            }}</b-button>
            <b-button size="sm" variant="success" @click="SendBatchSMSAll">{{
              $t("Send")
            }}</b-button>
          </template>
        </b-modal>

        <CCardBody v-if="!isschool">
          <b-table
            :fields="fields1"
            :items="items"
            style="white-space: nowrap"
            small="small"
            responsive="sm"
            class="generalTableClass"
            show-empty
            :busy="isBusy"
            :current-page="filter.PageNumber"
            @row-clicked="rowclicked"
            striped
            sticky-header="60vh"
            no-border-collapse
            bordered
          >
            <template v-slot:head(id)>
              <div style="cursor: pointer" @click="ChangeSort('id')">
                {{ $t("id") }}
                <b-icon v-if="filter.SortColumn === 'id'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(Code)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('Code')"
              >
                {{ $t("id") }}
                <b-icon v-if="filter.SortColumn === 'code'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(queuedate)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('queuedate')"
              >
                {{ $t("queuedate") }}
                <b-icon v-if="filter.SortColumn === 'queuedate'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(queuetime)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('queuetime')"
              >
                {{ $t("queuetime") }}
                <b-icon v-if="filter.SortColumn === 'queuetime'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(studentname)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('studentname')"
              >
                {{ $t("studentname") }}
                <b-icon v-if="filter.SortColumn === 'studentname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(mobilenumber)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('mobilenumber')"
              >
                {{ $t("mobilenumber") }}
                <b-icon v-if="filter.SortColumn === 'mobilenumber'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(DocumentSeries)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('DocumentSeries')"
              >
                {{ $t("DocumentSeries") }}
                <b-icon v-if="filter.SortColumn === 'DocumentSeries'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>

            <template v-slot:head(OrganizationName)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('OrganizationName')"
              >
                {{ $t("OrganizationName") }}
                <b-icon v-if="filter.SortColumn === 'OrganizationName'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(OblastName)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('OblastName')"
              >
                {{ $t("OblastName") }}
                <b-icon v-if="filter.SortColumn === 'oblastname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(RegionName)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('RegionName')"
              >
                {{ $t("RegionName") }}
               <b-icon v-if="filter.SortColumn === 'regionname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:cell(isaddquota)="{ item }">
              <CBadge v-if="item.isaddquota">{{ $t("addquota") }}</CBadge>
              <CBadge v-if="!item.isaddquota">{{ $t("mainquota") }}</CBadge>
            </template>
            <template v-slot:cell(statusname)="{ item }">
              <CBadge :color="getItemColor(item.statusname)">{{
                item.statusname
              }}</CBadge>
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  v-if="filter.statusid === 1"
                  @click="$bvModal.show('NotReceivedModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('NotReceivedd') }"
                >
                  <b-icon icon="x"></b-icon>
                </b-link>
                <b-link
                  v-if="filter.statusid === 9 && onlinequeueinfoforcereject"
                  @click="$bvModal.show('NotForceRejectModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('NotReceivedd') }"
                >
                  <b-icon icon="x"></b-icon>
                </b-link>
                <b-link
                  v-if="filter.statusid === 1"
                  @click="$bvModal.show('ReceivedModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Received') }"
                >
                  <b-icon icon="check2"></b-icon>
                </b-link>
                <b-link
                  v-if="filter.statusid === 1"
                  @click="$bvModal.show('SendSmsModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('SendSms') }"
                >
                  <b-icon icon="envelope"></b-icon>
                </b-link>
                <b-link
                  v-if="
                    (filter.statusid === 1 ||
                      filter.statusid === 9 ||
                      filter.statusid === 3) &&
                    OnlineQueueInfoUpdate
                  "
                  @click="UpdateModal(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Update') }"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-link>

                <b-modal :id="'SendSmsModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{
                    $t("WantSendSms")
                  }}</template>
                  <div class="d-block text-right">
                    <CRow class="mt-3">
                      <CCol>
                        <CButton
                          @click="$bvModal.hide('SendSmsModal' + item.id)"
                          color="danger"
                          class="mr-2"
                        >
                          <b-icon icon="x"></b-icon>
                          {{ $t("NotAccept") }}
                        </CButton>
                        <CButton @click="SendSms(item)" color="success">
                          <b-icon icon="check2"></b-icon>
                          {{ $t("Accept") }}
                        </CButton>
                      </CCol>
                    </CRow>
                  </div>
                </b-modal>
                <b-modal :id="'NotReceivedModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{
                    $t("WantNotAccept")
                  }}</template>
                  <div class="d-block text-right">
                    <label class="d-block text-left" for>{{
                      $t("Description")
                    }}</label>
                    <CRow class="mt-3">
                      <CCol>
                        <textarea
                          class="form-control"
                          v-model="templaterow.Description"
                          rows="5"
                        ></textarea>
                      </CCol>
                    </CRow>
                    <CRow class="m-3">
                      <label class="d-block text-left" for>{{
                        $t("id")
                      }}</label>
                      <CCol>
                        <CInput
                          :placeholder="$t('code')"
                          v-mask="'0000-0000-0000'"
                          autocomplete="text"
                          v-model="templaterow.code"
                          v-on:keyup.enter="code"
                        ></CInput>
                      </CCol>
                    </CRow>
                    <CRow class="mt-3">
                      <CCol>
                        <CButton
                          @click="$bvModal.hide('NotReceivedModal' + item.id)"
                          color="danger"
                          class="mr-2"
                        >
                          <b-icon icon="x"></b-icon>
                          {{ $t("NotAccept") }}
                        </CButton>
                        <CButton @click="Reject(item)" color="success">
                          <b-icon icon="check2"></b-icon>
                          {{ $t("Accept") }}
                        </CButton>
                      </CCol>
                    </CRow>
                  </div>
                </b-modal>
                <b-modal :id="'NotForceRejectModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{
                    $t("WantNotAccept")
                  }}</template>
                  <div class="d-block text-right">
                    <label class="d-block text-left" for>{{
                      $t("Description")
                    }}</label>
                    <CRow class="mt-3">
                      <CCol>
                        <textarea
                          class="form-control"
                          v-model="templaterow.Description"
                          rows="5"
                        ></textarea>
                      </CCol>
                    </CRow>
                    <CRow class="m-3">
                      <label class="d-block text-left" for>{{
                        $t("id")
                      }}</label>
                      <CCol>
                        <CInput
                          :placeholder="$t('code')"
                          v-mask="'0000-0000-0000'"
                          autocomplete="text"
                          v-model="templaterow.code"
                          v-on:keyup.enter="code"
                        ></CInput>
                      </CCol>
                    </CRow>
                    <CRow class="mt-3">
                      <CCol>
                        <CButton
                          @click="$bvModal.hide('NotReceivedModal' + item.id)"
                          color="danger"
                          class="mr-2"
                        >
                          <b-icon icon="x"></b-icon>
                          {{ $t("NotAccept") }}
                        </CButton>
                        <CButton @click="ForceReject(item)" color="success">
                          <b-icon icon="check2"></b-icon>
                          {{ $t("Accept") }}
                        </CButton>
                      </CCol>
                    </CRow>
                  </div>
                </b-modal>
                <b-modal :id="'ReceivedModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantAccept") }}</template>
                  <div class="d-block text-right">
                    <CRow class="m-3">
                      <CCol sm="1">
                        <label class="d-block text-left" for>{{
                          $t("id")
                        }}</label>
                      </CCol>
                      <CCol>
                        <CInput
                          :placeholder="$t('code')"
                          autocomplete="text"
                          v-mask="'0000-0000-0000'"
                          v-model="templaterow.code"
                          v-on:keyup.enter="code"
                        ></CInput>
                      </CCol>
                    </CRow>
                    <CRow class="mt-3">
                      <CCol>
                        <CButton
                          @click="$bvModal.hide('ReceivedModal' + item.id)"
                          color="danger"
                          class="mr-2"
                        >
                          <b-icon icon="x"></b-icon>
                          {{ $t("NotAccept") }}
                        </CButton>
                        <CButton @click="Accepted(item)" color="success">
                          <b-icon icon="check2"></b-icon>
                          {{ $t("Accept") }}
                        </CButton>
                      </CCol>
                    </CRow>
                  </div>
                </b-modal>
                <b-modal :id="'WaitingModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{
                    $t("WantWaiting")
                  }}</template>
                  <div class="d-block text-right">
                    <CRow class="m-3">
                      <CCol sm="1">
                        <label class="d-block text-left" for>{{
                          $t("id")
                        }}</label>
                      </CCol>
                      <CCol>
                        <CInput
                          :placeholder="$t('code')"
                          autocomplete="text"
                          v-mask="'0000-0000-0000'"
                          v-model="templaterow.code"
                          v-on:keyup.enter="code"
                        ></CInput>
                      </CCol>
                    </CRow>
                    <CRow class="mt-3">
                      <CCol>
                        <CButton
                          @click="$bvModal.hide('WaitingModal' + item.id)"
                          color="danger"
                          class="mr-2"
                        >
                          <b-icon icon="x"></b-icon>
                          {{ $t("NotAccept") }}
                        </CButton>
                        <CButton @click="Waiting(item)" color="success">
                          <b-icon icon="check2"></b-icon>
                          {{ $t("Accept") }}
                        </CButton>
                      </CCol>
                    </CRow>
                  </div>
                </b-modal>
                <b-modal :id="'UpdateModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantUpdate") }}</template>
                  <div class="d-block text-left">
                    <CRow class="m-3">
                      <CCol sm="1">
                        <label class="d-block text-left" for>{{
                          $t("id")
                        }}</label>
                      </CCol>
                      <CCol>
                        <CInput
                          :placeholder="$t('code')"
                          autocomplete="text"
                          v-mask="'0000-0000-0000'"
                          v-model="templaterow.code"
                          v-on:keyup.enter="code"
                        ></CInput>
                      </CCol>
                    </CRow>
                    <CRow class="mt-3">
                      <CCol sm="4">
                        <label>{{ $t("documentseries") }}</label>
                        <v-select
                          :options="identitydocserieslist"
                          v-model="templaterow.documentseries"
                          :reduce="(item) => item.code"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                        ></v-select>
                      </CCol>
                      <CCol sm="4">
                        <CInput
                          :label="$t('documentnumber')"
                          v-mask="'0000000000'"
                          v-model="templaterow.documentnumber"
                        ></CInput>
                      </CCol>
                      <CCol sm="4">
                        <label>{{ $t("isaddquota") }}</label>
                        <b-form-checkbox
                          class="col-sm-4"
                          v-model="templaterow.isaddquota"
                          name="check-button1"
                          switch
                        ></b-form-checkbox>
                      </CCol>
                    </CRow>
                    <CRow class="mt-3">
                      <CCol sm="1">
                        <label class="d-block text-left" for>{{
                          $t("familyname")
                        }}</label>
                      </CCol>
                      <CCol sm="8" class="ml-5">
                        <CInput v-model="templaterow.familyname"></CInput>
                      </CCol>
                    </CRow>
                    <CRow class="mt-3">
                      <CCol sm="1">
                        <label class="d-block text-left" for>{{
                          $t("firstname")
                        }}</label>
                      </CCol>
                      <CCol sm="8" class="ml-5">
                        <CInput v-model="templaterow.firstname"></CInput>
                      </CCol>
                    </CRow>
                    <CRow class="mt-3">
                      <CCol sm="1">
                        <label class="d-block text-left" for>{{
                          $t("lastname")
                        }}</label>
                      </CCol>
                      <CCol sm="8" class="ml-5">
                        <CInput v-model="templaterow.lastname"></CInput>
                      </CCol>
                    </CRow>
                    <CRow class="mt-3" v-if="filter.statusid === 3">
                      <CCol sm="5">
                        <label class="d-block text-left" for>{{
                          $t("iscreatedstatus")
                        }}</label>
                      </CCol>
                      <CCol sm="3" class="ml-5">
                        <b-form-checkbox
                          v-model="templaterow.iscreatedstatus"
                          name="check-button1"
                        ></b-form-checkbox>
                      </CCol>
                    </CRow>
                    <CRow class="mt-3">
                      <CCol>
                        <CButton
                          @click="$bvModal.hide('UpdateModal' + item.id)"
                          color="danger"
                          class="mr-2"
                        >
                          <b-icon icon="x"></b-icon>
                          {{ $t("NotAccept") }}
                        </CButton>
                        <CButton @click="Update(item)" color="success">
                          <b-icon icon="check2"></b-icon>
                          {{ $t("Accept") }}
                        </CButton>
                      </CCol>
                    </CRow>
                  </div>
                </b-modal>
              </div>
            </template>
            <template v-slot:empty>
              <h5 class="text-center">{{ $t("NoItems") }}</h5>
            </template>
            <template v-slot:table-busy>
              <div
                class="text-center text-primary my-2 mt-5"
                style="vertical-align: middle"
              >
                <b-spinner class="align-middle mr-2"></b-spinner>
                <strong>{{ $t("Loading") }}</strong>
              </div>
            </template>
          </b-table>
          <div class="pb-4">
            <div style="float: left; font-size: 12px">
              {{ $t("RecordsFrom") }} {{ firstNumber }} {{ $t("by") }}
              {{ lastNumber }} {{ $t("of") }}
              {{ totalRows }}
            </div>
            <div style="float: left" class="ml-2 mr-2 mt-n1">
              <b-form-select
                v-model="filter.PageLimit"
                id="PageLimitSelect"
                size="sm"
                :options="filter.pageOptions"
              ></b-form-select>
            </div>
            <div style="float: left; font-size: 12px">
              {{ $t("RecordsPerPage") }}
            </div>
            <div style="float: right">
              <b-pagination
                v-model="filter.PageNumber"
                :total-rows="totalRows"
                :per-page="filter.PageLimit"
                align="right"
                size="sm"
                class="my-0"
              ></b-pagination>
            </div>
          </div>
        </CCardBody>
        <CCardBody v-if="isschool">
          <b-table
            :fields="fields2"
            :items="items"
            style="white-space: nowrap"
            small="small"
            responsive="sm"
            class="generalTableClass"
            show-empty
            :busy="isBusy"
            :current-page="filter.PageNumber"
            @row-clicked="rowclicked"
            striped
            sticky-header="60vh"
            no-border-collapse
            bordered
          >
            <template v-slot:head(id)>
              <div style="cursor: pointer" @click="ChangeSort('id')">
                {{ $t("id") }}
                <b-icon v-if="filter.SortColumn === 'id'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(Code)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('Code')"
              >
                {{ $t("id") }}
                <b-icon v-if="filter.SortColumn === 'code'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(queuedate)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('queuedate')"
              >
                {{ $t("queuedate") }}
                <b-icon v-if="filter.SortColumn === 'queuedate'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(queuetime)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('queuetime')"
              >
                {{ $t("queuetime") }}
                <b-icon v-if="filter.SortColumn === 'queuetime'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(studentname)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('studentname')"
              >
                {{ $t("studentname") }}
                <b-icon v-if="filter.SortColumn === 'studentname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(mobilenumber)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('mobilenumber')"
              >
                {{ $t("mobilenumber") }}
                <b-icon v-if="filter.SortColumn === 'mobilenumber'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(DocumentSeries)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('DocumentSeries')"
              >
                {{ $t("DocumentSeries") }}
                <b-icon v-if="filter.SortColumn === 'DocumentSeries'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(OrganizationName)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('OrganizationName')"
              >
                {{ $t("OrganizationName") }}
                <b-icon v-if="filter.SortColumn === 'OrganizationName'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(OblastName)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('OblastName')"
              >
                {{ $t("OblastName") }}
                <b-icon v-if="filter.SortColumn === 'oblastname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(RegionName)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('RegionName')"
              >
                {{ $t("RegionName") }}
               <b-icon v-if="filter.SortColumn === 'regionname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:cell(isaddquota)="{ item }">
              <CBadge v-if="item.isaddquota">{{ $t("addquota") }}</CBadge>
              <CBadge v-if="!item.isaddquota">{{ $t("mainquota") }}</CBadge>
            </template>
            <template v-slot:cell(statusname)="{ item }">
              <CBadge :color="getItemColor(item.statusname)">{{
                item.statusname
              }}</CBadge>
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  v-if="filter.statusid === 1 || filter.statusid === 12"
                  @click="$bvModal.show('NotReceivedModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('NotReceivedd') }"
                >
                  <b-icon icon="x"></b-icon>
                </b-link>
                <b-link
                  v-if="filter.statusid === 1 || filter.statusid === 12"
                  @click="$bvModal.show('ReceivedModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Received') }"
                >
                  <b-icon icon="check2"></b-icon>
                </b-link>
                <b-link
                  v-if="filter.statusid === 1"
                  @click="$bvModal.show('SendSmsModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('SendSms') }"
                >
                  <b-icon icon="envelope"></b-icon>
                </b-link>
                <b-link
                  v-if="filter.statusid === 1"
                  @click="$bvModal.show('WaitingModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Waiting') }"
                >
                  <b-icon icon="person-plus"></b-icon>
                </b-link>
                <b-link
                  v-if="filter.statusid === 9"
                  @click="UpdateModal(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Update') }"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-link>
                <b-modal :id="'UpdateModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantUpdate") }}</template>

                  <div class="d-block text-left">
                    <CRow class="m-3">
                      <CCol sm="1">
                        <label class="d-block text-left" for>{{
                          $t("id")
                        }}</label>
                      </CCol>
                      <CCol>
                        <CInput
                          :placeholder="$t('code')"
                          autocomplete="text"
                          v-mask="'0000-0000-0000'"
                          v-model="templaterow.code"
                          v-on:keyup.enter="code"
                        ></CInput>
                      </CCol>
                    </CRow>
                    <CRow class="mt-3">
                      <CCol sm="4">
                        <label>{{ $t("documentseries") }}</label>
                        <v-select
                          disabled
                          :options="identitydocserieslist"
                          v-model="templaterow.documentseries"
                          :reduce="(item) => item.code"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                        ></v-select>
                      </CCol>
                      <CCol sm="4">
                        <CInput
                          disabled
                          :label="$t('documentnumber')"
                          v-mask="'0000000000'"
                          v-model="templaterow.documentnumber"
                        ></CInput>
                      </CCol>
                      <CCol sm="4">
                        <label>{{ $t("isaddquota") }}</label>
                        <b-form-checkbox
                          class="col-sm-4"
                          v-model="templaterow.isaddquota"
                          name="check-button1"
                          switch
                        ></b-form-checkbox>
                      </CCol>
                    </CRow>
                    <CRow class="mt-3">
                      <CCol sm="1">
                        <label disabled class="d-block text-left" for>{{
                          $t("familyname")
                        }}</label>
                      </CCol>
                      <CCol sm="8" class="ml-5">
                        <CInput
                          disabled
                          v-model="templaterow.familyname"
                        ></CInput>
                      </CCol>
                    </CRow>
                    <CRow class="mt-3">
                      <CCol sm="1">
                        <label class="d-block text-left" for>{{
                          $t("firstname")
                        }}</label>
                      </CCol>
                      <CCol sm="8" class="ml-5">
                        <CInput
                          disabled
                          v-model="templaterow.firstname"
                        ></CInput>
                      </CCol>
                    </CRow>
                    <CRow class="mt-3">
                      <CCol sm="1">
                        <label class="d-block text-left" for>{{
                          $t("lastname")
                        }}</label>
                      </CCol>
                      <CCol sm="8" class="ml-5">
                        <CInput
                          disabled
                          v-model="templaterow.lastname"
                        ></CInput>
                      </CCol>
                    </CRow>
                    <CRow class="mt-3" v-if="filter.statusid === 3">
                      <CCol sm="5">
                        <label class="d-block text-left" for>{{
                          $t("iscreatedstatus")
                        }}</label>
                      </CCol>
                      <CCol sm="3" class="ml-5">
                        <b-form-checkbox
                          disabled
                          v-model="templaterow.iscreatedstatus"
                          name="check-button1"
                        ></b-form-checkbox>
                      </CCol>
                    </CRow>
                    <CRow class="mt-3">
                      <CCol>
                        <CButton
                          @click="$bvModal.hide('UpdateModal' + item.id)"
                          color="danger"
                          class="mr-2"
                        >
                          <b-icon icon="x"></b-icon>
                          {{ $t("NotAccept") }}
                        </CButton>
                        <CButton @click="Update(item)" color="success">
                          <b-icon icon="check2"></b-icon>
                          {{ $t("Accept") }}
                        </CButton>
                      </CCol>
                    </CRow>
                  </div>
                </b-modal>
                <b-modal :id="'SendSmsModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{
                    $t("WantSendSms")
                  }}</template>
                  <div class="d-block text-right">
                    <CRow class="mt-3">
                      <CCol>
                        <CButton
                          @click="$bvModal.hide('SendSmsModal' + item.id)"
                          color="danger"
                          class="mr-2"
                        >
                          <b-icon icon="x"></b-icon>
                          {{ $t("NotAccept") }}
                        </CButton>
                        <CButton @click="SendSms(item)" color="success">
                          <b-icon icon="check2"></b-icon>
                          {{ $t("Accept") }}
                        </CButton>
                      </CCol>
                    </CRow>
                  </div>
                </b-modal>
                <b-modal :id="'NotReceivedModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{
                    $t("WantNotAccept")
                  }}</template>
                  <div class="d-block text-right">
                    <label class="d-block text-left" for>{{
                      $t("Description")
                    }}</label>
                    <CRow class="mt-3">
                      <CCol>
                        <textarea
                          class="form-control"
                          v-model="templaterow.Description"
                          rows="5"
                        ></textarea>
                      </CCol>
                    </CRow>
                    <CRow class="m-3">
                      <label class="d-block text-left" for>{{
                        $t("id")
                      }}</label>
                      <CCol>
                        <CInput
                          :placeholder="$t('code')"
                          v-mask="'0000-0000-0000'"
                          autocomplete="text"
                          v-model="templaterow.code"
                          v-on:keyup.enter="code"
                        ></CInput>
                      </CCol>
                    </CRow>
                    <CRow class="mt-3">
                      <CCol>
                        <CButton
                          @click="$bvModal.hide('NotReceivedModal' + item.id)"
                          color="danger"
                          class="mr-2"
                        >
                          <b-icon icon="x"></b-icon>
                          {{ $t("NotAccept") }}
                        </CButton>
                        <CButton @click="Reject(item)" color="success">
                          <b-icon icon="check2"></b-icon>
                          {{ $t("Accept") }}
                        </CButton>
                      </CCol>
                    </CRow>
                  </div>
                </b-modal>
                <b-modal :id="'NotForceRejectModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{
                    $t("WantNotAccept")
                  }}</template>
                  <div class="d-block text-right">
                    <label class="d-block text-left" for>{{
                      $t("Description")
                    }}</label>
                    <CRow class="mt-3">
                      <CCol>
                        <textarea
                          class="form-control"
                          v-model="templaterow.Description"
                          rows="5"
                        ></textarea>
                      </CCol>
                    </CRow>
                    <CRow class="m-3">
                      <label class="d-block text-left" for>{{
                        $t("id")
                      }}</label>
                      <CCol>
                        <CInput
                          :placeholder="$t('code')"
                          v-mask="'0000-0000-0000'"
                          autocomplete="text"
                          v-model="templaterow.code"
                          v-on:keyup.enter="code"
                        ></CInput>
                      </CCol>
                    </CRow>
                    <CRow class="mt-3">
                      <CCol>
                        <CButton
                          @click="$bvModal.hide('NotReceivedModal' + item.id)"
                          color="danger"
                          class="mr-2"
                        >
                          <b-icon icon="x"></b-icon>
                          {{ $t("NotAccept") }}
                        </CButton>
                        <CButton @click="ForceReject(item)" color="success">
                          <b-icon icon="check2"></b-icon>
                          {{ $t("Accept") }}
                        </CButton>
                      </CCol>
                    </CRow>
                  </div>
                </b-modal>
                <b-modal :id="'ReceivedModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantAccept") }}</template>
                  <div class="d-block text-right">
                    <CRow class="m-3">
                      <CCol sm="1">
                        <label class="d-block text-left" for>{{
                          $t("id")
                        }}</label>
                      </CCol>
                      <CCol>
                        <CInput
                          :placeholder="$t('code')"
                          autocomplete="text"
                          v-mask="'0000-0000-0000'"
                          v-model="templaterow.code"
                          v-on:keyup.enter="code"
                        ></CInput>
                      </CCol>
                    </CRow>
                    <CRow class="mt-3">
                      <CCol>
                        <CButton
                          @click="$bvModal.hide('ReceivedModal' + item.id)"
                          color="danger"
                          class="mr-2"
                        >
                          <b-icon icon="x"></b-icon>
                          {{ $t("NotAccept") }}
                        </CButton>
                        <CButton @click="Accepted(item)" color="success">
                          <b-icon icon="check2"></b-icon>
                          {{ $t("Accept") }}
                        </CButton>
                      </CCol>
                    </CRow>
                  </div>
                </b-modal>
                <b-modal :id="'WaitingModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{
                    $t("WantWaiting")
                  }}</template>
                  <div class="d-block text-right">
                    <CRow class="m-3">
                      <CCol sm="1">
                        <label class="d-block text-left" for>{{
                          $t("id")
                        }}</label>
                      </CCol>
                      <CCol>
                        <CInput
                          :placeholder="$t('code')"
                          autocomplete="text"
                          v-mask="'0000-0000-0000'"
                          v-model="templaterow.code"
                          v-on:keyup.enter="code"
                        ></CInput>
                      </CCol>
                    </CRow>
                    <CRow class="mt-3">
                      <CCol>
                        <CButton
                          @click="$bvModal.hide('WaitingModal' + item.id)"
                          color="danger"
                          class="mr-2"
                        >
                          <b-icon icon="x"></b-icon>
                          {{ $t("NotAccept") }}
                        </CButton>
                        <CButton @click="Waiting(item)" color="success">
                          <b-icon icon="check2"></b-icon>
                          {{ $t("Accept") }}
                        </CButton>
                      </CCol>
                    </CRow>
                  </div>
                </b-modal>
              </div>
            </template>
            <template v-slot:empty>
              <h5 class="text-center">{{ $t("NoItems") }}</h5>
            </template>
            <template v-slot:table-busy>
              <div
                class="text-center text-primary my-2 mt-5"
                style="vertical-align: middle"
              >
                <b-spinner class="align-middle mr-2"></b-spinner>
                <strong>{{ $t("Loading") }}</strong>
              </div>
            </template>
          </b-table>
          <div class="pb-4">
            <div style="float: left; font-size: 12px">
              {{ $t("RecordsFrom") }} {{ firstNumber }} {{ $t("by") }}
              {{ lastNumber }} {{ $t("of") }}
              {{ totalRows }}
            </div>
            <div style="float: left" class="ml-2 mr-2 mt-n1">
              <b-form-select
                v-model="filter.PageLimit"
                id="PageLimitSelect"
                size="sm"
                :options="filter.pageOptions"
              ></b-form-select>
            </div>
            <div style="float: left; font-size: 12px">
              {{ $t("RecordsPerPage") }}
            </div>
            <div style="float: right">
              <b-pagination
                v-model="filter.PageNumber"
                :total-rows="totalRows"
                :per-page="filter.PageLimit"
                align="right"
                size="sm"
                class="my-0"
              ></b-pagination>
            </div>
          </div>
        </CCardBody>
      </CCard>
      <b-modal id="AddModal" size="xl">
        <template v-slot:modal-title>{{ $t("OnlineQueueInfo") }}</template>
        <CCard sm="6">
          <h5 class="text-center mt-3">{{ $t("SchoolInfo") }}</h5>
          <CCardBody sm="6">
            <CRow>
              <CCol>
                <label>{{ $t("oblast") }}</label>
                <v-select
                  disabled
                  :options="oblastlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="onlinequeueinfo.School.OblastID"
                ></v-select>
              </CCol>
              <CCol>
                <label>{{ $t("region") }}</label>
                <v-select
                  :options="regionlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="onlinequeueinfo.School.RegionID"
                ></v-select>
              </CCol>

              <CCol>
                <label>{{ $t("organization") }}</label>
                <v-select
                  :options="organizationlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="onlinequeueinfo.School.OrganizationID"
                ></v-select>
              </CCol>
            </CRow>
            <CRow class="mt-2">
              <CCol>
                <label>{{ $t("isaddquota") }}</label>
                <b-form-checkbox
                  class="col-sm-4"
                  v-model="onlinequeueinfo.IsAddQuota"
                  name="check-button1"
                  switch
                ></b-form-checkbox>
              </CCol>
              <CCol>
                <label>{{ $t("Date") }}</label>
                <date-picker
                  v-model="onlinequeueinfo.QueueTime.Date"
                  style="width: 100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('Date')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  :disabled-date="disableddate"
                  :editable="false"
                ></date-picker>
              </CCol>
              <CCol>
                <label>{{ $t("Time") }}</label>
                <v-select
                  :options="timelist"
                  :reduce="(item) => item.name"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="onlinequeueinfo.QueueTime.Time"
                ></v-select>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <CCard sm="6">
          <CCardBody sm="6">
            <h5 class="text-center mt-1">{{ $t("StudentInfo") }}</h5>

            <CRow class="mt-2">
              <CCol>
                <label>{{ $t("IsForeignDocument") }}</label>
                <b-form-checkbox
                  class="col-sm-4"
                  v-model="onlinequeueinfo.Student.IsForeignDocument"
                  name="check-button1"
                  switch
                ></b-form-checkbox>
              </CCol>
              <CCol v-if="!onlinequeueinfo.Student.IsForeignDocument">
                <label>{{ $t("documentseries") }}</label>
                <v-select
                  :options="identitydocserieslist"
                  v-model="onlinequeueinfo.Student.DocumentSeries"
                  :reduce="(item) => item.code"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </CCol>
              <CCol v-if="onlinequeueinfo.Student.IsForeignDocument">
                <CInput
                  :label="$t('documentseries')"
                  v-model="onlinequeueinfo.Student.DocumentSeries"
                ></CInput>
              </CCol>
              <CCol>
                <CInput
                  :label="$t('documentnumber')"
                  v-mask="'0000000000'"
                  v-model="onlinequeueinfo.Student.DocumentNumber"
                ></CInput>
              </CCol>
              <CCol>
                <label>{{ $t("DateOfBirth") }}</label>
                <date-picker
                  v-model="onlinequeueinfo.Student.DateOfBirth"
                  :editable="false"
                  style="width: 100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('DateOfBirth')"
                  :disabled-date="disableddatebirth"
                  value-type="format"
                  format="DD.MM.YYYY"
                ></date-picker>
              </CCol>
              <CCol class="mt-4">
                <CButton
                  @click="SearchStudentInZags"
                  size="sm"
                  variant="outline"
                  type="button"
                  color="primary"
                >
                  <b-icon icon="search"></b-icon>
                  {{ $t("search") }}
                </CButton>
              </CCol>
            </CRow>
            <CRow class="mt-2">
              <CCol>
                <CInput
                  v-if="openstudentinfo"
                  :label="$t('FamilyName')"
                  v-model="onlinequeueinfo.Student.FamilyName"
                ></CInput>
                <CInput
                  v-if="!openstudentinfo"
                  :label="$t('FamilyName')"
                  disabled
                  v-model="onlinequeueinfo.Student.FamilyName"
                ></CInput>
              </CCol>
              <CCol>
                <CInput
                  v-if="openstudentinfo"
                  :label="$t('FirstName')"
                  v-model="onlinequeueinfo.Student.FirstName"
                ></CInput>
                <CInput
                  v-if="!openstudentinfo"
                  :label="$t('FirstName')"
                  disabled
                  v-model="onlinequeueinfo.Student.FirstName"
                ></CInput>
              </CCol>
              <CCol>
                <CInput
                  v-if="openstudentinfo"
                  :label="$t('LastName')"
                  v-model="onlinequeueinfo.Student.LastName"
                ></CInput>
                <CInput
                  v-if="!openstudentinfo"
                  :label="$t('LastName')"
                  disabled
                  v-model="onlinequeueinfo.Student.LastName"
                ></CInput>
              </CCol>
              <CCol>
                <CInput
                  :label="$t('MobileNumber')"
                  v-mask="'+999-99-999-99-99'"
                  v-model="onlinequeueinfo.Parent.MobileNumber"
                ></CInput>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>

        <template v-slot:modal-footer>
          <div class="text-center mx-auto">
            <CButton
              size="sm"
              color="danger"
              class="mr-2"
              @click="$bvModal.hide('AddModal')"
            >
              <b-icon icon="arrow-left-short" ></b-icon>
              {{ $t("back") }}
            </CButton>
            <CButton size="sm" color="primary" @click="AddData">
              <b-icon icon="check2"></b-icon>
              {{ $t("Save") }}
            </CButton>
          </div>
        </template>
      </b-modal>
    </CCol>
  </CRow>
</template>

<script>
import IdentityDocumentService from "@/services/IdentityDocument.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";

import OnlineQueueInfoService from "@/services/OnlineQueueInfo.service";
export default {
  data() {
    return {
      onlinequeueinfo: {},
      identitydocserieslist: [],
      oblastlist: [],
      regionlist: [],
      organizationlist: [],

      templaterow: {
        Description: "",
        code: "",
        isaddquota: false,
        documentseries: "",
        documentnumber: "",
        familyname: "",
        firstname: "",
        lastname: "",
        iscreatedstatus: false,
      },
      isschool: false,
      onlinequeueinfoforcereject: this.$can(
        "OnlineQueueInfoForceReject",
        "permissions"
      ),
      OnlineQueueInfoUpdate: this.$can("OnlineQueueInfoUpdate", "permissions"),
      fields1: [
        // {
        //   key: "actions",
        //   label: this.$t("actions")
        // },
        /* {
          key: "id",
          label: this.$t("id"),
          sortable: false,
        
        }, */
        {
          key: "code",
          label: this.$t("id"),
          sortable: false,
        },
        {
          key: "queuedate",
          label: this.$t("queuedate"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "queuetime",
          label: this.$t("queuetime"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "studentname",
          label: this.$t("studentname"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "documentseries",
          label: this.$t("documentseries"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "documentnumber",
          label: this.$t("documentnumber"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "mobilenumber",
          label: this.$t("mobilenumber"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "isaddquota",
          label: this.$t("typequota"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "organizationname",
          label: this.$t("organizationname"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "oblastname",
          label: this.$t("oblastname"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "regionname",
          label: this.$t("regionname"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "statusname",
          label: this.$t("status"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "description",
          label: this.$t("description"),
          sortable: false,
          class: "text-left",
        },
      ],
      fields2: [
        // {
        //   key: "actions",
        //   label: this.$t("actions")
        // },
        /* {
          key: "id",
          label: this.$t("id"),
          sortable: false,
        
        }, */
        {
          key: "code",
          label: this.$t("id"),
          sortable: false,
        },
        {
          key: "queuedate",
          label: this.$t("queuedate"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "queuetime",
          label: this.$t("queuetime"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "studentname",
          label: this.$t("studentname"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "documentseries",
          label: this.$t("documentseries"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "documentnumber",
          label: this.$t("documentnumber"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "mobilenumber",
          label: this.$t("mobilenumber"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "isaddquota",
          label: this.$t("typequota"),
          sortable: false,
          class: "text-left",
        },
        /*{
          key: "organizationname",
          label: this.$t("organizationname"),
          sortable: false,
          class: "text-left"
        },
        {
          key: "oblastname",
          label: this.$t("oblastname"),
          sortable: false
          ,class: "text-left"
        },
        {
          key: "regionname",
          label: this.$t("regionname"),
          sortable: false,
          class: "text-left"
        }, */
        {
          key: "statusname",
          label: this.$t("status"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "description",
          label: this.$t("description"),
          sortable: false,
          class: "text-left",
        },
      ],
      isaddquotalist: [
        { id: 0, name: this.$t("allquata") },
        { id: 1, name: this.$t("addquota") },
        { id: 2, name: this.$t("mainquota") },
      ],
      items: [],
      totalRows: "",
      isBusy: true,
      filter: {
        StartDate: "",
        EndDate: "",
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon : "arrow-up",
        statusid: 0,
        isaddquota: 0,
      },
      SendBatchSMS: {
        ondate: "",
        message: "",
      },
      timelist: [
        { name: "10:00:00" },
        { name: "10:20:00" },
        { name: "10:40:00" },
        { name: "11:00:00" },
        { name: "11:20:00" },
        { name: "11:40:00" },
        { name: "12:00:00" },
        { name: "12:20:00" },
        { name: "12:40:00" },
        { name: "14:00:00" },
        { name: "14:20:00" },
        { name: "14:40:00" },
        { name: "15:00:00" },
        { name: "15:20:00" },
        { name: "15:40:00" },
        { name: "16:00:00" },
        { name: "16:20:00" },
        { name: "16:40:00" },
      ],
      openstudentinfo: false,
      messagelength: 0,
      lang : localStorage.getItem('locale') || 'ru'
    };
  },
  created() {
    var self = this;

    IdentityDocumentService.GetAllIdentityDocSeries(1).then((res) => {
      self.identitydocserieslist = res.data.result;
    });
    OblastService.GetAll().then((res) => {
      self.oblastlist = res.data;
    });
    OnlineQueueInfoService.Get().then((res) => {
      self.onlinequeueinfo = res.data;
    });
    this.createDate();
    this.Refresh();
  },
  computed: {
    firstNumber() {
      return this.totalRows > 0
        ? (this.filter.PageNumber - 1) * this.filter.PageLimit + 1
        : 0;
    },
    lastNumber() {
      if (this.totalRows < this.filter.PageLimit) {
        return this.totalRows;
      } else {
        if (this.filter.PageNumber * this.filter.PageLimit > this.totalRows) {
          return this.totalRows;
        } else {
          return this.filter.PageNumber * this.filter.PageLimit;
        }
      }
    },
  },
  methods: {
    disableddatebirth(date) {
      return date > new Date(2014, 7, 31);
    },
    disableddate(date) {
      console.log(date);
      return (
        date > new Date(2020, 8, 30) ||
        date < new Date(new Date(2020, 7, 1).setHours(0, 0, 0, 0)) ||
        date.getDay() === 0
      );
    },
    CalculateLength() {
      this.messagelength = this.SendBatchSMS.message.length;
    },
    All() {
      this.filter.statusid = 0;
    },
    AllNew() {
      this.filter.statusid = 1;
    },
    AllWaiting() {
      this.filter.statusid = 12;
    },
    AllReceived() {
      this.filter.statusid = 9;
    },
    AllNotReceived() {
      this.filter.statusid = 10;
    },
    AllNotAccept() {
      this.filter.statusid = 3;
    },
    SendBatchSMSAll() {
      // alert("s")
      OnlineQueueInfoService.SendBatchSMS(
        this.SendBatchSMS.ondate,
        this.SendBatchSMS.message
      )
        .then((res) => {
          this.makeToast(res.data.message, this.$t("message"), "success");
          this.$bvModal.hide("SendBatchSMSModal");
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    SendBatchSMSModal() {
      this.$bvModal.show("SendBatchSMSModal");
    },
    UpdateModal(item) {
      (this.templaterow = {
        isaddquota: item.isaddquota,
        documentseries: item.documentseries,
        documentnumber: item.documentnumber,
        familyname: item.familyname,
        firstname: item.firstname,
        lastname: item.lastname,
      }),
        this.$bvModal.show("UpdateModal" + item.id);
    },
    Create() {
      var self = this;
      OnlineQueueInfoService.Get().then((res) => {
        self.onlinequeueinfo = res.data;
      });
      self.openstudentinfo = false;
      self.$bvModal.show("AddModal");
    },
    check() {
      var self = this;
      if (
        self.onlinequeueinfo.School.OblastID === 0 ||
        self.onlinequeueinfo.School.OblastID === undefined ||
        self.onlinequeueinfo.School.OblastID === null
      ) {
        this.makeToast(
          this.$t("OblastNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.onlinequeueinfo.School.RegionID === 0 ||
        self.onlinequeueinfo.School.RegionID === undefined ||
        self.onlinequeueinfo.School.RegionID === null
      ) {
        this.makeToast(
          this.$t("RegionNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.onlinequeueinfo.School.OrganizationID === 0 ||
        self.onlinequeueinfo.School.OrganizationID === undefined ||
        self.onlinequeueinfo.School.OrganizationID === null
      ) {
        this.makeToast(
          this.$t("OrganizationNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.onlinequeueinfo.QueueTime.Date === 0 ||
        self.onlinequeueinfo.QueueTime.Date === undefined ||
        self.onlinequeueinfo.QueueTime.Date === null
      ) {
        this.makeToast(this.$t("DateNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.onlinequeueinfo.QueueTime.Time === 0 ||
        self.onlinequeueinfo.QueueTime.Time === undefined ||
        self.onlinequeueinfo.QueueTime.Time === null
      ) {
        this.makeToast(this.$t("TimeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.onlinequeueinfo.Student.DocumentSeries === 0 ||
        self.onlinequeueinfo.Student.DocumentSeries === undefined ||
        self.onlinequeueinfo.Student.DocumentSeries === null
      ) {
        this.makeToast(
          this.$t("DocumentSeriesNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.onlinequeueinfo.Student.DocumentNumber === 0 ||
        self.onlinequeueinfo.Student.DocumentNumber === undefined ||
        self.onlinequeueinfo.Student.DocumentNumber === null
      ) {
        this.makeToast(
          this.$t("DocumentNumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.onlinequeueinfo.Student.DateOfBirth === 0 ||
        self.onlinequeueinfo.Student.DateOfBirth === undefined ||
        self.onlinequeueinfo.Student.DateOfBirth === null
      ) {
        this.makeToast(
          this.$t("DateOfBirthNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.onlinequeueinfo.Student.FamilyName === 0 ||
        self.onlinequeueinfo.Student.FamilyName === undefined ||
        self.onlinequeueinfo.Student.FamilyName === null
      ) {
        this.makeToast(
          this.$t("FamilyNameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.onlinequeueinfo.Student.FirstName === 0 ||
        self.onlinequeueinfo.Student.FirstName === undefined ||
        self.onlinequeueinfo.Student.FirstName === null
      ) {
        this.makeToast(
          this.$t("FirstNameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.onlinequeueinfo.Parent.MobileNumber === 0 ||
        self.onlinequeueinfo.Parent.MobileNumber === undefined ||
        self.onlinequeueinfo.Parent.MobileNumber === null
      ) {
        this.makeToast(
          this.$t("MobileNumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    AddData() {
      var self = this;
      if (!this.check()) {
        return false;
      }

      self.onlinequeueinfo.School.OblastName = self.oblastlist.filter(function (
        item
      ) {
        if (item.id === self.onlinequeueinfo.School.OblastID) return item;
      })[0].name;
      self.onlinequeueinfo.School.RegionName = self.regionlist.filter(function (
        item
      ) {
        if (item.id === self.onlinequeueinfo.School.RegionID) return item;
      })[0].name;
      self.onlinequeueinfo.School.OrganizationName = self.organizationlist.filter(
        function (item) {
          if (item.id === self.onlinequeueinfo.School.OrganizationID)
            return item;
        }
      )[0].name;
      OnlineQueueInfoService.InsertForAdmin(self.onlinequeueinfo)
        .then((res) => {
          this.makeToast(
            this.$t("UpdateMessage"),
            this.$t("message"),
            "success"
          );
          self.$bvModal.hide("AddModal");
          this.Refresh();
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
          self.$bvModal.hide("AddModal");
          this.Refresh();
        });
    },
    SearchStudentInZags() {
      var self = this;
      OnlineQueueInfoService.GetZags(
        self.onlinequeueinfo.Student.DocumentSeries,
        self.onlinequeueinfo.Student.DocumentNumber,
        self.onlinequeueinfo.Student.DateOfBirth
      ).then((res) => {
        console.log(res.data.familyname);
        if (res.data.familyname === null && res.data.firstname === null) {
          self.openstudentinfo = true;
        } else {
          self.onlinequeueinfo.Student.FamilyName = res.data.familyname;
          self.onlinequeueinfo.Student.FirstName = res.data.firstname;
          self.onlinequeueinfo.Student.LastName = res.data.lastname;
          self.openstudentinfo = false;
        }
      });
    },
    SendSms(item) {
      OnlineQueueInfoService.ReSendCode(item.id, item)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessSendMessage") + "\n" + res.data.message,
            this.$t("message"),
            "success"
          );
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "error"
          );
        });
      this.$bvModal.hide("SendSmsModal" + item.id);
    },
    createDate() {
      var todaydate = new Date();
      // var dd = String(todaydate.getDate()).padStart(2, "0");
      // var mm = String(todaydate.getMonth() + 2).padStart(2, "0");
      // var mm2 = String(todaydate.getMonth() + 2).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      var yyyy2 = String(todaydate.getFullYear() -1).padStart(2, "0");
      this.filter.StartDate = '01.01.' +  yyyy2;
      this.filter.EndDate = '01.01.' + yyyy;
      /* this.onlinequeueinfo.QueueTime.Date = dd + "." + mm + "." + yyyy; */
    },
    getItemColor(text) {
      return text === "Принято"
        ? "success"
        : text === "Не принято"
        ? "danger"
        : "primary";
    },
    rowclicked() {},
    getregionlist(oblastid, setregionlist) {
      RegionService.GetAll(this.lang,oblastid).then((res) => {
        setregionlist(res.data);
      });
    },
    getorganizationlist(oblastid, regionid, setorganizationlist) {
      OrganizationService.GetAll(oblastid, regionid).then((res) => {
        setorganizationlist(res.data);
      });
    },
    Print() {
      OnlineQueueInfoService.Print(
        this.filter.StartDate,
        this.filter.EndDate,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      )
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "onlinequeueinfo.xlsx");

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    Update(item) {
      var self = this;
      if (self.templaterow.code === "" || self.templaterow.code === undefined) {
        this.makeToast(this.$t("idNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      OnlineQueueInfoService.Update(
        item.id,
        self.templaterow.code,
        self.templaterow.isaddquota,
        self.templaterow.documentseries,
        self.templaterow.documentnumber,
        self.templaterow.familyname,
        self.templaterow.firstname,
        self.templaterow.lastname,
        self.templaterow.iscreatedstatus
      )
        .then((res) => {
          this.makeToast(
            this.$t("UpdateMessage"),
            this.$t("message"),
            "success"
          );
          self.templaterow = {
            Description: "",
            code: "",
            isaddquota: false,
            documentseries: "",
            documentnumber: "",
            familyname: "",
            firstname: "",
            lastname: "",
            iscreatedstatus: false,
          };
          this.$bvModal.hide("UpdateModal" + item.id);
          this.Refresh();
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
          self.templaterow = {
            Description: "",
            code: "",
            isaddquota: false,
            documentseries: "",
            documentnumber: "",
            familyname: "",
            firstname: "",
            lastname: "",
            iscreatedstatus: false,
          };
          this.$bvModal.hide("UpdateModal" + item.id);
        });
    },
    Accepted(item) {
      var self = this;
      if (self.templaterow.code === "" || self.templaterow.code === undefined) {
        this.makeToast(this.$t("idNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      OnlineQueueInfoService.Accept(item.id, self.templaterow.code)
        .then((res) => {
          this.makeToast(
            this.$t("AcceptMessage"),
            this.$t("message"),
            "success"
          );
          self.templaterow = {
            Description: "",
            code: "",
            isaddquota: false,
            documentseries: "",
            documentnumber: "",
            familyname: "",
            firstname: "",
            lastname: "",
            iscreatedstatus: false,
          };
          this.$bvModal.hide("ReceivedModal" + item.id);
          this.Refresh();
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
          self.templaterow = {
            Description: "",
            code: "",
            isaddquota: false,
            documentseries: "",
            documentnumber: "",
            familyname: "",
            firstname: "",
            lastname: "",
            iscreatedstatus: false,
          };
          this.$bvModal.hide("ReceivedModal" + item.id);
        });
    },
    Waiting(item) {
      var self = this;
      if (self.templaterow.code === "" || self.templaterow.code === undefined) {
        this.makeToast(this.$t("idNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      OnlineQueueInfoService.Waiting(item.id, self.templaterow.code)
        .then((res) => {
          this.makeToast(
            this.$t("WaitingMessage"),
            this.$t("message"),
            "success"
          );
          self.templaterow = {
            Description: "",
            code: "",
            isaddquota: false,
            documentseries: "",
            documentnumber: "",
            familyname: "",
            firstname: "",
            lastname: "",
            iscreatedstatus: false,
          };
          this.$bvModal.hide("WaitingModal" + item.id);
          this.Refresh();
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
          self.templaterow = {
            Description: "",
            code: "",
            isaddquota: false,
            documentseries: "",
            documentnumber: "",
            familyname: "",
            firstname: "",
            lastname: "",
            iscreatedstatus: false,
          };
          this.$bvModal.hide("WaitingModal" + item.id);
        });
    },
    Reject(item) {
      var self = this;
      if (self.templaterow.code === "" || self.templaterow.code === undefined) {
        this.makeToast(this.$t("idNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.templaterow.Description === "" ||
        self.templaterow.Description === undefined
      ) {
        this.makeToast(
          this.$t("DescriptionNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      OnlineQueueInfoService.Reject(
        item.id,
        self.templaterow.Description,
        self.templaterow.code
      )
        .then((res) => {
          self.$bvModal.hide("NotReceivedModal" + item.id);
          self.makeToast(
            self.$t("NotAcceptMessage"),
            self.$t("message"),
            "success"
          );
          self.templaterow = {
            Description: "",
            code: "",
            isaddquota: false,
            documentseries: "",
            documentnumber: "",
            familyname: "",
            firstname: "",
            lastname: "",
            iscreatedstatus: false,
          };
          this.Refresh();
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
          self.templaterow = {
            Description: "",
            code: "",
            isaddquota: false,
            documentseries: "",
            documentnumber: "",
            familyname: "",
            firstname: "",
            lastname: "",
            iscreatedstatus: false,
          };
          this.$bvModal.hide("NotReceivedModal" + item.id);
        });
    },
    ForceReject(item) {
      var self = this;
      if (self.templaterow.code === "" || self.templaterow.code === undefined) {
        this.makeToast(this.$t("idNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.templaterow.Description === "" ||
        self.templaterow.Description === undefined
      ) {
        this.makeToast(
          this.$t("DescriptionNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      OnlineQueueInfoService.ForceReject(
        item.id,
        self.templaterow.Description,
        self.templaterow.code
      )
        .then((res) => {
          self.$bvModal.hide("NotReceivedModal" + item.id);
          self.makeToast(
            self.$t("NotAcceptMessage"),
            self.$t("message"),
            "success"
          );
          self.templaterow = {
            Description: "",
            code: "",
            isaddquota: false,
            documentseries: "",
            documentnumber: "",
            familyname: "",
            firstname: "",
            lastname: "",
            iscreatedstatus: false,
          };
          this.Refresh();
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
          self.templaterow = {
            Description: "",
            code: "",
            isaddquota: false,
            documentseries: "",
            documentnumber: "",
            familyname: "",
            firstname: "",
            lastname: "",
            iscreatedstatus: false,
          };
          this.$bvModal.hide("NotReceivedModal" + item.id);
        });
    },

    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    Refresh() {
      this.isBusy = true;
      OnlineQueueInfoService.GetList(
        this.filter.StartDate,
        this.filter.EndDate,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.statusid,
        this.filter.isaddquota
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.data.rows;
        this.totalRows = res.data.data.total;
        this.isschool = res.data.isschool;
        /* this.onlinequeueinfoforcereject = res.data.OnlineQueueInfoForceReject; */
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
    ChangeSort(columnName) {
      this.filter.SortColumn = columnName;
      if (this.filter.OrderType == "asc") {
        this.filter.SortIcon = "arrow-down";
        this.filter.OrderType = "desc";
      } else {
        this.filter.SortIcon = "arrow-up";
        this.filter.OrderType = "asc";
      }
      this.Refresh();
    },
  },
  watch: {
    "onlinequeueinfo.School.OblastID": {
      handler(newValue, oldValue) {
        if (newValue) {
          if (oldValue) {
            this.onlinequeueinfo.School.RegionID = null;
          }
          var self = this;
          this.getregionlist(newValue, function (data) {
            self.regionlist = data;
          });
        }
      },
    },
    "onlinequeueinfo.School.RegionID": {
      handler(newValue, oldValue) {
        var self = this;
        if (newValue) {
          if (oldValue) {
            self.onlinequeueinfo.School.OrganizationID = null;
          }
          self.getorganizationlist(
            self.onlinequeueinfo.OblastID,
            newValue,
            function (data) {
              self.organizationlist = data;
            }
          );
        }
      },
    },
    "filter.PageNumber": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
    "filter.PageLimit": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
    "filter.statusid": {
      handler(newValue, oldValue) {
        if (newValue != 1 && newValue != 9 && newValue != 3 && newValue != 12) {
          // alert(1 )
          if (!this.isschool && this.fields1.length === 13) {
            this.fields1.splice(0, 1);
            console.log(this.fields1);
          }
          if (this.isschool && this.fields2.length === 10) {
            this.fields2.splice(0, 1);
          }
        } else {
          if (
            !this.isschool &&
            this.fields1.filter((item) => item.key === "actions").length === 0
          ) {
            this.fields1.splice(0, 0, {
              key: "actions",
              label: this.$t("actions"),
            });
          }
          if (
            this.isschool &&
            this.fields2.filter((item) => item.key === "actions").length === 0
          ) {
            this.fields2.splice(0, 0, {
              key: "actions",
              label: this.$t("actions"),
            });
          }
        }
        this.Refresh();
      },
    },
  },
};
</script>

<style>
</style>