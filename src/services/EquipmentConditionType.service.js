import ApiService from './api.service'

const EquipmentConditionTypeService = {
    GetAll(){
        return ApiService.get(`/EquipmentConditionType/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/EquipmentConditionType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/EquipmentConditionType/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/EquipmentConditionType/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/EquipmentConditionType/Delete?id=${id}`)
    }
}
export default EquipmentConditionTypeService