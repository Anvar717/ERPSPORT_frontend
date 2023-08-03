<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{$t('SchoolAdmEStatement')}}</h3>
        <CCardHeader>
          
          <CRow class="form-group">
            <CCol lg="2" md="2" class="text-left mt-2">
              <label class="col-form-label" for>{{$t('StartDate')}}</label>

              <date-picker
                v-model="filter.StartDate"
                style="width:100%"
                size="sm"
                lang="ru"
                :placeholder="$t('StartDate')"
                value-type="format"
                format="DD.MM.YYYY"
              ></date-picker>
            </CCol>
            <CCol lg="2" md="2"  class="text-left mt-2">
              
                <label class="col-form-label" for>{{$t('EndDate')}}</label>

                <!-- <custom-date-input />  -->
                <date-picker
                  v-model="filter.EndDate"
                  style="width:100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('EndDate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                >
                  
                </date-picker>
              
            </CCol>
            <CCol lg="3" md="2" sm="11" class="text-left mt-3">
               <label for="#">{{$t('Search')}}</label>
              <CInput
                :placeholder="$t('search')"
                autocomplete="text"
                v-model="filter.Search"
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
                    {{$t('search')}}
                  </CButton>
                </template>
              </CInput>
            </CCol>
          </CRow>
        </CCardHeader>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
export default {
    data(){
        return{
            filter : {
                StartDate : '',
                EndDate : '',
                Search : ''
            }
        }
    }
}
</script>

<style>

</style>