import ApiService from './api.service'

const ContractorService = {
    GetAll(search){
        return ApiService.get(`/Contractor/GetAll?search=${search}`)
    },
    GetContractorAccountList(contractorid){
        return ApiService.get(`/Contractor/GetAll?contractorid=${contractorid}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/Contractor/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id,inn){
        return ApiService.get(`/Contractor/Get?id=${id}&inn=${inn}`)
    },
    GetById(id) {
        return ApiService.get(`/Contractor/Get?id=${id}`)
    },
    GetByInn(inn){
        return ApiService.get(`/Contractor/Get?inn=${inn}`)
    },
    Update(data){
        return ApiService.post('/Contractor/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/Contractor/Delete?id=${id}`)
    }
}
export default ContractorService