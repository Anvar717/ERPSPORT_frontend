import ApiService from './api.service'

const SubjectOlympiadService = {
    GetAll(lang){
        return ApiService.get(`/SubjectOlympiad/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SubjectOlympiad/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/SubjectOlympiad/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/SubjectOlympiad/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/SubjectOlympiad/Delete?id=${id}`)
    }
}
export default SubjectOlympiadService