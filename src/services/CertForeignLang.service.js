import ApiService from './api.service'

const CertForeignLangService = {
    GetList(oblastId, regionId, organizationId, personName, certForeignLangTypeId, documentSeries, documentNumber, statusId, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/CertForeignLang/GetList?oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&personName=${personName}&certForeignLangTypeId=${certForeignLangTypeId}&documentSeries=${documentSeries}&documentNumber=${documentNumber}&statusId=${statusId}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/CertForeignLang/Delete?id=${id}`)
    },
    Send(id) {
        return ApiService.post(`/CertForeignLang/Send?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/CertForeignLang/Get?id=${id}`)
    },
    GetDTMInfo(personid) {
        return ApiService.get(`/CertForeignLang/GetDTMInfo?personid=${personid}`)
    },
    Update(data) {
        return ApiService.post('/CertForeignLang/Update', data)
    },
    Approve(data) {
        return ApiService.post('/CertForeignLang/Approve', data)
    },
    CancelApproval(data) {
        return ApiService.post('/CertForeignLang/CancelApproval', data)
    },
    CertForeignLangPrint(oblastId, regionId, organizationId, personName, documentSeries, documentNumber, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.print(`/CertForeignLang/CertForeignLangPrint?oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&personName=${personName}&documentSeries=${documentSeries}&documentNumber=${documentNumber}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    }
}
export default CertForeignLangService