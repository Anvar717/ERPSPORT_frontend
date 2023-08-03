import ApiService from './api.service'

const AppointEmpSalaryService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/AppointEmpSalary/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/AppointEmpSalary/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/AppointEmpSalary/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/AppointEmpSalary/Update', data)
    },
    RecalcAppointEmpSalaryTable(data) {
        return ApiService.post('/AppointEmpSalary/RecalcAppointEmpSalaryTable', data)
    },
    Approve(id, data) {
        return ApiService.post(`/AppointEmpSalary/Approve?id=${id}`, data)
    },
    CancelApproval(id, data) {
        return ApiService.post(`/AppointEmpSalary/CancelApproval?id=${id}`, data)
    },
}
export default AppointEmpSalaryService