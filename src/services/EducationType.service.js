import ApiService from './api.service'

const EducationTypeService = {
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/EducationType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/EducationType/Get?id=${id}`)
    },
    GetAll() {
        return ApiService.get('/EducationType/GetAll')
    },
    Update(data) {
        return ApiService.post('/EducationType/Update',data)
    },
    Delete(id) {
        return ApiService.delete(`/EducationType/Delete?id=${id}`)
    }
}
export default EducationTypeService