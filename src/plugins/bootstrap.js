import Vue from 'vue'



import {
    BAlert,
    BadgePlugin,
    ButtonPlugin,
    ButtonGroupPlugin,
    CardPlugin,
    CollapsePlugin,
    DropdownPlugin,
    FormCheckboxPlugin,
    FormFilePlugin,
    FormInputPlugin,
    FormSelectPlugin,
    FormTextareaPlugin,
    InputGroupPlugin,
    LayoutPlugin,
    LinkPlugin,
    ModalPlugin,
    OverlayPlugin,
    PaginationPlugin,
    SidebarPlugin,
    SpinnerPlugin,
    TablePlugin,
    TabsPlugin,
    IconsPlugin,
    VBTooltipPlugin,
    VBTogglePlugin,
    ToastPlugin
} from 'bootstrap-vue'
Vue.component('b-alert', BAlert)
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(VBTogglePlugin)
Vue.use(VBTooltipPlugin)
Vue.use(BadgePlugin)
Vue.use(IconsPlugin)
Vue.use(ButtonPlugin)
Vue.use(ButtonGroupPlugin)
Vue.use(CardPlugin)
Vue.use(CollapsePlugin)
Vue.use(DropdownPlugin)
Vue.use(FormInputPlugin)
Vue.use(FormTextareaPlugin)
Vue.use(FormSelectPlugin)
Vue.use(FormCheckboxPlugin)
Vue.use(FormFilePlugin)
Vue.use(InputGroupPlugin)
Vue.use(LayoutPlugin)
Vue.use(LinkPlugin)
Vue.use(ModalPlugin)
Vue.use(OverlayPlugin)
Vue.use(PaginationPlugin)
Vue.use(SidebarPlugin)
Vue.use(SpinnerPlugin)
Vue.use(TablePlugin)
Vue.use(TabsPlugin)
Vue.use(ToastPlugin)