import ApiService from './api.service'

const PaSubGroupService = {
    GetAll(){
        return ApiService.get(`/PaSubGroup/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/PaSubGroup/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/PaSubGroup/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/PaSubGroup/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/PaSubGroup/Delete?id=${id}`)
    }
}
export default PaSubGroupService