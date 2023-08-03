import ApiService from './api.service'

const HROrgStructureService = {
    GetAll(DepartmentID, OneDate) {
        return ApiService.get(`/HROrgStructure/GetAll?DepartmentID=${DepartmentID}&OneDate=${OneDate}`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/HROrgStructure/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/HROrgStructure/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/HROrgStructure/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/HROrgStructure/Update', data)
    },
    Approve(id, data) {
        return ApiService.post(`/HROrgStructure/Approve?id=${id}`, data)
    },
    CancelApproval(id, data) {
        return ApiService.post(`/HROrgStructure/CancelApproval?id=${id}`, data)
    },
}
export default HROrgStructureService