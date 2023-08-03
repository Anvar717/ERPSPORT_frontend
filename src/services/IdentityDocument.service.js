import ApiService from './api.service'

const IdentityDocumentService = {
    GetAllIdentityDocSeries(IdentityDocumentID){
        return ApiService.get(`/IdentityDocument/GetAllIdentityDocSeries?IdentityDocumentID=${IdentityDocumentID}`)
    },
    GetAll(lang) {
        return ApiService.get(`/IdentityDocument/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/IdentityDocument/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/IdentityDocument/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/IdentityDocument/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/IdentityDocument/Delete?id=${id}`)
    }
}
export default IdentityDocumentService