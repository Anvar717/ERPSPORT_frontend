<template>
  <div>
    <router-view></router-view>
    <div class="update-dialog" v-if="prompt">
      <div class="update-dialog__content">
        A new version is found. Refresh to load its?
      </div>
      <div class="update-dialog__actions">
        <button
          class="update-dialog__button update-dialog__button--confirm"
          @click="accept"
        >
          Update
        </button>
        <button
          class="update-dialog__button update-dialog__button--cancel"
          @click="prompt = false"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import i18n from "./lang/lang";

export default {
  name: 'App',
  data(){
    return{
      prompt: false,
      jjj: null,
      translateSheets: null
    }
  },
  computed: {
    ...mapGetters({ translates: "app/TRANSLATES", xushnud: "app/XUSHNUD" }),
    clonedTranslates() {
      return JSON.parse(JSON.stringify(this.translates));
    },
  },
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.accept()
      });
    }
    fetch('https://opensheet.elk.sh/1Xz89_Vhw-mSz4OLEoQneW5I4i7VkSWT_ivfg7gMO0Yc/1')
      .then((res) => res.json())
      .then((data) => {
        this.translateSheets=data
      })
    setTimeout(() => {
      this.setTranslate()
    }, 2000);
  },
  methods: {
    ...mapActions({ getTranslates:"app/getTranslates" }),
    async accept() {
      await this.$workbox.messageSW({ type: "SKIP_WAITING" }); 
    },
    setTranslate() {
      let oz = {}
      let uz = {}
      let ru = {}
      this.translateSheets.forEach((item, index) => {
        try {
          let a = item
        } catch (e) {
          console.log(item)
        }
        oz[item.key] = item.oz ? item.oz : item.key
        uz[item.key] = item.uz ? item.uz : item.key
        ru[item.key] = item.ru ? item.ru : item.key
      })
      i18n.setLocaleMessage('uz_latn', {...i18n.messages.uz_latn, ...oz})
      i18n.setLocaleMessage('uz_cyrl', {...i18n.messages.uz_cyrl, ...uz})
      i18n.setLocaleMessage('ru', {...i18n.messages.ru, ...ru})
    }

  }
}

</script>

<style lang="scss">
  // Import Main styles for this application
  // @import url('https://fonts.googleapis.com/css2?family=Sora:wght@200&display=swap');
  @import 'assets/scss/style';
  // *{
  //   font-family: Sora,sans-serif !important;
  // }
  .update-dialog {
  position: fixed;
  left: 50%;
  bottom: 64px;
  transform: translateX(-50%);
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 12px;
  max-width: 576px;
  color: white;
  background-color: #2c3e50;
  text-align: left;
  &__actions {
    display: flex;
    margin-top: 8px;
  }
  &__button {
    margin-right: 8px;
    &--confirm {
      margin-left: auto;
    }
  }
}
// .snow-body{
//   height: 100vh;
//   // background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
//   overflow: hidden;
//   filter: drop-shadow(0 0 10px white);
//   position: absolute;
//   top: 0;
//   left: 0;
//   // z-index: 9999;
//   z-index: -1;
//   width: 100%;
// }
@function random_range($min, $max) {
  $rand: random();
  $random_range: $min + floor($rand * (($max - $min) + 1));
  @return $random_range;
}

.snow {
  $total: 200;
  position: absolute;
  width: 10px;
  height: 10px;
  background: white;
  overflow: hidden;
  top: 10px;
  left: 10px;
  border-radius: 50%;
  z-index: 9999;

  @for $i from 1 through $total {
    $random-x: random(1000000) * 0.0001vw;
    $random-offset: random_range(-100000, 100000) * 0.0001vw;
    $random-x-end: $random-x + $random-offset;
    $random-x-end-yoyo: $random-x + ($random-offset / 2);
    $random-yoyo-time: random_range(30000, 80000) / 100000;
    $random-yoyo-y: $random-yoyo-time * 100vh;
    $random-scale: random(10000) * 0.0001;
    $fall-duration: random_range(10, 30) * 1s;
    $fall-delay: random(30) * -1s;

    &:nth-child(#{$i}) {
      opacity: random(10000) * 0.0001;
      transform: translate($random-x, -10px) scale($random-scale);
      animation: fall-#{$i} $fall-duration $fall-delay linear infinite;
    }

    @keyframes fall-#{$i} {
      #{percentage($random-yoyo-time)} {
        transform: translate($random-x-end, $random-yoyo-y) scale($random-scale);
      }

      to {
        transform: translate($random-x-end-yoyo, 100vh) scale($random-scale);
      }
    }
  }
}

.el-message-box__wrapper {
    padding: 2rem !important;
}

.el-message-box__wrapper::after {
    vertical-align: top !important;
}
.el-message-box__header {
  border-bottom: 1px solid lightgray;  
}
</style>
