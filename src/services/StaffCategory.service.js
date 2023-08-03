import ApiService from './api.service'

const StaffCategoryService = {
    GetAll() {
        return ApiService.get(`/StaffCategory/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/StaffCategory/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/StaffCategory/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/StaffCategory/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/StaffCategory/Delete?id=${id}`)
    }
}
export default StaffCategoryService