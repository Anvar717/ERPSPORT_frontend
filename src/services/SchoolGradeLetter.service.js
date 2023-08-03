import ApiService from './api.service'

const SchoolGradeLetterService = {
    GetAll() {
        return ApiService.get(`/SchoolGradeLetter/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/SchoolGradeLetter/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/SchoolGradeLetter/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/SchoolGradeLetter/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/SchoolGradeLetter/Delete?id=${id}`)
    }
}
export default SchoolGradeLetterService