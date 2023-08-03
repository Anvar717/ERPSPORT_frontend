import ApiService from './api.service'

const PlannedCalculationService = {
    GetList(StartDate,EndDate,Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/PlannedCalculation/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/PlannedCalculation/Delete?id=${id}`)
    },
    GetAll(personid) {
        return ApiService.get(`/PlannedCalculation/GetAll?personid=${personid}`)  
    },
    Get(id) {
        return ApiService.get(`/PlannedCalculation/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/PlannedCalculation/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/PlannedCalculation/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/PlannedCalculation/CancelApproval?id=${id}`)
    },
    PlannedCalculationFill(DocumentDate,CalculationKindID,DepartmentID, OrganizationAccountID) {
        return ApiService.post(`/PlannedCalculation/PlannedCalculationFill?DocumentDate=${DocumentDate}&CalculationKindID=${CalculationKindID}&DepartmentID=${DepartmentID}&OrganizationAccountID=${OrganizationAccountID}`)
    },
}
export default PlannedCalculationService