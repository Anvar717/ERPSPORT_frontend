import ApiService from './api.service'

const RegionStateService = {
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit,oblastid){
        return ApiService.get(`/RegionState/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&oblastid=${oblastid}`)
    },
    Get(id){
        return ApiService.get(`/RegionState/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/RegionState/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/RegionState/Delete?id=${id}`)
    }
}
export default RegionStateService