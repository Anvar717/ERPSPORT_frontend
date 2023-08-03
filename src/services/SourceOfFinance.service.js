import ApiService from './api.service'

const SourceOfFinanceService = {
    GetAll(){
        return ApiService.get(`/SourceOfFinance/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SourceOfFinance/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/SourceOfFinance/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/SourceOfFinance/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/SourceOfFinance/Delete?id=${id}`)
    }
}
export default SourceOfFinanceService