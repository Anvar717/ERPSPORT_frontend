import ApiService from './api.service'

const OrgIntegrationInfoService = {
    Get(id){
        return ApiService.get(`/OrgIntegrationInfo/Get?id=${id}`)
    },
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/OrgIntegrationInfo/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Update(data){
        return ApiService.post('/OrgIntegrationInfo/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/OrgIntegrationInfo/Delete?id=${id}`)
    }
}
export default OrgIntegrationInfoService