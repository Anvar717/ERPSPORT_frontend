<template>
  <b-overlay :show="loading" class="my-2">
      <b-container style="border:1px solid #eee">
            <b-row>
                <b-col >
                    <b-row>
                        <b-col sm="2">

                        </b-col>
                        <b-col sm="8">
                            <p v-if="items.OblastName == ''" class="text-center" style="font-size : 18px"> {{ (items.OblastName || '') + ', ' + (items.RegionName || '') + ', ' + (items.FullName || '') + ''}} </p>
                        </b-col>
                        <b-col sm="2">

                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <hr class="mx-n3" style="background-color:#ffffff" />
            <b-row class="mb-3">
                <b-col>
                        <b-row class="mt-2">
                            <b-col>
                                <h5> {{ $t('dateOfCreatedOrg') }} </h5>
                            </b-col>
                            <b-col>
                                <h5 class="text-center"> {{ $t('OrgDocument') }} </h5>
                            </b-col>
                            <b-col>
                                <h5 class="text-right">  {{ $t('OrgParent') }} </h5>
                            </b-col>
                        </b-row>
                        <b-row style="font-size:16px">
                            <b-col v-if="!!items.foundationdate">
                                  <i style="color:blue"  >{{ items.foundationdate }} </i>
                            </b-col>
                            <b-col class="text-center">
                                 <i style="color:blue"  >{{ items.foundationdocument }} </i>
                            </b-col>
                            <b-col class="text-right">
                                 <i style="color:blue" href="">{{ items.parentorganizationname }} </i>
                            </b-col>
                        </b-row>
                </b-col>
            </b-row>
            <hr class="mx-n3" style="background-color:#ffffff" />
            <b-row class="mb-3">
                <b-col>
                        <b-row class="mt-2">
                            <b-col>
                                <h5> {{ $t('OrgCreatedOLdDoc') }} </h5>
                            </b-col>
                            <b-col>
                                <h5 class="text-center"> {{ $t('OrgType') }} </h5>
                            </b-col>
                            <b-col>
                                <h5 class="text-right">  {{ $t('OrgGroupByPerson') }} </h5>
                            </b-col>
                        </b-row>
                        <b-row style="font-size:16px">
                            <b-col>
                                 <i style="color:blue"  >{{ items.schoollegalformname }} </i>
                            </b-col>
                            <b-col class="text-center">
                                 <i style="color:blue"  >{{ items.organizationtypename }} </i>
                            </b-col>
                            <b-col class="text-right">
                                 <i style="color:blue"  >{{ items.schoolgroupcontingentname }} </i>
                            </b-col>
                        </b-row>
                </b-col>
            </b-row>
            <hr class="mx-n3" style="background-color:#ffffff" />
             <b-row class="mb-3">
                <b-col>
                        <b-row class="mt-2">
                            <b-col>
                                <h5> {{ $t('Oblast') }} </h5>
                            </b-col>
                            <b-col>
                                <h5 class="text-center"> {{ $t('region') }} </h5>
                            </b-col>
                            <b-col>
                                <h5 class="text-center">   {{ $t('mfy') }} </h5>
                            </b-col>
                            <b-col>
                                <h5 class="text-right"> {{ $t('adress') }} </h5>
                            </b-col>
                        </b-row>
                        <b-row style="font-size:16px">
                            <b-col>
                                 <i style="color:blue"  >{{ items.OblastName }} </i>
                            </b-col>
                            <b-col class="text-center">
                                 <i style="color:blue"  >{{ items.RegionName }} </i>
                            </b-col>
                             <b-col class="text-center">
                                 <i style="color:blue"  >{{ items.mfyname }} </i>
                            </b-col>
                            <b-col class="text-right">
                                 <i style="color:blue"  >{{ items.Adress }} </i>
                            </b-col>
                        </b-row>
                </b-col>
            </b-row>
            <hr class="mx-n3" style="background-color:#ffffff" />
            <b-row class="mb-3">
                <b-col>
                        <b-row class="mt-2">
                            <b-col>
                                <h5> {{ $t('isreconstructed') }} </h5>
                            </b-col>
                            <b-col>
                                <h5 class="text-center"> {{ $t('SchoolType') }} </h5>
                            </b-col>
                            <b-col>
                                <h5 class="text-right">  {{ $t('SpecialSubject') }} </h5>
                            </b-col>
                        </b-row>
                        <b-row style="font-size:16px">
                            <b-col>
                                 <i style="color:blue"  >{{ items.isreconstructed ? $t('yes') : $t('no') }} </i>
                            </b-col>
                            <b-col class="text-center">
                                 <i style="color:blue"  >{{ items.schooltypename }} </i>
                            </b-col>
                            <b-col class="text-right" v-for="(el, key) in specsubject"
                                    :key="key">
                                  <i style="color:blue"  >{{ el.schoolsubjectname }}, </i>
                            </b-col>
                        </b-row>
                </b-col>
            </b-row>
            <hr class="mx-n3" style="background-color:#ffffff" />
             <b-row class="mb-3">
                <b-col>
                        <b-row class="mt-2">
                            <b-col>
                                <h5> {{ $t('inn') }} </h5>
                            </b-col>
                            <b-col>
                                <h5 class="text-center"> {{ $t('oked') }} </h5>
                            </b-col>
                            <b-col>
                                <h5 class="text-center">  {{ $t('ZipCode') }} </h5>
                            </b-col>
                            <b-col>
                                <h5 class="text-right"> {{ $t('MobileNumber') }} </h5>
                            </b-col>
                        </b-row>
                        <b-row style="font-size:16px">
                            <b-col>
                                 <i style="color:blue"  >{{ items.INN }} </i>
                            </b-col>
                            <b-col class="text-center">
                                 <i style="color:blue"  >{{ items.oked }} </i>
                            </b-col>
                             <b-col class="text-center">
                                 <i style="color:blue"  >{{ items.ZipCode }} </i>
                            </b-col>
                            <b-col class="text-right">
                                 <i style="color:blue"  >{{ items.ContactInfo }} </i>
                            </b-col>
                        </b-row>
                </b-col>
            </b-row>
            <hr class="mx-n3" style="background-color:#ffffff" />
            <b-row>
                <b-col>
                    <h4 class="text-center"> {{ $t('OrgName') }} </h4>
                </b-col>
            </b-row>
             <b-row class="mb-3">
                <b-col>
                        <b-row class="mt-2">
                            <b-col>
                                <h5> 02.09.2020 - 01.01.2021 </h5>
                            </b-col>
                            <b-col class="text-right">
                                 <i style="color:blue"   >{{ items.FullName }}  </i>
                            </b-col>
                            
                        </b-row>
                        <!-- <b-row >
                            <b-col>
                                <h5> 01.01.2021 </h5> 
                            </b-col>
                            <b-col class="text-right">
                                 <i style="color:blue"  > Халк таълим вазирлиги тасарруфидаги чет тилига ихтисослаштирилган умумтаълим мактаби  </i>  
                            </b-col>
                            
                        </b-row> -->
                </b-col>
            </b-row>
            <hr class="mx-n3" style="background-color:#ffffff" />
            <b-row>
                <b-col>
                    <h4 class="text-center"> {{ $t('Accounter') }} </h4>
                </b-col>
            </b-row>
             <b-row class="mb-3">
                <b-col>
                        <b-row class="mt-2">
                            <b-col>
                                <h5> 02.09.2020 - 01.01.2021 </h5>
                            </b-col>
                            <b-col class="text-right">
                                 <i style="color:blue"  >{{items.Accounter}} </i>
                            </b-col>
                            
                        </b-row>
                        <!-- <b-row style="font-size:16px">
                            <b-col>
                               <h5> 02.01.2020 - 01.02.2021 </h5>
                            </b-col>
                            <b-col class="text-right">
                                <i style="color:blue"  >Эрбутаев Шерзод Шаимович </i>
                            </b-col>
                            
                        </b-row>
                        <b-row style="font-size:16px">
                            <b-col>
                               <h5> 01.02.2021 </h5>
                            </b-col>
                            <b-col class="text-right">
                                <i style="color:blue"  >Салимов Бекмурод Сафарович </i>
                            </b-col>
                            
                        </b-row> -->
                </b-col>
            </b-row>
            <hr class="mx-n3" style="background-color:#ffffff" />
            <b-row>
                <b-col>
                    <h4 class="text-center"> {{ $t('Cashier') }} </h4>
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col>
                        <b-row class="mt-2">
                            <b-col>
                                <h5> 02.09.2020 </h5>
                            </b-col>
                            <b-col class="text-right">
                                 <i style="color:blue"  >{{items.Cashier}} </i>
                            </b-col>
                        </b-row>
                </b-col>
            </b-row>
            <hr class="mx-n3" style="background-color:#ffffff" />
            <b-row>
                <b-col>
                    <h4 class="text-center"> {{ $t('kadastr') }} </h4>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-table  :items="kadastr" hover small bordered responsive="sm" :fields="kadastrfield"></b-table>
                </b-col>
            </b-row>
        </b-container>
  </b-overlay>
</template>

<script>
export default {
    props : {
        loading : {
            type : Boolean,
            default : false
        },
        items : {
            type : Object
        },
        kadastr : {
            type : Array
        },
        specsubject:{
            type: Array
        }
    },
    data(){
        return{
            kadastrfield : [
                { key : 'cad_number',label : this.$t('cad_number'),class:"text-center" },
                { key : 'area',label  :this.$t('area'),class:"text-center" },
                { key : 'district',label : this.$t('district'),class:"text-center" },
                { key : 'region',label : this.$t('region'),class:"text-center" }
            ]
        }
    }
}
</script>

<style>

</style>