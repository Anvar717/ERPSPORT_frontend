import ApiService from './api.service'

const MemberShipService = {
    GetAll(){
        return ApiService.get(`/MemberShip/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit, sporttypeclassifierid, membershiptypeid, personmembername, personmembershipnumber, servicepocketid, sportgroupcategorytypeid){
        return ApiService.get(`/MemberShip/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&sporttypeclassifierid=${sporttypeclassifierid}&membershiptypeid=${membershiptypeid}&personmembername=${personmembername}&personmembershipnumber=${personmembershipnumber}&servicepocketid=${servicepocketid}&sportgroupcategorytypeid=${sportgroupcategorytypeid}`)
    },
    GetActiveMembershipList(Search,SortColumn, OrderType, PageNumber, PageLimit,personmembershipnumber,identitydocumentid,documentseries,documentnumber,servicepocketid,membershiptypeid,sportgroupcategorytypeid){
        return ApiService.get(`/MemberShip/GetActiveMembershipList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&personmembershipnumber=${personmembershipnumber}&identitydocumentid=${identitydocumentid}&documentseries=${documentseries}&documentnumber=${documentnumber}&servicepocketid=${servicepocketid}&membershiptypeid=${membershiptypeid}&sportgroupcategorytypeid=${sportgroupcategorytypeid}`)
    },
    GetMemberShipPersonMemberList(personmembershipnumber, identitydocumentid, documentseries, documentnumber, servicepocketid, membershiptypeid, circlesporttypeid, sportgroupcategorytypeid, Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/MemberShip/GetMemberShipPersonMemberList?personmembershipnumber=${personmembershipnumber}&identitydocumentid=${identitydocumentid}&documentseries=${documentseries}&documentnumber=${documentnumber}&servicepocketid=${servicepocketid}&membershiptypeid=${membershiptypeid}&circlesporttypeid=${circlesporttypeid}&sportgroupcategorytypeid=${sportgroupcategorytypeid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/MemberShip/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/MemberShip/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/MemberShip/Delete?id=${id}`)
    },
    Approve(id) {
        return ApiService.post(`/MemberShip/Approve?id=${id}`)
    },
    SendSms(documentId, documentRowId) {
        return ApiService.post(`/MemberShip/SendSms?documentId=${documentId}&documentRowId=${documentRowId}`)
    },
    GetMemberShipPersonmemberInfo(personmemberid, personmembernumber,QrCodeExtends) {
        return ApiService.get(`/MemberShip/GetMemberShipPersonmemberInfo?personmemberid=${personmemberid}&personmembernumber=${personmembernumber}&QrCodeExtends=${QrCodeExtends}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/MemberShip/CancelApproval?id=${id}`)
    },
    PrintMemberShipPdf(filetype,id,Lang) {
        return ApiService.print(`/MemberShip/PrintMemberShipPdf?filetype=${filetype}&id=${id}&Lang=${Lang}`)   
    }
}
export default MemberShipService