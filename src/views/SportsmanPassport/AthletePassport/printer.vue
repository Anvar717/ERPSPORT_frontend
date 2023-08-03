<template>
    <div class="main">
          <div class="main-img">
              <div class="div1">
                  <div>
                      <img class="logo" src="/img/pasport_img/LOGO 2 SPORT.png" alt="">
                  </div>
                  <div>
                      <img class="person" src="/img/pasport_img/person-png-icon-1.jpg" alt="">
                  </div>
                  <div>
                      <img class="gerb" src="/img/pasport_img/uzb_gerb.svg" alt="">
                  </div>
                  <div>
                      <h1 class="seria">S-AN 0000001</h1>
                  </div>
              </div>
              <div class="div2">
                  <h1 class="sport_pasport">Sport pasporti</h1>
                  <p>Спортивный паспорт - Sports passport</p>
                  <h5 style="padding-top: 32px !important;">familiyasi / surname</h5>
                  <h2>Jurakhonov</h2>
                  <h5>ismi / given name</h5>
                  <h2>jasurbek</h2>
                  <h5>Otasining ismi / Father's name</h5>
                  <h2>Jakhongir ug'li</h2>
                  <h5>Berinlgan sanasi / Date of issue</h5>
                  <h2>29.09.2022</h2>
                  <h5>Amal qilish muddati / Date of issue</h5>
                  <h2>28.09.2025</h2>
                  <h5>Jshshir / Pinoi</h5>
                  <h2>326019991111111</h2>
              </div>
              <div class="qrcode">
                  <img src="/img/pasport_img/qrcode.png" alt="">
              </div>
          </div>
      </div>
  </template>
   <script>
    export default {
    name: 'HelloWorld',
    props: {
      data: Object
    },
    components: {
      // VueQrcode
    }
  }
</script>
  <style>
      /* .main {
          width: 100%;
          height: 100vh;
          align-items: center;
          justify-content: center;
          display: flex;
      } */
  
      .main-img {
          height: 88vh;
          background-size: cover;
          background-repeat: no-repeat;
          display: flex;
          color: black;
          position: relative;
          margin-left:-20px;
          background-image: url("/img/pasport_img/backgraund_img.svg");
      }
      .div1{
          margin-top: 100px;
          margin-left: 60px;
      }
      .logo {
          width: 340px;
      }
      .person {
          width: 300px;
          height: auto;
          margin-top: 100px;
          position: relative;
      }
      .seria {
          font-size: 40px;
          margin-top: 25px;
          letter-spacing: 0.02em;
          line-height: 0;
          margin-left: 20px;
      }
      .div2{
          margin-top: 70px;
          margin-left: 80px;
          line-height: 0.4;
      }
      .div2 h1{
         text-transform: uppercase;
         font-size: 70px;
         margin-top: 50px;
         line-height: 0;
      }
      .div2 p{
          font-size: 25px;
          /* letter-spacing: 0.2em; */
          margin-top: 50px;
      }
      .div2 h5{
          text-transform: uppercase;
          font-size: 18px;
          font-weight: 400;
          line-height: 0;
          padding-top: 37px;
      }
      .div2 h2{
          text-transform: uppercase;
          font-size: 40px;
          line-height: 0;
          padding-top: 22px;
      }
      .qrcode{
          position:absolute;
          bottom: 60px;
          right: 40px;
      }
      .qrcode img{
          width: 170px;
          height:170px;
      }
      .gerb{
        width: 100px;
        height: auto;
        position: absolute;
        top: 505px;
        left: 264px;
      }
  </style>