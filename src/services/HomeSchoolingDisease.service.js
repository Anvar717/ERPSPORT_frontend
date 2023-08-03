import ApiService from './api.service'

const HomeSchoolingDiseaseService = {
    GetAll(lang){
        return ApiService.get(`/HomeSchoolingDisease/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/HomeSchoolingDisease/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/HomeSchoolingDisease/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/HomeSchoolingDisease/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/HomeSchoolingDisease/Delete?id=${id}`)
    }
}
export default HomeSchoolingDiseaseService