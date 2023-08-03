import ApiService from './api.service'

const PayrollSheetService = {
    GetList(StartDate,EndDate,Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/PayrollSheet/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/PayrollSheet/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/PayrollSheet/Update', data)
    },
    FillPayrollSheet(data) {
        return ApiService.post('/PayrollSheet/FillPayrollSheet', data)
    },
    ClearPayrollSheetTable(data) {
        return ApiService.post('/PayrollSheet/ClearPayrollSheetTable', data)
    },
    Delete(id) {
        return ApiService.delete(`/PayrollSheet/Delete?id=${id}`)
    },
    Approve(id) {
        return ApiService.post(`/PayrollSheet/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/PayrollSheet/CancelApproval?id=${id}`)
    },
    GetPayrollSheetTables(DocumentId, Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/PayrollSheet/GetPayrollSheetTables?DocumentId=${DocumentId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    GetPayrollSheetTable(id) {
        return ApiService.get(`/PayrollSheet/GetPayrollSheetTable?id=${id}`)
    },
    UpdatePayrollSheetTable(data) {
        return ApiService.post('/PayrollSheet/UpdatePayrollSheetTable',data)
    },
    DeletePayrollSheetTable(documentId, payrollsheettableId) {
        return ApiService.delete(`/PayrollSheet/DeletePayrollSheetTable?documentId=${documentId}&payrollsheettableId=${payrollsheettableId}`)
    },
    Print(id, isplastic) {
        return ApiService.print(`/PayrollSheet/Print?id=${id}&isplastic=${isplastic}`)
    }
}
export default PayrollSheetService