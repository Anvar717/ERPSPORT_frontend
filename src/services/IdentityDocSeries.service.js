import ApiService from './api.service'

const IdentityDocSeriesService = {
    GetAll(lang) {
        return ApiService.get(`/IdentityDocSeries/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/IdentityDocSeries/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/IdentityDocSeries/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/IdentityDocSeries/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/IdentityDocSeries/Delete?id=${id}`)
    }
}
export default IdentityDocSeriesService