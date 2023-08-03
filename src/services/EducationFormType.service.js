import ApiService from './api.service'

const EducationFormTypeService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/EducationFormType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/EducationFormType/Get?id=${id}`)
    },
    GetAll() {
        return ApiService.get('/EducationFormType/GetAll')
    },
    Update(data) {
        return ApiService.post('/EducationFormType/Update',data)
    },
    Delete(id) {
        return ApiService.delete(`/EducationFormType/Delete?id=${id}`)
    }
}
export default EducationFormTypeService