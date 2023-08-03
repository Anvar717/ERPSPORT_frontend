<template>
  <b-overlay :show="loading">
      <b-table-simple class="sp-table1" :responsive="true">
          <b-thead>
              <b-tr >
                  <b-th v-for="(field,fieldIndex) in fields" :class="field.class" :key="fieldIndex + 'field'"> {{ field.label }} </b-th>
              </b-tr>
          </b-thead>
          <b-tbody>
              <b-tr v-for="(item,itemIndex) in items" :key="itemIndex + 'item'">
                  <b-td v-for="(field,fieldIndex) in fields" :key="fieldIndex + 'field1'" :class="field.class">
                       <slot
                            :name="`header_${field.key}`"
                            :item="item"
                        />
                       <span v-if="!$scopedSlots[`header_${field.key}`]">
                           {{ item[field.key] }} 
                       </span>
                  </b-td>
              </b-tr>
          </b-tbody>
      </b-table-simple>
  </b-overlay>
</template>

<script>
export default {
    props:{
        fields : {
            type : Array,
            default : []
        },
        items : {
            type : Array,
            default : []
        }
    },
    data(){
        return{
            loading : false
        }
    }
}
</script>

<style lang="scss" scoped>
.sp-table1{
    height: 80vh;
    thead {
        tr{
            background-color: white;
            th{
                position: sticky; top: 0;
                background-color: white;
                border: 0px solid;
                &:first-child{
                    border-radius: 12px 0px 0px 12px;
                }
                &:last-child{
                    border-radius: 0px 12px 12px 0px;
                }
            }
        }
    }
    tbody{
        overflow: hidden;
        tr{
            background-color: white;
            
            td{
                border-top:10px solid #F7F9FA;
                &:first-child{
                    border-radius: 12px 0px 0px 12px;
                }
                &:last-child{
                    border-radius: 0px 12px 12px 0px;
                }
            }
        }
    }
}
</style>