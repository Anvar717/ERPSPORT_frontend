import ApiService from './api.service'

const EducationLanguageService = {
    GetAll(lang) {
        return ApiService.get(`/EducationLanguage/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/EducationLanguage/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/EducationLanguage/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/EducationLanguage/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/EducationLanguage/Delete?id=${id}`)
    }
}
export default EducationLanguageService