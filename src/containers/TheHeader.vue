<template>
  <CHeader fixed light>
    <CToggler in-header class="ml-3 d-lg-none" v-c-emit-root-event:toggle-sidebar-mobile />
    <CToggler in-header class="ml-3 d-md-down-none" v-c-emit-root-event:toggle-sidebar />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <h3>SportErp</h3>
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem class="px-3">
        <h6>{{$t('Organization')}} : {{ org.OrgInfo + ' (' + org.OrgINN+')' }}</h6>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3">
        <h6>{{$t('Username')}} : {{ org.UserName }}</h6>
      </CHeaderNavItem>
      <!-- <CHeaderNavItem class="px-3">
        <h6>{{$t('Modul')}} : <span style="color:red">{{org.UserDisplayName}}</span></h6>
      </CHeaderNavItem> -->
    </CHeaderNav>
    <CHeaderNav style="position:relative">
      <CHeaderNavLink @click.native="isActive">
        <b-icon-search style="cursor:pointer" />
      </CHeaderNavLink>
      <transition name="slide-y">
        <b-input-group class="mt-3 active-searchbar" v-if="isActiveInput">
          <template v-slot:append>
            <b-input-group-text><b-icon-search style="cursor:pointer" /></b-input-group-text>
          </template>
          <b-form-input 
          id="input-small" 
          size="lg" 
          :placeholder="$t('Search')" @blur="blur" @keyup="SearchMenu" @focus="focus" 
          v-model="search"
        ></b-form-input>
        <transition name="slide-x">
          <div class="core_search_menu" v-if="pressSearchInput">
            <ul v-for="(item,i) in menus" :key="i"  >
              <li @click="Path(item)"><a color="blue" link>{{item.name}}</a></li>
            </ul>
            <ul v-if="menus.length === 0">
              <li>{{$t('NoItems')}}</li>
            </ul>
          </div>
        </transition>
        </b-input-group>
      </transition>
    </CHeaderNav>
    <CHeaderNav>
      <CDropdown placement="bottom-end" add-menu-classes="pt-0">
        <template #toggler>
          <CHeaderNavLink class="mx-2">
            <b-icon-globe scale="1.2" />
            <CBadge color="primary" class="ml-auto">{{$t('uz')}}</CBadge>
          </CHeaderNavLink>
        </template>
        <CDropdownItem @click="changeLanguage('ru')">Русский язык</CDropdownItem>
        <CDropdownItem @click="changeLanguage('uz_cyrl')">Ўзбек тили</CDropdownItem>
        <CDropdownItem @click="changeLanguage('uz_latn')">O'zbek tili</CDropdownItem>
      </CDropdown>
    </CHeaderNav>
    <!-- <CHeaderNav>
      <CDropdown placement="bottom-end" add-menu-classes="pt-0 w-200">
        <template #toggler>
          <CHeaderNavLink class="mx-2">
            <b-icon-bell scale="1.2" />
            <CBadge color="success" class="ml-auto">3</CBadge>
          </CHeaderNavLink>
        </template>
      </CDropdown>
    </CHeaderNav> -->
    <CHeaderNav class="mr-4">
      <TheHeaderDropdownAccnt />
    </CHeaderNav>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from "./TheHeaderDropdownAccnt";
import { TokenService } from "@/services/storage.service";
import AccountService from "../services/account.service";
import { BIconSearch,BInputGroup,BInputGroupText,BFormInput,BIconBell,BIconGlobe } from 'bootstrap-vue'
import { mapActions } from "vuex";
import { CHeader,CToggler,CHeaderBrand,CHeaderNav,CHeaderNavItem,CHeaderNavLink,CDropdown,CDropdownItem,CBadge } from '@coreui/vue'
export default {
  data() {
    return {
      org: {},
      search : '',
      isActiveInput : false,
      pressSearchInput : false,
      menus : []
    };
  },
  name: "TheHeader",
  components: {
    TheHeaderDropdownAccnt,
    CHeader,
    CToggler,
    CHeaderBrand,
    CHeaderNav,CHeaderNavItem,CHeaderNavLink,CDropdown,CDropdownItem,CBadge,BIconSearch,BInputGroup,BInputGroupText,BFormInput,BIconBell,BIconGlobe
  },
  created() {
    this.org = TokenService.getUserInfo();
    this.getUserInfo()
  },
  methods: {
    SearchMenu(){
      var self = this
      self.menus = []
      self.pressSearchInput = true
      self.b = true
      let v = []
      v = localStorage.getItem("Sidebar_Menu")
      v = JSON.parse(v)
      for (let index = 0; index < v.length; index++) {
        if(v[index].name && !v[index].items){
          if(v[index].name.includes(self.search)){
            self.menus.push(v[index])
          }
        }
        if(v[index].items){
            let l = []
            l = v[index].items.filter(e => e.name.includes(self.search) && e.visible === true)
            if(l.length != 0){
              l.forEach(function(elm){
                self.menus.push(elm)
              })
            }
          }
      }
    },
    blur(){
      this.pressSearchInput = false
    },
    getUserInfo(){
       AccountService.getUserInfo().then(res => {
      this.org = res.data    
    })
    },
    Path(item){
      this.pressSearchInput = true
      this.$router.push(`${item.to}`)
      this.pressSearchInput = false
      this.isActiveInput = false
    },
    focus(){
      this.SearchMenu()
    },
    ...mapActions("auth", ["logout"]),
    async changeLanguage(lang) {
      let el = document.getElementsByClassName("pt-0 dropdown-menu show");
      el[0].classList.remove("show");
      this.$i18n.locale = lang || "uz_cyrl";
      await AccountService.setLanguage({
        lang: lang || "uz_cyrl"
      }).then(response => {});
      window.location.reload();
      TokenService.setLocale(lang);
    },
    isActive(){
      this.isActiveInput= !this.isActiveInput
    }
  },
  
};
</script>

<style scoped>
.c-header-brand:hover {
  text-decoration: none;
}
</style>
