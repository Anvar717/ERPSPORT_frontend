import ApiService from './api.service'

const OrgSchoolParameterService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/OrgSchoolParameter/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    
    Get(id) {
        return ApiService.get(`/OrgSchoolParameter/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/OrgSchoolParameter/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/OrgSchoolParameter/Delete?id=${id}`)
    },
    Approve(id) {
        return ApiService.post(`/OrgSchoolParameter/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/OrgSchoolParameter/CancelApproval?id=${id}`)
    }
}
export default OrgSchoolParameterService