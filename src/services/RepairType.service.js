import ApiService from './api.service'

const RepairTypeService = {
    GetAll(){
        return ApiService.get(`/RepairType/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/RepairType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/RepairType/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/RepairType/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/RepairType/Delete?id=${id}`)
    }
}
export default RepairTypeService