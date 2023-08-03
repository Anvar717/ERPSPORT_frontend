<template>
  <b-overlay :show="loading">
      <b-row>
        <b-col lg="4">
          <b-card>
            <div class="d-flex justify-content-center">
              <img :src="!!items.PersonPhoto ?
                  axios.defaults.baseURL +
                  'FileManage/Get?id=' +
                  items.PersonPhoto.attachmentfileid:'data:image/jpg;base64,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'
                "
              class="img-thumbnail text-center" fluid style="display: flex;justify-content: center; width: 150px; height: 160px; object-fit: cover; max-width: 160px!important">
            </div>
            <div class="info_person">
              <h4 class="reference">МАЪЛУМОТНОМА</h4>
              <p class="text-center fullname mb-4" style="font-size: 18px">
                <b style="text-transform: uppercase"> {{ items.fullname }} </b>
              </p>
                <!-- <p class="text-center mb-4 date" style="font-size: 20px; border: 2px solid #26154F;color:#26154F; width:170px;border-radius:5px;margin-left: auto;  margin-right: auto;text-transform:capitalize"><b>{{ WorkOrganization.startdate }}</b></p> -->
                <!-- <p class="fullname mb-4" v-if="WorkOrganization" style="font-size: 18px"><b>{{ WorkOrganization.organizationname }} {{ WorkOrganization.departmentname }} {{ WorkOrganization.positionname }}`</b></p> -->
              <!-- <p class="year-title" v-if="items.PersonExperienceTables && items.PersonExperienceTables.length > 0"> {{ items.PersonExperienceTables[items.PersonExperienceTables.length-1].startdate  }} дан</p>
              <p class="person-position" v-if="items.PersonExperienceTables && items.PersonExperienceTables.length > 0">{{  items.PersonExperienceTables[items.PersonExperienceTables.length-1].companyname }}  </p> -->
              <p class="year-title" v-if="items.PersonExperienceTables && items.PersonExperienceTables.length > 0"> {{ items.PersonExperienceTables[0].startdate  }} дан</p>
              <p class="person-position" v-if="items.PersonExperienceTables && items.PersonExperienceTables.length > 0">{{  items.PersonExperienceTables[0].companyname }} ({{  items.PersonExperienceTables[0].companyinn }}) </p>
              <p class="person-position" style="font-size: 18px;" v-if="items.PersonExperienceTables && items.PersonExperienceTables.length > 0"> {{  items.PersonExperienceTables[0].structurename }}  </p>
              <p class="person-position" style="font-size: 18px;" v-if="items.PersonExperienceTables && items.PersonExperienceTables.length > 0"> {{  items.PersonExperienceTables[0].positionname }}  </p>
              <div class="about-person-info">
                <hr class="about-hr">
                <div class="person-info-items">
                  <div class="person-info-list">
                    <div class="d-block">
                      <img class="image" src="../../public/img/person-img/date-of-birth.png" alt="">
                    </div>
                    <div class="info">
                      <p class="birthdate-text">Туғилган йили:</p>
                      <p class="birthdate-count"><b>{{ items.dateofbirth }}</b></p>
                    </div>
                  </div>
                  <div class="person-info">
                    <hr>
                    <div class="person-info-list">
                      <div class="d-block">
                        <img class="image" src="../../public/img/person-img/date-of-birth.png" alt="">
                      </div>
                      <div class="info">
                        <p class="birthdate-text">{{ $t('pinfl') }}:</p>
                        <p class="birthdate-count"><b> {{  items.pinfl  }} </b></p>
                      </div>
                    </div>
                  </div>
                  <div class="person-info">
                    <hr>
                    <div class="person-info-list">
                      <div class="d-block">
                        <img class="image" src="../../public/img/person-img/date-of-birth.png" alt="">
                      </div>
                      <div class="info">
                        <p class="birthdate-text">Ҳужжатлар серияси ва рақами:</p>
                        <p class="birthdate-count"><b>
                          <div class="d-flex">
                            <div>
                            {{ items.DocumentTables[0].documentseries }}
                            </div>
                            <div class="text-center pl-2">
                            {{ items.DocumentTables[0].documentnumber }}
                            </div>
                          </div></b>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="person-info">
                    <hr>
                    <div class="person-info-list">
                      <div class="d-block">
                        <img class="image" src="../../public/img/person-img/01-home.png" alt="">
                      </div>
                      <div class="info">
                        <p class="birthdate-text">Туғилган жойи:</p>
                        <p class="birthdate-count"><b>{{ items.birthoblastname }}, {{ items.birthregionname }}</b></p>
                      </div>
                    </div>
                  </div>
                  <div class="person-info">
                    <hr>
                    <div class="person-info-list">
                      <div class="d-block">
                        <img class="image" src="../../public/img/person-img/01-home.png" alt="">
                      </div>
                      <div class="info">
                        <p class="birthdate-text">Яшаш жойи ҳақида маълумот:</p>
                        <p class="birthdate-count"><b>{{ items.liveoblastname }}, {{ items.liveregionname }}</b></p>
                      </div>
                    </div>
                  </div>
                  <div class="person-info">
                    <hr>
                    <div class="person-info-list">
                      <div class="d-block">
                        <img class="image" src="../../public/img/person-img/language.png" alt="">
                      </div>
                      <div class="info">
                        <p class="birthdate-text">Миллати:</p>
                        <p class="birthdate-count"><b>{{ items.nationalityname }}</b></p>
                      </div>
                    </div>
                  </div>
                  <div class="person-info">
                    <hr>
                    <div class="person-info-list">
                      <div class="d-block">
                        <img class="image" src="../../public/img/person-img/learn.png" alt="">
                      </div>
                      <div class="info" >
                        <p class="birthdate-text">Маълумоти:</p>
                        <p class="birthdate-count" ><b>{{ diplominfo && diplominfo.length > 0 ?  diplominfo[0].edu_type_name : '-' }}</b></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-card>
        </b-col>
        <b-col lg="8" class="person-info-right">
          <b-row style="height: auto;">
            <b-col lg="6" >
              <b-card style="min-height: 565px;">
                <div class="person-info-items">
                  <div class="person-info-list">
                    <div class="info">
                      <p class="birthdate-text">Партиявийлиги:</p>
                      <p class="birthdate-count"><b> {{ $t('no') }} </b></p>
                    </div>
                  </div>
                  <!-- <div class="person-info">
                    <hr>
                    <div class="person-info-list">
                      <div class="info">
                        <p class="birthdate-text">Партиявийлиги:</p>
                        <p class="birthdate-count"><b>Ўзбекистон Халқ демократик партияси аъзоси (ёки йўқ)</b></p>
                      </div>
                    </div>
                  </div> -->
                  <div class="person-info">
                    <hr>
                    <div class="person-info-list">
                      <div class="info">
                        <p class="birthdate-text">Тамомлаган:</p>
                        <p class="birthdate-count" v-for="(item,index) in diplominfo">
                          <b> {{ item.edu_finishing_date.split('.')[2] }}  {{ $t('yearShort') }} {{ item.institution_name }} ({{  item.degree_name  }}) </b>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="person-info">
                    <hr>
                    <div class="person-info-list">
                      <div class="info">
                        <p class="birthdate-text">Маълумоти бўйича мутахассислиги:</p>
                        <p class="birthdate-count" v-for="(item,index) in diplominfo"><b> {{ item.speciality_name }} </b></p>
                      </div>
                    </div>
                  </div>
                  <div class="person-info">
                    <hr>
                    <div class="person-info-list">
                      <div class="info">
                        <p class="birthdate-text">{{ $t('IsForeigner') }}:</p>
                        <p class="birthdate-count" ><b> {{ items.IsForeigner ? $t('yes') : $t('no') }} </b></p>
                      </div>
                    </div>
                  </div>
                </div>
              </b-card>
            </b-col>
            <b-col lg="6">
              <b-card style="min-height: 525px;">
                <div class="person-info-items">
                  <div class="person-info-list">
                    <div class="info">
                      <p class="birthdate-text">Илмий даражаси:</p>
                      <p class="birthdate-count">
                        <b>{{ $t('no') }}</b></p>
                    </div>
                  </div>
                  <div class="person-info">
                    <hr>
                    <div class="person-info-list">
                      <div class="info">
                        <p class="birthdate-text">Илмий унвони:</p>
                        <p class="birthdate-count"><b>{{  $t('no')  }}</b></p>
                      </div>
                    </div>
                  </div>
                  <div class="person-info">
                    <hr>
                    <div class="person-info-list">
                      <div class="info">
                        <p class="birthdate-text">Қайси чет тилларини билади:</p>
                        <p class="birthdate-count"><b>рус, инглиз </b>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="person-info">
                    <hr>
                    <div class="person-info-list">
                      <div class="info">
                        <p class="birthdate-text">Давлат мукофотлари билан тақдирланганми (қанақа):</p>
                        <p class="birthdate-count"><b>йўқ</b></p>
                      </div>
                    </div>
                  </div>
                  <div class="person-info">
                    <hr>
                    <div class="person-info-list">
                      <div class="info">
                        <p class="birthdate-text">Халқ  депутатлари республика, вилоят, шаҳар
                          ва туман Кенгаши депутатими ёки бошқа
                          сайланадиган органларнинг аъзосими
                          (тўлиқ кўрсатилиши лозим):</p>
                        <p class="birthdate-count"><b>йўқ</b></p>
                      </div>
                    </div>
                  </div>
                </div>
              </b-card>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12">
              <b-card>
                <div class="header-info">
                  <div class="portfolio-img">
                    <img class="image" src="../../public/img/person-img/suitcase (1).png" alt="">
                  </div>
                  <div style="width: 100%;">
                    <div class="d-flex justify-content-between">
                      <h3 class="title mb-0">МЕҲНАТ ФАОЛИЯТИ</h3>
                      <span @click="$emit('experience')" style="background-color:#26154F;border-radius: 10px;cursor:pointer" class="d-flex align-items-center text-white px-5">
                        <b-spinner small v-if="ExperienceLoading"></b-spinner>
                        <span v-if="!ExperienceLoading"> {{ $t('checkDocument') }} </span>
                      </span>
                    </div>
                    <hr>
                  </div>
                </div>
                <div class="portfolio-items">
                  <div class="step active" v-for="(item,index) in items.PersonExperienceTables">
                    <div class="v-stepper">
                      <div class="circle"></div>
                      <div class="line"></div>
                    </div>
                    <div class="content">
                      <div class="portfolio-list">
                        <p class="portfolio-year" style="white-space:nowrap"> {{ item.startdate }} - {{ item.enddate }} </p>
                        <p class="text"> {{ item.companyname }} ({{ item.companyinn }}) </p>
                        <span v-if="item.structurename" style="font-size: 16px;"> {{ item.structurename }} </span>
                        <br v-if="item.structurename" />
                        <span v-if="item.positionname" style="font-size: 16px;"> {{ item.positionname }} </span>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="step active">
                    <div class="v-stepper">
                      <div class="circle"></div>
                      <div class="line"></div>
                    </div>
                    <div class="content">
                      <div class="portfolio-list">
                        <p class="portfolio-year"> 1993-1997 йй. </p>
                        <p class="text">Тошкент давлат университети фалсафа кафедраси аспиранти</p>
                      </div>
                    </div>
                  </div>
                  <div class="step active">
                    <div class="v-stepper">
                      <div class="circle"></div>
                      <div class="line"></div>
                    </div>
                    <div class="content">
                      <div class="portfolio-list">
                        <p class="portfolio-year"> 1993-1997 йй. </p>
                        <p class="text">Ўзбекистон Миллий университети фалсафа кафедраси ўқитувчиси</p>
                      </div>
                    </div>
                  </div>
                  <div class="step active">
                    <div class="v-stepper">
                      <div class="circle"></div>
                      <div class="line"></div>
                    </div>
                    <div class="content">
                      <div class="portfolio-list">
                        <p class="portfolio-year"> 1993-1997 йй. </p>
                        <p class="text">Ўзбекистон Миллий университети фалсафа факультети доценти</p>
                      </div>
                    </div>
                  </div> -->
                </div>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-card v-if="false">
        <div class="header-info">
          <div class="portfolio-img">
            <img class="image" src="../../public/img/person-img/info (1).png" alt="">
          </div>
          <div style="width: 100%;">
            <h3 class="title">Умумий маълумотлар</h3>
            <hr>
          </div>
        </div>
        <b-row style="height: auto;" class="all-info">
          <b-col lg="6" >
              <div class="person-info-items">
                <div class="person-info-list">
                  <div class="info">
                    <p class="birthdate-text">ФИШ:</p>
                    <p class="birthdate-count"><b> Жалолов Баҳодир Исомиддин ўғли </b></p>
                  </div>
                </div>
                <div class="person-info">
                  <hr>
                  <div class="person-info-list">
                    <div class="info">
                      <p class="birthdate-text">Миллати:</p>
                      <p class="birthdate-count"><b>Ўзбек</b></p>
                    </div>
                  </div>
                </div>
                <div class="person-info">
                  <hr>
                  <div class="person-info-list">
                    <div class="info">
                      <p class="birthdate-text">Ҳужжатлар серияси ва рақами:</p>
                      <p class="birthdate-count" >
                        <b> АБ 9904057 </b>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="person-info">
                  <hr>
                  <div class="person-info-list">
                    <div class="info">
                      <p class="birthdate-text">Яшаш жойи ҳақида маълумот:</p>
                      <p class="birthdate-count"><b> САРИОСИЁ ТУМАНИ </b></p>
                    </div>
                  </div>
                </div>
              </div>
          </b-col>
          <b-col lg="6">
              <div class="person-info-items">
                <div class="person-info-list">
                  <div class="info">
                    <p class="birthdate-text">Туғилган сана:</p>
                    <p class="birthdate-count">
                      <b>{{ $t('no') }}</b></p>
                  </div>
                </div>
                <div class="person-info">
                  <hr>
                  <div class="person-info-list">
                    <div class="info">
                      <p class="birthdate-text">ПИНФЛ:</p>
                      <p class="birthdate-count"><b>0807941770020</b></p>
                    </div>
                  </div>
                </div>
                <div class="person-info">
                  <hr>
                  <div class="person-info-list">
                    <div class="info">
                      <p class="birthdate-text">Туғилган жойи:</p>
                      <p class="birthdate-count"><b>Сурхондарё вилояти, Сариаси тумани, SARIOSIYO TUMANI</b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
          </b-col>
        </b-row>
      </b-card>
      <b-row class="m-3" v-if="false">
        <b-card>
          <div class="header-info">
            <div class="portfolio-img">
              <img class="image" src="../../public/img/person-img/condo.png" alt="">
            </div>
            <div style="width: 100%;">
              <h3 class="title">Таълим спорт муассасалари</h3>
              <hr>
            </div>
          </div>
          <b-row style="height: auto;" class="all-info">
            <b-col lg="6" >
                <div class="person-info-items">
                  <div class="person-info-list">
                    <div class="info">
                      <p class="birthdate-text">Спорт тури:</p>
                      <p class="birthdate-count"><b> Бокс </b></p>
                    </div>
                  </div>
                  <div class="person-info">
                    <hr>
                    <div class="person-info-list">
                      <div class="info">
                        <p class="birthdate-text">Ташкилот номи:</p>
                        <p class="birthdate-count"><b>Спорт яккакурашлари бўйича Республика олий спорт маҳорати мактаби</b></p>
                      </div>
                    </div>
                  </div>
                  <div class="person-info">
                    <hr>
                    <div class="person-info-list">
                      <div class="info">
                        <p class="birthdate-text">Ҳужжатлар серияси ва рақами:</p>
                        <p class="birthdate-count" >
                          <b> АБ 9904057 </b>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="person-info">
                    <hr>
                    <div class="person-info-list">
                      <div class="info">
                        <p class="birthdate-text">Яшаш жойи ҳақида маълумот:</p>
                        <p class="birthdate-count"><b> САРИОСИЁ ТУМАНИ </b></p>
                      </div>
                    </div>
                  </div>
                  <div class="person-info">
                    <hr>
                    <div class="person-info-list">
                      <div class="info">
                        <p class="birthdate-text">Спорт тоифалари ва унвонлари:</p>
                        <p class="birthdate-count"><b> ХТСУ (Халқаро гроссмейстер) </b></p>
                      </div>
                    </div>
                  </div>
                  <div class="person-info">
                    <hr>
                    <div class="person-info-list">
                      <div class="info">
                        <p class="birthdate-text">Белгиланган вақт:</p>
                        <p class="birthdate-count"><b> 03.03.2023 </b></p>
                      </div>
                    </div>
                  </div>
                </div>
            </b-col>
            <b-col lg="6">
              <div class="person-info-items">
                <div class="person-info-list">
                  <div class="info">
                    <p class="birthdate-text">Спорт гуруҳи:</p>
                    <p class="birthdate-count">
                      <b>Бокс Олий спорт маҳорати босқичи</b></p>
                  </div>
                </div>
                <div class="person-info">
                  <hr>
                  <div class="person-info-list">
                    <div class="info">
                      <p class="birthdate-text">Биринчи мураббий:</p>
                      <p class="birthdate-count"><b>Қиличев Тўлқин Махмуротович</b></p>
                    </div>
                  </div>
                </div>
                <div class="person-info">
                  <hr>
                  <div class="person-info-list">
                    <div class="info">
                      <p class="birthdate-text">Терма жамоага муносабат:</p>
                      <p class="birthdate-count"><b>Катталар терма жамоаси</b>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="person-info">
                  <hr>
                  <div class="person-info-list">
                    <div class="info">
                      <p class="birthdate-text">Аъзолик даражаси:</p>
                      <p class="birthdate-count"><b>Асосий таркиб</b>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="person-info">
                  <hr>
                  <div class="person-info-list">
                    <div class="info">
                      <p class="birthdate-text">Терма жамоа мураббийи:</p>
                      <p class="birthdate-count"><b>Расулов Комилжон Куддусович</b>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="person-info">
                  <hr>
                  <div class="person-info-list">
                    <div class="info">
                      <p class="birthdate-text">Ташкилотни таъминлаш:</p>
                      <p class="birthdate-count"><b>Спорт яккакурашлари бўйича Республика олий спорт маҳорати мактаби</b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-row>
      <b-row class="m-3" v-if="false">
          <b-card style="width: 100%;">
            <div class="header-info">
              <div class="portfolio-img">
                <img class="image" src="../../public/img/person-img/football.png" alt="">
              </div>
              <div style="width: 100%;">
                <h3 class="title">Давлат мукофоти</h3>
                <hr>
              </div>
            </div>
            <b-row style="height: auto;" class="all-info">
              <b-col lg="6" >
                  <div class="person-info-items">
                    <div class="person-info-list">
                      <div class="info">
                        <p class="birthdate-text">Давлат мукофоти:</p>
                        <p class="birthdate-count"><b> Белгиланган вақт </b></p>
                      </div>
                    </div>
                  </div>
              </b-col>
          </b-row>
        </b-card>
      </b-row>
      <b-row class="m-3 " v-if="false">
        <b-card style="width: 100%;">
          <div class="header-info">
            <div class="portfolio-img">
              <img class="image" src="../../public/img/person-img/condo.png" alt="">
            </div>
            <div style="width: 100%;">
              <h3 class="title">Мусобақадаги ютуқлар</h3>
              <hr>
            </div>
          </div>
          <b-row style="height: auto;" class="all-info">
            <b-col lg="6" >
                <div class="person-info-items">
                  <div class="person-info-list">
                    <div class="info">
                      <p class="birthdate-text">Рақобат даражаси:</p>
                      <p class="birthdate-count"><b> Халқаро спорт мусобақалари </b></p>
                    </div>
                  </div>
                  <div class="person-info">
                    <hr>
                    <div class="person-info-list">
                      <div class="info">
                        <p class="birthdate-text">Шахсий кўрсаткич:</p>
                        <p class="birthdate-count"><b>Спорт дастури</b></p>
                      </div>
                    </div>
                  </div>
                  <div class="person-info">
                    <hr>
                    <div class="person-info-list">
                      <div class="info">
                        <p class="birthdate-text">Эришган натижа:</p>
                        <p class="birthdate-count" >
                          <b> 1-ўрин </b>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
            </b-col>
            <b-col lg="6">
              <div class="person-info-items">
                <div class="person-info-list">
                  <div class="info">
                    <p class="birthdate-text">Musobaqa nomi:</p>
                    <p class="birthdate-count">
                      <b>Халқаро турнир</b></p>
                  </div>
                </div>
                <div class="person-info">
                  <hr>
                  <div class="person-info-list">
                    <div class="info">
                      <p class="birthdate-text">Вазн тоифаси :</p>
                      <p class="birthdate-count"><b>91+ кг</b></p>
                    </div>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-row>
      <b-row class="m-3 " v-if="false">
        <b-card style="width: 100%;">
          <div class="header-info">
            <div class="portfolio-img">
              <img class="image" src="../../public/img/person-img/condo.png" alt="">
            </div>
            <div style="width: 100%;">
              <h3 class="title">Антропометрик кўрсаткичлар</h3>
              <hr>
            </div>
          </div>
          <b-row style="height: auto;" class="all-info">
            <b-col lg="6" >
                <div class="person-info-items">
                  <div class="person-info-list">
                    <div class="info">
                      <p class="birthdate-text">Сана:</p>
                      <p class="birthdate-count"><b> 01.04.2023 </b></p>
                    </div>
                  </div>
                  <div class="person-info">
                    <hr>
                    <div class="person-info-list">
                      <div class="info">
                        <p class="birthdate-text">Оғирлиги:</p>
                        <p class="birthdate-count"><b>110.00 кг</b></p>
                      </div>
                    </div>
                  </div>
                </div>
            </b-col>
            <b-col lg="6">
              <div class="person-info-items">
                <div class="person-info-list">
                  <div class="info">
                    <p class="birthdate-text">Ўсиш:</p>
                    <p class="birthdate-count">
                      <b>205.00 см</b></p>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-row>
      <b-row>
        <b-col>
          <b-card>
            <div class="header-info">
            <div class="portfolio-img">
              <img class="image" src="../../public/img/person-img/FamilyMembers.png" alt="">
            </div>
            <div style="width: 100%;">
              <h3 class="title">Яқин қариндошлари ҳақида МАЪЛУМОТ</h3>
              <hr>
            </div>
          </div>
            <b-table-simple class="custom-class-table-simple" hover small caption-top responsive bordered style="border-radius: 10px;">
              <b-thead>
                <b-tr>
                  <b-th>  {{ $t('kinshipdegree')  }} </b-th>
                  <b-th> {{ $t('fio') }} </b-th>
                  <b-th> {{ $t('dateofbirth') }} </b-th>
                  <b-th> {{ $t('workplace') }} </b-th>
                  <b-th> {{ $t('LivePlace') }} </b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item,index) in items.PersonRelativeTables"> 
                  <b-td> <b> {{ item.kinshipdegreename }} </b> </b-td>
                  <b-td> {{ item.fullname }} </b-td>
                  <b-td > {{ item.dateofbirth }}   </b-td>
                  
                  <b-td class="text-center" colspan="2" v-if="item.hasdied"> {{ item.dateofdeath }} да вафот этган  </b-td>
                  <b-td v-if="!item.hasdied">  </b-td>
                  <b-td v-if="!item.hasdied"> {{ item.oblastname }}, {{ item.regionname }}, {{  item.mfyname  }}, {{ item.address }} </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-card>
        </b-col>
      </b-row>


      <!-- <b-row>
        <b-col lg="10" class="text-center">
          <p class="text-center mb-4 mt-3" style="font-size: 20px">
            {{ $t("reference") }}
          </p>
          <p class="text-center mb-4" style="font-size: 18px">
            <b style="text-transform: uppercase"> {{ items.fullname }} </b>
          </p>
          <p class="" style="font-size: 18px" v-if="history">
            {{
              history.length > 0
                ? history[history.length - 1].oblastname +
                  ", " +
                  history[history.length - 1].regionname +
                  ", " +
                  history[history.length - 1].organizationname +
                  ", " +
                  history[history.length - 1].positionname
                : ""
            }}
          </p>
        </b-col>
        <b-col class="person-info-image p-0">
          <b-card
            bg-variant="light"
            class="person-photo"
          > <img :src="!!items.PersonPhoto ?
                axios.defaults.baseURL +
                'FileManage/Get?id=' +
                items.PersonPhoto.attachmentfileid:'data:image/jpg;base64,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'
              "
            class="img-thumbnail float-end" fluid style="width: 150px; height: 160px; object-fit: cover; max-width: 160px!important; margin-top:-21px; margin-left:-30px;">
          </b-card>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col sm="12" lg="6">
          <b-card bg-variant="light" style="font-size: 16px">
            <b-row>
              <b-col>
                <b> {{ $t("citizenship") }} </b>
              </b-col>
              <b-col>
                {{ items.citizenshipname }}
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <b> {{ $t("nationality") }} :</b>
              </b-col>
              <b-col>
                {{ items.nationalityname }}
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row> -->
      <!-- <b-row class="mt-3">
        <b-col>
          <b-card bg-variant="light" style="font-size: 16px">
            <b-row>
              <b-col>
                <h5 class="text-center">{{ $t("AddressPlace") }}</h5>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <h5 style="font-weight: bold">{{ $t("birthcountry") }}</h5>
              </b-col>
              <b-col>
                {{ items.birthcountryname }}
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <h5 style="font-weight: bold">{{ $t("birthoblast") }}</h5>
              </b-col>
              <b-col>
                {{ items.birthoblastname }}
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <h5 style="font-weight: bold">{{ $t("birthregion") }}</h5>
              </b-col>
              <b-col>
                {{ items.birthregionname }}
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <h5 style="font-weight: bold">{{ $t("dateofbirth") }}</h5>
              </b-col>
              <b-col>
                {{ items.dateofbirth }}
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col>
          <b-card bg-variant="light" style="font-size: 16px">
            <b-row>
              <b-col>
                <h5 class="text-center">{{ $t("InfoLivePlace") }}</h5>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <h5 style="font-weight: bold">{{ $t("oblastname") }}</h5>
              </b-col>
              <b-col>
                {{ items.LivePlaceTables[0].oblastname }}
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <h5 style="font-weight: bold">{{ $t("regionname") }}</h5>
              </b-col>
              <b-col>
                {{ items.LivePlaceTables[0].regionname }}
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <h5 style="font-weight: bold">{{ $t("mfyname") }}</h5>
              </b-col>
              <b-col>
                {{ items.LivePlaceTables[0].mfyname }}
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <h5 style="font-weight: bold">{{ $t("address") }}</h5>
              </b-col>
              <b-col>
                {{ items.LivePlaceTables[0].address }}
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card bg-variant="light">
            <b-row class="text-center">
              <b-col>
                <h5>{{ $t("passport") }}</h5>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <h5 style="font-weight: bold">{{ $t("documentseries") }}</h5>
              </b-col>
              <b-col>
                <h5 style="font-weight: bold" class="text-center">
                  {{ $t("documentnumber") }}
                </h5>
              </b-col>
              <b-col>
                <h5 style="font-weight: bold" class="text-right">
                  {{ $t("dateofissue") }}
                </h5>
              </b-col>
            </b-row>
            <b-row style="font-size: 16px">
              <b-col>
                {{ items.DocumentTables[0].documentseries }}
              </b-col>
              <b-col class="text-center">
                {{ items.DocumentTables[0].documentnumber }}
              </b-col>
              <b-col class="text-right">
                {{ items.DocumentTables[0].dateofissue }}
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <!-- <b-row v-for="(item, index) in diplominfo" :key="index">
        <b-col>
          <b-card bg-variant="light">
            <b-row class="text-center">
              <b-col>
                <h5>{{ index + 1 }}. {{ $t("diplominfo") }}</h5>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12" md="12">
                <b-row>
                  <b-col cols="4">
                    <h5 style="font-weight: bold">
                      {{ $t("otm_current_name") }}
                    </h5>
                  </b-col>
                  <b-col cols="8">
                    {{ item.otmcurrentname }}
                  </b-col>
                </b-row>
              </b-col>
              <b-col sm="12" md="6">
                <b-row>
                  <b-col>
                    <h5 style="font-weight: bold">{{ $t("faculty_name") }}</h5>
                  </b-col>
                  <b-col>
                    {{ item.facultyname }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <h5 style="font-weight: bold">{{ $t("inputmask") }}</h5>
                  </b-col>
                  <b-col>
                    {{ item.diplomaserial }} {{ item.diplomanumber }}
                  </b-col>
                </b-row>
              </b-col>
              <b-col sm="12" md="6">
                <b-row>
                  <b-col>
                    <h5 style="font-weight: bold">
                      {{ $t("education_started_date") }}
                    </h5>
                  </b-col>
                  <b-col>
                    {{ item.educationstarteddate }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <h5 style="font-weight: bold">{{ $t("dateofissue") }}</h5>
                  </b-col>
                  <b-col>
                    {{ item.diplomagivendate }}
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row> -->
      <!-- <b-row v-for="(item, index) in diplominfo" :key="index">
        <b-col>
          <b-card bg-variant="light">
            <b-row class="text-center">
              <b-col>
                <h5>{{ index + 1 }}. {{ $t("diplominfo") }}</h5>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12" md="12">
                <b-row>
                  <b-col cols="4">
                    <h5 style="font-weight: bold">
                      {{ $t("institution") }}
                    </h5>
                  </b-col>
                  <b-col cols="8">
                    {{ item.institution_name }}
                  </b-col>
                </b-row>
              </b-col>
              <b-col sm="12" md="6">
                <b-row>
                  <b-col>
                    <h5 style="font-weight: bold">{{ $t("edu_type") }}</h5>
                  </b-col>
                  <b-col>
                    {{ item.edu_type_name }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <h5 style="font-weight: bold">{{ $t("edudegreename") }}</h5>
                  </b-col>
                  <b-col>
                    {{ item.degree_name }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <h5 style="font-weight: bold">
                      {{ $t("edu_form") }}
                    </h5>
                  </b-col>
                  <b-col>
                    {{ item.edu_form_name }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <h5 style="font-weight: bold">
                      {{ $t("diploma") }}
                    </h5>
                  </b-col>
                  <b-col>
                    {{ item.diploma_serial }} {{ item.diploma_number }}
                  </b-col>
                </b-row>
              </b-col>
              <b-col sm="12" md="6">
                <b-row>
                  <b-col>
                    <h5 style="font-weight: bold">
                      {{ $t("edu_starting_date") }}
                    </h5>
                  </b-col>
                  <b-col>
                    {{ item.edu_starting_date }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <h5 style="font-weight: bold">
                      {{ $t("edu_finishing_date") }}
                    </h5>
                  </b-col>
                  <b-col>
                    {{ item.edu_finishing_date }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <h5 style="font-weight: bold">
                      {{ $t("givendate") }}
                    </h5>
                  </b-col>
                  <b-col>
                    {{ item.diploma_given_date }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <h5 style="font-weight: bold">
                      {{ $t("DiplomaStatus") }}
                    </h5>
                  </b-col>
                  <b-col>
                    {{ item.status_name }}
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row> -->
      <!-- <b-row>
        <b-col>
          <b-card bg-variant="light" style="font-size: 16px">
            <b-row>
              <b-col>
                <h5 class="text-center">{{ $t("personrelative") }}</h5>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <h5 style="font-weight: bold">{{ $t("kinshipdegree") }}</h5>
              </b-col>
              <b-col class="text-center">
                <h5 style="font-weight: bold">{{ $t("familyname") }}</h5>
              </b-col>
              <b-col class="text-center">
                <h5 style="font-weight: bold">{{ $t("firstname") }}</h5>
              </b-col>
              <b-col class="text-center">
                <h5 style="font-weight: bold">{{ $t("lastname") }}</h5>
              </b-col>
              <b-col class="text-center">
                <h5 style="font-weight: bold">{{ $t("dateofbirth") }}</h5>
              </b-col>
            </b-row>
            <b-row
              v-for="(item, key) in items.PersonRelativeTables"
              :key="key"
              class="mt-2"
            >
              <b-col>
                {{ item.kinshipdegreename }}
              </b-col>
              <b-col class="text-center">
                {{ item.familyname }}
              </b-col>
              <b-col class="text-center">
                {{ item.firstname }}
              </b-col>
              <b-col class="text-center">
                {{ item.lastname }}
              </b-col>
              <b-col class="text-center">
                {{ item.dateofbirth }}
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row> -->
      <!-- <b-row>
        <b-col>
          <b-card bg-variant="light" style="font-size: 16px">
            <b-row>
              <b-col>
                <h5 class="text-center">{{ $t("personhistory") }}</h5>
              </b-col>
            </b-row>
            <b-row v-for="(item, key) in history" :key="key + 'history'">
              <b-col>
                <h5>{{ item.startdate }} - {{ item.enddate }}</h5>
              </b-col>
              <b-col>
                {{
                  item.oblastname +
                  ", " +
                  item.regionname +
                  ", " +
                  item.organizationname +
                  ", " +
                  item.employmenttypename +
                  ", " +
                  item.positionname
                }}
                <b-modal
                  :id="'SchoolSubjectModal' + key"
                  :title="$t('SchoolSubject')"
                  :cancel-title="$t('Cancel')"
                  :ok-title="$t('Accept')"
                  cancel-variant="danger"
                  ok-variant="success"
                  @ok="SchoolSubject(item)"
                >
                  <div class="text-right" style="width: 400px">
                    <v-select
                      :options="SchoolSubjectList"
                      :reduce="(item) => item.id"
                      :placeholder="$t('schoolsubject')"
                      v-model="HrAcceptanceWork.schoolsubjectid"
                      label="name"
                    ></v-select>
                  </div>
                </b-modal>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row> -->
      <!-- <b-row>
        <b-col>
          <b-card bg-variant="light" style="font-size: 16px">
            <b-row>
              <b-col>
                <h5 class="text-center">{{ $t("AppointQualCategory") }}</h5>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <h5 style="font-weight: bold">
                  {{ $t("qualificationcategoryname") }}
                </h5>
              </b-col>
              <b-col class="text-center">
                <h5 style="font-weight: bold">{{ $t("docseries") }}</h5>
              </b-col>
              <b-col class="text-center">
                <h5 style="font-weight: bold">{{ $t("number") }}</h5>
              </b-col>
              <b-col class="text-center">
                <h5 style="font-weight: bold">{{ $t("subject") }}</h5>
              </b-col>
              <b-col class="text-center">
                <h5 style="font-weight: bold">{{ $t("dateofissue") }}</h5>
              </b-col>
            </b-row>
            <b-row
              v-for="(item, key) in appointqualcategorylist"
              :key="key"
              class="mt-2"
            >
              <b-col>
                {{ item.qualificationcategoryname }}
              </b-col>
              <b-col class="text-center">
                {{ item.documentseries }}
              </b-col>
              <b-col class="text-center">
                {{ item.documentnumber }}
              </b-col>
              <b-col class="text-center">
                {{ item.schoolsubjectname }}
              </b-col>
              <b-col class="text-center">
                {{ item.startdate }}
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row> -->
      <!-- <b-row>
        <b-col>
          <b-card bg-variant="light" style="font-size: 16px">
            <b-row>
              <b-col>
                <h5 class="text-center">{{ $t("CertForeignLang") }}</h5>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <h5 style="font-weight: bold">{{ $t("givenorganization") }}</h5>
              </b-col>
              <b-col class="text-center">
                <h5 style="font-weight: bold">{{ $t("docseries") }}</h5>
              </b-col>
              <b-col class="text-center">
                <h5 style="font-weight: bold">{{ $t("number") }}</h5>
              </b-col>
              <b-col class="text-center">
                <h5 style="font-weight: bold">{{ $t("subject") }}</h5>
              </b-col>
              <b-col class="text-center">
                <h5 style="font-weight: bold">{{ $t("dateofissue") }}</h5>
              </b-col>
            </b-row>
            <b-row
              v-for="(item, key) in certforeignlanglist"
              :key="key"
              class="mt-2"
            >
              <b-col>
                {{ item.givenorganization }}
              </b-col>
              <b-col class="text-center">
                {{ item.documentseries }}
              </b-col>
              <b-col class="text-center">
                {{ item.documentnumber }}
              </b-col>
              <b-col class="text-center">
                {{ item.schoolsubjectname }}
              </b-col>
              <b-col class="text-center">
                {{ item.startdate }}
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row> -->
      <!-- <b-row>
        <b-col>
          <b-card bg-variant="light" style="font-size: 16px">
            <b-row>
              <b-col>
                <h5 class="text-center">{{ $t("ExperienceTables") }}</h5>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col cols="4">
                <h5 style="font-weight: bold">{{ $t("organizationname") }}</h5>
              </b-col>
              <b-col class="text-center">
                <h5 style="font-weight: bold">{{ $t("positionname") }}</h5>
              </b-col>
              <b-col class="text-center">
                <h5 style="font-weight: bold">{{ $t("contract") }}</h5>
              </b-col>
              <b-col class="text-center">
                <h5 style="font-weight: bold">{{ $t("startdate") }}</h5>
              </b-col>
              <b-col class="text-center">
                <h5 style="font-weight: bold">{{ $t("enddate") }}</h5>
              </b-col>
            </b-row>
            <b-row
              v-for="(item, key) in experienceTables"
              :key="key"
              class="mt-2 border-top py-1"
            >
              <b-col cols="4">
                {{ item.companyname }}
              </b-col>
              <b-col class="text-left">
                {{ item.positionname }}
              </b-col>
              <b-col class="text-center">
                {{ item.contractdate }} ({{ item.contractnumber }})
              </b-col>
              <b-col class="text-center">
                {{ item.startdate }}
              </b-col>
              <b-col class="text-center">
                {{ item.enddate }}
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>  -->
  </b-overlay>
</template>

<script>
import SchoolSubjectService from "@/services/SchoolSubject.service";
import EmployeeManageService from '@/services/EmployeeManage.service'
import HrAcceptanceWorkService from "@/services/HrAcceptanceWork.service";
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Object,
    },
    history: {
      type: Array,
    },
    diplominfo: {
      type: Array,
    },
    appointqualcategorylist: {
      type: Array,
    },
    certforeignlanglist: {
      type: Array,
    },
    experienceTables: {
      type: Array,
    },
    ExperienceLoading: {
      type : Boolean
    }
  },
  data() {
    return {
      SaveLoading: false,
      SchoolSubjectLoading: false,
      SchoolSubjectList: [],
      HrAcceptanceWork: {},
      PersonData: {},
    };
  },
  created() {
    
  },
  methods: {
    //   Refresh() {
    //   EmployeeManageService.GetEmployeeCard()
    //     .then(res => {
    //      alert(1)
    //       this.WorkOrganization = res.data.PersonData.currentWorkOrganization;
    //     })
    //     .catch(error => {
    //       this.Loading = false;
    //       if (error.response.data.status == 500) {
    //         this.makeToast(this.$t("errormessage500"), "error");
    //       } else {
    //         this.makeToast(error.response.data, "error");
    //       }
    //     });
    // },

    makeToast(message, title, type) {
      var self = this;
      self.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    SchoolSubjectShowModal(item, key){
      this.$bvModal.show("SchoolSubjectModal" + key);
      SchoolSubjectService.GetAll().then((res) => {
        this.SchoolSubjectList = res.data;
    });
    },
    SchoolSubject(item) {
      this.HrAcceptanceWork.hracceptanceworktableid =
        item.hracceptanceworktableid;
      this.HrAcceptanceWork.documentid = item.documentid;
      HrAcceptanceWorkService.UpdateHrAcceptanceWorkSchoolSubject(
        this.HrAcceptanceWork
      ).then((res) => {
        this.makeToast(
          this.$t("SuccessMessage"),
          this.$t("message"),
          "success"
        );
        this.$emit("changesubject")
        // this.$router.push({
        //   name: "EmployeeReports",
        // });
      });
      //this.RefreshSchoolSubject()
    },
  },
};
</script>

<style lang="scss">
.step {
  
  padding: 10px;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  
  background-color: cream;
}

.v-stepper {
  position: relative;
/*   visibility: visible; */
  top: 30px;
}


/* regular step */
.step .circle {
  background-color: white;
  border: 3px solid #26154F;
  border-radius: 100%;
  width: 20px;    /* +6 for border */
  height: 20px;
  display: inline-block;
}

.step .line {
    top: 23px;
  left: 9px;
/*   height: 120px; */
  height: 100%;
    
    position: absolute;
    border-left: 3px solid #26154F;
}

.step.completed .circle {
  visibility: visible;
  background-color: #26154F;
  border-color: #26154F;
}

.step.completed .line {
  border-left: 3px solid #26154F;
}

.step.active .circle {
visibility: visible;
  border-color: #26154F;
}

.step.empty .circle {
    visibility: hidden;
}

.step.empty .line {
/*     visibility: hidden; */
/*   height: 150%; */
  top: 0;
  height: 150%;
}


.step:last-child .line {
  border-left: 3px solid white;
  z-index: -1; /* behind the circle to completely hide */
}

.content {
  margin-left: 20px;
  display: inline-block;
}
.info_person {
  .reference {
    color: #707070;
    font-size: 17px;
    text-align: center; 
    margin-top: 20px;
  }
  .fullname {
    color: #26154F;
    font-size: 32px;
  }
  .year-title {
    padding: 5px 10px;
    border: 1px solid #26154F;
    border-radius: 7px;
    text-align: center;
    min-width: 240px;
    font-size: 19px;
    color: #26154F;
  }
  .person-position {
    font-size: 24px;
    color: #000000;
    font-weight: 500;
  }
  // .about-hr {
  //   color: ;
  // }
  .person-info-items {
    display: block;
    .person-info-list {
      .image {
        margin-top: 17px;
        margin-right: 15px;
      }
      display: flex;
      .info {
        .birthdate-text {
          padding: 0;
          margin: 0;
          font-size: 18px;
          color: #707070;
        }
        .birthdate-count {
          padding-top: 3px;
          font-size: 22px;
          color: #000000;
        }
      }
    }
  }
}
.person-info-right {
  .birthdate-text {
    padding: 0;
    margin: 0;
    font-size: 16px;
    color: #707070;
  }
  .birthdate-count {
    padding-top: 3px;
    font-size: 18px;
    color: #000000;
  }
}
.all-info {
  display: flex;
  padding-left: 70px;
  padding-top: 40px;
  .birthdate-text {
    padding: 0;
    margin: 0;
    font-size: 16px;
    color: #707070;
  }
  .birthdate-count {
    padding-top: 3px;
    font-size: 18px;
    color: #000000;
  }
}
.header-info {
  display: flex;
  align-items: flex-start;
  .portfolio-img {
    width: 51px;
    height: 51px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #26154F;
    margin-right: 20px; 
  }
  .title {
    text-transform: uppercase;
    font-size: 28px;
    color: #26154F;
  }
}
.portfolio-items {
  margin-top: 20px;
  .portfolio-list {
    margin-top: 20px;
    .portfolio-year {
      padding: 6px 12px;
      background-color: #26154F;
      color: #fff;
      text-align: center;
      font-size: 18px;
      min-width: 150px;
      width: fit-content;
      border-radius: 7px;
      font-weight: 500;
      margin-bottom: 10px;
    }
    .text {
      font-size: 24px;
      color: #000000;
      font-weight: 500;
    }
  }
}
.custom-class-table-simple{
  table{
    thead{
      th{
        background-color: #26154F;
        color: #fff;
        padding: 16px;
        font-size: 16px;
      }
    }
    tbody{
      tr{
        td{
          padding: 12px;
        }
      }
    }
  }
}
</style>