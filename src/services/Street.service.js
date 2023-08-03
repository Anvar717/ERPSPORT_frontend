import ApiService from './api.service'

const StreetService = {
    GetAll(RegionID){
        return ApiService.get(`/Street/GetAll?RegionID=${RegionID}`)
    },
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/Street/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id,externalid){
        return ApiService.get(`/Street/Get?id=${id}&externalid=${externalid}`)
    },
    Update(data){
        return ApiService.post('/Street/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/Street/Delete?id=${id}`)
    }
}
export default StreetService