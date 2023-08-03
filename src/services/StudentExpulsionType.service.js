import ApiService from './api.service'

const StudentExpulsionTypeService = {
    GetAll(){
        return ApiService.get(`/StudentExpulsionType/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/StudentExpulsionType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/StudentExpulsionType/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/StudentExpulsionType/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/StudentExpulsionType/Delete?id=${id}`)
    }
}
export default StudentExpulsionTypeService