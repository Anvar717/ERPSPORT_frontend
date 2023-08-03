import ApiService from './api.service'

const SchoolHolidayService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/SchoolHoliday/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/SchoolHoliday/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/SchoolHoliday/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/SchoolHoliday/Update', data)
    },
    Approve(id, data) {
        return ApiService.post(`/SchoolHoliday/Approve?id=${id}`, data)
    },
    CancelApproval(id, data) {
        return ApiService.post(`/SchoolHoliday/CancelApproval?id=${id}`, data)
    },
}
export default SchoolHolidayService