import ApiService from './api.service'

const PaGroupService = {
    GetAll(){
        return ApiService.get(`/PaGroup/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/PaGroup/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/PaGroup/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/PaGroup/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/PaGroup/Delete?id=${id}`)
    }
}
export default PaGroupService