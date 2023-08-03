import ApiService from './api.service'

const TaxBenefitTypeService = {
    GetAll() {
        return ApiService.get(`/TaxBenefitType/GetAll`)
    },
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/TaxBenefitType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/TaxBenefitType/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/TaxBenefitType/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/TaxBenefitType/Delete?id=${id}`)
    }
}
export default TaxBenefitTypeService