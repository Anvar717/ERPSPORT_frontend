import ApiService from './api.service'

const SportGroupCategoryTypeService = {
    GetAll(){
        return ApiService.get(`/SportGroupCategoryType/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SportGroupCategoryType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/SportGroupCategoryType/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/SportGroupCategoryType/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/SportGroupCategoryType/Delete?id=${id}`)
    }
}
export default SportGroupCategoryTypeService