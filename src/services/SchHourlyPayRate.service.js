import ApiService from './api.service'

const SchHourlyPayRateService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/SchHourlyPayRate/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.get(`/SchHourlyPayRate/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/SchHourlyPayRate/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/SchHourlyPayRate/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/SchHourlyPayRate/Accept?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/SchHourlyPayRate/CancelApproval?id=${id}`)
    },
}
export default SchHourlyPayRateService