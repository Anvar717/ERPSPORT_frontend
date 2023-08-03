import ApiService from './api.service'

const ProductClassificationService = {
    GetAll(){
        return ApiService.get(`/ProductClassification/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/ProductClassification/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/ProductClassification/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/ProductClassification/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/ProductClassification/Delete?id=${id}`)
    }
}
export default ProductClassificationService