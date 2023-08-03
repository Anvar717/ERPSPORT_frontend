const Toast = {
    install(Vue,options){
        Vue.prototype.$makeToast = function(message, title, type){
            this.$bvToast.toast(message, {
                title: title,
                autoHideDelay: 2000,
                variant: type,
                solid: true,
            });
        }
    }
}
export default Toast