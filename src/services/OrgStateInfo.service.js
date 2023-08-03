import ApiService from './api.service'

const OrgStateInfoService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/OrgStateInfo/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/OrgStateInfo/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/OrgStateInfo/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/OrgStateInfo/Delete?id=${id}`)
    },
    Approve(id) {
        return ApiService.post(`/OrgStateInfo/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/OrgStateInfo/CancelApproval?id=${id}`)
    }
}
export default OrgStateInfoService