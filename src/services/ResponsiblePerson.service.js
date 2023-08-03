import ApiService from './api.service'

const ResponsiblePersonService = {
    GetAll(){
        return ApiService.get(`/ResponsiblePerson/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/ResponsiblePerson/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/ResponsiblePerson/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/ResponsiblePerson/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/ResponsiblePerson/Delete?id=${id}`)
    }
}
export default ResponsiblePersonService