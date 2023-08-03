<template>
  <CFooter :fixed="false">
    <div>
      <span class="ml-1 mr-3">&copy; {{new Date().getFullYear()}} {{$store.getters.appVersion}}</span>
      <!-- <span> <img width="100px" style="height : 50px" src="/img/google.jpg" alt=""> </span> -->
      <!-- <span> <a href="https://drive.google.com/file/d/1Na_7HTH2REON9cazNaN6lOjDztQqxB37/view?usp=sharing"> <c-icon name="cib-google-play" class="mb-1"></c-icon> {{ $t('downloadAPK') }}  </a></span> -->
    </div>
    <div class="ml-auto">
      <!-- <span class="mr-1">Powered by</span>
      <a href="https://itsm.uz/uz" target="_blank">ITSM</a> -->
    </div>
  </CFooter>
</template>

<script>
import { CFooter } from '@coreui/vue'
export default {
  components : { CFooter },
  name: 'TheFooter'
}
</script>
