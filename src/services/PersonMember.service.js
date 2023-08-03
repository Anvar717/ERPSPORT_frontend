import ApiService from './api.service'

const PersonMemberService = {
    GetAll(){
        return ApiService.get(`/PersonMember/GetAll`)
    }, 
    GetList(identitydocumentid, genderid, Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/PersonMember/GetList?identitydocumentid=${identitydocumentid}&genderid=${genderid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    GetFromGovDataForPersonMember(
        documentSeries,
        documentNumber,
        dateOfBirth,
        identityDocumentId
      ) {
        return ApiService.get(
          `/PersonMember/GetFromGovDataForPersonMember?documentSeries=${documentSeries}&documentNumber=${documentNumber}&dateOfBirth=${dateOfBirth}&identityDocumentId=${identityDocumentId}`
        );
      },
    Get(id){
        return ApiService.get(`/PersonMember/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/PersonMember/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/PersonMember/Delete?id=${id}`)
    }
}
export default PersonMemberService