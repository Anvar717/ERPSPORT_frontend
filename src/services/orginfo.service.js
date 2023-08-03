import ApiService from './api.service'

const OrgInfoService = {
    Get(id){
        return ApiService.get(`/OrgInfo/Get?id=${id}`)
    },
    GetByUser(){
        return ApiService.get(`/OrgInfo/GetByUser`)
    },
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/OrgInfo/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Update(data){
        return ApiService.post('/OrgInfo/Update',data)
    },
    UpdateByUser(data){
        return ApiService.post('/OrgInfo/UpdateByUser',data)
    },
    Delete(id){
        return ApiService.delete(`/OrgInfo/Delete?id=${id}`)
    }
}
export default OrgInfoService