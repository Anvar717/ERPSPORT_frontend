import ApiService from './api.service'

const HonoraryTitleTypeService = {
    GetAll(lang){
        return ApiService.get(`/HonoraryTitleType/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/HonoraryTitleType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/HonoraryTitleType/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/HonoraryTitleType/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/HonoraryTitleType/Delete?id=${id}`)
    }
}
export default HonoraryTitleTypeService