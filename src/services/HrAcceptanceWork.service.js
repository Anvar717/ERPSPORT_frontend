import ApiService from './api.service'

const HrAcceptanceWorkService = {
    GetList(StartDate,EndDate,Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/HrAcceptanceWork/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    GetAll(lang) {
        return ApiService.get(`/HrAcceptanceWork/GetAll`)
    },
    Delete(id) {
        return ApiService.delete(`/HrAcceptanceWork/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/HrAcceptanceWork/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/HrAcceptanceWork/Update', data)
    },
    UpdateHrAcceptanceWorkSchoolSubject(data) {
        return ApiService.post('/HrAcceptanceWork/UpdateHrAcceptanceWorkSchoolSubject', data)
    },
    Approve(id) {
        return ApiService.post(`/HrAcceptanceWork/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/HrAcceptanceWork/CancelApproval?id=${id}`)
    },
    GetUnpaidHrAcceptanceWorkList(Search, SortColumn, OrderType, PageNumber, PageLimit, StartDate, EndDate) {
        return ApiService.get(`/HrAcceptanceWork/GetUnpaidHrAcceptanceWorkList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    }
}
export default HrAcceptanceWorkService