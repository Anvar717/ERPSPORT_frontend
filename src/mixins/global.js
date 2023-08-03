export default {
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    changeQuery(key, value){
      let query = {...{}, ...this.$route.query};
      if(value){
        if(query[key] != value){
          query[key] = value;
          this.$router.push({name: this.$route.name, params: this.$route.params, query });
        }
      }else{
        if(query[key]){
          delete query[key];
          this.$router.push({name: this.$route.name, params: this.$route.params, query });
        }
      }
    },
    // debounce (fn, wait) {
    //   let timer
    //   return function (...args) {
    //     if (timer) {
    //       clearTimeout(timer) // clear any pre-existing timer
    //     }
    //     const context = this // get the current context
    //     timer = setTimeout(() => {
    //       fn.apply(context, args) // call the function if time expires
    //     }, wait)
    //   }
    // },
    scrollToTop(){
      var content = document.getElementById('content');
      if(content){
        content.scrollTo(0, 0)
      }
    }
  },
};
