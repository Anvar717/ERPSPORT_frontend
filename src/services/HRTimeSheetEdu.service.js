import ApiService from './api.service'

const HRTimeSheetEduService = {
    GetList(StartDate,EndDate,Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/HRTimeSheetEdu/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/HRTimeSheetEdu/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/HRTimeSheetEdu/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/HRTimeSheetEdu/Delete?id=${id}`)
    },
    Approve(id) {
        return ApiService.post(`/HRTimeSheetEdu/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/HRTimeSheetEdu/CancelApproval?id=${id}`)
    },
    Send(id) {
        return ApiService.post(`/HRTimeSheetEdu/Send?id=${id}`)
    },
    Reject(id,reason) {
        return ApiService.post(`/HRTimeSheetEdu/Reject?id=${id}&reason=${reason}`)
    },
    Cancel(id) {
        return ApiService.post(`/HRTimeSheetEdu/Cancel?id=${id}`)
    },
    Accept(id) {
        return ApiService.post(`/HRTimeSheetEdu/Accept?id=${id}`)
    },
    HrTimeSheetEduFill(data) {
        return ApiService.post(`/HRTimeSheetEdu/HrTimeSheetEduFill`,data)
    },
    HRTimesheetEduTableFill(data) {
        return ApiService.post(`/HRTimeSheetEdu/HRTimesheetEduTableFill`,data)
    },
    Print(id) {
        return ApiService.print(`/HRTimeSheetEdu/Print?id=${id}`)
    },
    GetHRTimesheetEduTables(DocumentId, Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/HRTimesheetEdu/GetHRTimesheetEduTables?DocumentId=${DocumentId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    FillHrTimeSheetEdu(data) {
        return ApiService.post(`/HRTimesheetEdu/FillHrTimeSheetEdu`,data)
    },
    GetHRTimesheetEduTable(HRTimesheetEduTableId) {
        return ApiService.get(`/HRTimesheetEdu/GetHRTimesheetEduTable?HRTimesheetEduTableId=${HRTimesheetEduTableId}`)
    },
    UpdateHRTimesheetEduTable(data) {
        return ApiService.post('/HRTimesheetEdu/UpdateHRTimesheetEduTable',data)
    },
    DeleteHRTimesheetEduTable(documentId,hRTimesheetEduTableId) {
        return ApiService.delete(`/HRTimesheetEdu/DeleteHRTimesheetEduTable?documentId=${documentId}&hRTimesheetEduTableId=${hRTimesheetEduTableId}`)
    },
    CreateHRTimesheetEduTableByEnrolment(documentId,employeeenrolmentId,teacherHourId) {
        return ApiService.get(`/HRTimesheetEdu/CreateHRTimesheetEduTableByEnrolment?documentId=${documentId}&employeeenrolmentId=${employeeenrolmentId}&teacherHourId=${teacherHourId}`)
    },
    ClearHRTimesheetEduTable(data) {
        return ApiService.post('/HRTimesheetEdu/ClearHRTimesheetEduTable',data)
    },
    GetSentList(StartDate,EndDate,Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/HRTimesheetEdu/GetSentList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
}
export default HRTimeSheetEduService