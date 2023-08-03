import ApiService from './api.service'

const SalaryCalcService = {
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SalaryCalc/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/SalaryCalc/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/SalaryCalc/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/SalaryCalc/Delete?id=${id}`)
    },
    Approve(id,data){
        return ApiService.post(`/SalaryCalc/Approve?id=${id}`,data)
    },
    CancelApproval(id,data){
        return ApiService.post(`/SalaryCalc/CancelApproval?id=${id}`,data)
    },
    FillSalaryCalc(data) {
        return ApiService.post('/SalaryCalc/FillSalaryCalc', data)
    },
    ClearSalaryCalc(data) {
        return ApiService.post('/SalaryCalc/ClearSalaryCalc', data)
    },
    CalculateSalaryCalc(data) {
        return ApiService.post('/SalaryCalc/CalculateSalaryCalc', data)
    },
    GetSalaryCalcRows(id) {
        return ApiService.get(`/SalaryCalc/GetSalaryCalcRows?SalaryCalcEnrolmentId=${id}`)
    },
    GetSalaryCalcEnrolments(DocumentId, Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/SalaryCalc/GetSalaryCalcEnrolments?DocumentId=${DocumentId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Print(id) {
        return ApiService.print(`/SalaryCalc/Print?id=${id}`)
    }
    
}
export default SalaryCalcService