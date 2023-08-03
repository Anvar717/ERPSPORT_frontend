import ApiService from './api.service'

const MassPlannedCalculationService = {
    GetList(StartDate,EndDate,Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/MassPlannedCalculation/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/MassPlannedCalculation/Delete?id=${id}`)
    },
    GetAll(personid) {
        return ApiService.get(`/MassPlannedCalculation/GetAll?personid=${personid}`)  
    },
    Get(id) {
        return ApiService.get(`/MassPlannedCalculation/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/MassPlannedCalculation/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/MassPlannedCalculation/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/MassPlannedCalculation/CancelApproval?id=${id}`)
    },
}
export default MassPlannedCalculationService