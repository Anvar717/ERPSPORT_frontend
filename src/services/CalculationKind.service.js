import ApiService from './api.service'

const CalculationKindService = {
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/CalculationKind/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/CalculationKind/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/CalculationKind/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/CalculationKind/Delete?id=${id}`)
    },
    GetAll(lang){
        return ApiService.get(`/CalculationKind/GetAll`)
    }
}
export default CalculationKindService