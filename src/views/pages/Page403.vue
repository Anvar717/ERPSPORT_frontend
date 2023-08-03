<template>
  <CContainer class="d-flex align-items-center min-vh-100">
    <CRow class="w-100 justify-content-center">
      <CCol md="6">
        <div class="w-100">
        <div class="clearfix">
          <h1 class="float-left display-3 mr-4">403</h1>
          <h4 class="pt-3">{{$t('actions.error')}}</h4>
          <p class="text-muted">The page you are looking for was not found.</p>
        </div>
			<router-link to="/dashboard" tag="button" class="btn btn-primary float-right"><i class="fa fa-arrow-left"></i> {{$t('Dashboard')}}</router-link>
      </div>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
export default {
  name: 'Page404'
}
</script>
