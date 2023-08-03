import ApiService from './api.service'

const DepartmentService = {
    GetAll(lang) {
        return ApiService.get(`/Department/GetAll?lang=${lang}`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/Department/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/Department/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/Department/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/Department/Delete?id=${id}`)
    }
}
export default DepartmentService