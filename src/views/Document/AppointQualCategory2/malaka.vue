<template>
    <div class="body-malaka" style="padding: 0 10px;">
      <table style="width: 100%;">
        <tbody>
          <tr>
            <td style="width: 50%;">
              <table style="width: 100%;">
                <tbody>
                  <tr>
                    <td>
                      <img src="/img/img.svg" height="805" alt="">
                    </td>
                    <td>
                      <h2 style="margin-bottom: 240px;text-align: center; margin-top: -50px;">O'ZBEKISTON RESPUBLIKASI</h2>
                      <p style="text-align: center;">Malaka oshirish haqida</p>
                      <h2 style="text-align: center;">MALAKA SERTIFIKATI</h2>
                      <p style="text-align: center;">{{ data.documentseries }} № {{ data.documentnumber }}</p>
          
                      <div style="margin-top: 150px;">  
                        <p style="margin-bottom: 30px;">Qayd raqami: ___<u>{{ data.docnumber }}</u>__</p>
                        <p>
                            Berilgan sana: {{ data.docdate.split('.')[2] }}-yil {{ data.docdate.split('.')[0] + '.' +  data.docdate.split('.')[1]}}
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            
            <td style="width: 50%;">
              <h3 style="text-align: center; margin-top: -150px; margin-bottom: 50px;">Mazkur malaka sertifikati egasi</h3>
              <p style="text-align: center; border-bottom: 1px solid black!important;">
                <u>&#8195;&#8195;&#8195;{{ data.personname }}&#8195;&#8195;&#8195;</u>
              </p>
              <p style="text-align: center; font-size: x-small; margin-top: -15px;">(Familiyasi, ismi, otasining ismi)</p>
              <p style="text-align: center;">
                  <u>%startYear% yil_%startDate%</u>__dan <u>%endYear%</u> yil___<u>%endDate%</u>___gacha
              </p>
      
              <p style="text-align: center;"><u>&#8195;&#8195;&#8195;%organizationname%&#8195;&#8195;&#8195;</u>da</p>
              <p style="text-align: center; font-size: x-small;margin-top: -15px;">(Ta'lim muassasining nomi)</p>
              <p style="text-align: center;">_______<u>%hour%</u>______soatli</p>
              
              <p style="text-align: center; font-size: x-small;margin-top: -15px;">(vaqti)</p>
              <p style="text-align: center;">_____<u>%coursname%</u>_______</p>
              <p style="text-align: center; font-size: x-small;margin-top: -15px;">(Malaka oshirish kursining nomi)</p>
              <p style="margin-left: 20px;">bo'yicha malakasini oshirdi.</p>
      
              <p class="rector" style="margin-left: 20px;">
                  <b>Rektor_______________<u>%rektor%</u>_______</b><br>
                  <small style="margin-left: 80px;"
                  ><span style="font-size: x-small;">Rektor imzosi</span
                  ><span style="font-size: x-small; margin-left: 80px;">(Familiyasi, ismi, otasining ismi)</span></small
                  >
              </p>
              <div class="shape" style="height: 100px; margin-top: 50px;">
                  <div class="circle">M.O'</div>
                  <div style="display: block;float: right;width: 200px">
                    <!-- <vue-qrcode
                      :scale="5"
                      :quality="1"
                      errorCorrectionLevel="H"
                      value="https://www.1stg.me"
                    />   -->
                  </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  // import VueQrcode from 'vue-qrcode'
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
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
      .body-malaka {
        min-height: 794px;
        width: 1122px;
        margin: 0;
        padding: 0;
        margin-left: auto;
        margin-right: auto;
      }
      .inner-doc-info {
          text-align: center;
      }
  
      .inner-doc-info p {
          margin-top: 15px;
      }
  
      .last-paragraph {
          text-align: left;
      }
  
      .inner-doc-info .rector {
          text-align: left;
      }
  
      .inner-doc-info .rector small span {
          margin-left: 100px;
      }
  
      .shape {
          margin-top: 25px;
          display: flex;
          justify-content: center;
      }
  
      .shape .circle {
          width: 103px;
          height: 103px;
          border: 1px solid;
          border-radius: 50%;
          padding: 35px;
      }
  
      .shape .rectangular {
          font-size: 15px;
          margin-left: 120px;
          border: 1px solid;
          padding: 35px;
      }
  </style>
  