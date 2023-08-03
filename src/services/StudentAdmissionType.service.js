import ApiService from './api.service'

const StudentAdmissionTypeService = {
    GetAll(lang){
        return ApiService.get(`/StudentAdmissionType/GetAll`)
    },
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/StudentAdmissionType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/StudentAdmissionType/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/StudentAdmissionType/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/StudentAdmissionType/Delete?id=${id}`)
    }
}
export default StudentAdmissionTypeService