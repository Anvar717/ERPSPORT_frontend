import ApiService from './api.service'

const StreetHouseService = {
    GetSTHList(lang) {
        return ApiService.get(`/StreetHouse/GetSTHList`)
    },
    GetAll(StreetID){
        return ApiService.get(`/StreetHouse/GetAll?StreetID=${StreetID}`)
    },
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/StreetHouse/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id,externalid){
        return ApiService.get(`/StreetHouse/Get?id=${id}&externalid=${externalid}`)
    },
    Update(data){
        return ApiService.post('/StreetHouse/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/StreetHouse/Delete?id=${id}`)
    }
}
export default StreetHouseService