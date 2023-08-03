import ApiService from './api.service'

const SchoolGradeGroupService = {
    GetAll() {
        return ApiService.get(`/SchoolGradeGroup/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/SchoolGradeGroup/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/SchoolGradeGroup/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/SchoolGradeGroup/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/SchoolGradeGroup/Delete?id=${id}`)
    }
}
export default SchoolGradeGroupService