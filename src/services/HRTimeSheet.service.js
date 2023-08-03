import ApiService from './api.service'

const HRTimeSheetService = {
    GetList(StartDate,EndDate,Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/HRTimeSheet/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/HRTimeSheet/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/HRTimeSheet/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/HRTimeSheet/Delete?id=${id}`)
    },
    Approve(id) {
        return ApiService.post(`/HRTimeSheet/Approve?id=${id}`)
    },
    Send(id) {
        return ApiService.post(`/HRTimeSheet/Send?id=${id}`)
    },
    Reject(id,reason) {
        return ApiService.post(`/HRTimeSheet/Reject?id=${id}&reason=${reason}`)
    },
    Cancel(id) {
        return ApiService.post(`/HRTimeSheet/Cancel?id=${id}`)
    },
    Accept(id) {
        return ApiService.post(`/HRTimeSheet/Accept?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/HRTimeSheet/CancelApproval?id=${id}`)
    },
    HrTimeSheetFill(data) {
        return ApiService.post(`/HrTimeSheet/HrTimeSheetFill`,data)
    },
    ClearHrTimeSheet(data) {
        return ApiService.post(`/HrTimeSheet/ClearHrTimeSheet`,data)
    },
    FillHRTimeSheetDay(data) {
        return ApiService.post(`/HrTimeSheet/FillHRTimeSheetDay`,data)
    },
    GetHRTimeSheetTables(DocumentId, Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/HRTimeSheet/GetHRTimeSheetTables?DocumentId=${DocumentId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    GetHRTimeSheetTable(id) {
        return ApiService.get(`/HRTimeSheet/GetHRTimeSheetTable?id=${id}`)
    },
    UpdateHRTimeSheetTable(data) {
        return ApiService.post('/HRTimeSheet/UpdateHRTimeSheetTable',data)
    },
    DeleteHRTimeSheetTable(id) {
        return ApiService.delete(`/HRTimeSheet/DeleteHRTimeSheetTable?id=${id}`)
    },
    GetSentList(StartDate,EndDate,Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/HRTimeSheet/GetSentList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
}
export default HRTimeSheetService