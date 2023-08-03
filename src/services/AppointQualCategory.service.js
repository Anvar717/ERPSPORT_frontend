import ApiService from './api.service'

const AppointQualCategoryService = {
    GetList(oblastId, regionId, organizationId, personName, documentSeries, documentNumber, schoolSubjectId, qualificationCategoryId, qualcategorytypeid, sportqualspecialtyid, sporttypeclassifierId, statusId, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/AppointQualCategory/GetList?oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&personName=${personName}&documentSeries=${documentSeries}&documentNumber=${documentNumber}&schoolSubjectId=${schoolSubjectId}&qualificationCategoryId=${qualificationCategoryId}&qualcategorytypeid=${qualcategorytypeid}&sportqualspecialtyid=${sportqualspecialtyid}&sporttypeclassifierId=${sporttypeclassifierId}&statusId=${statusId}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/AppointQualCategory/Delete?id=${id}`)
    },
    Get(id,pinfl,documentseries,documentnumber) {
        return ApiService.get(`/AppointQualCategory/Get?id=${id}&pinfl=${pinfl}&documentseries=${documentseries}&documentnumber=${documentnumber}`)
    },
    GetFromDbTs(documentseries,documentnumber, onDate , personId) {
        return ApiService.get(`/AppointQualCategory/GetFromDbTs?documentseries=${documentseries}&documentnumber=${documentnumber}&onDate=${onDate}&personId=${personId}`)
    },
    GetDocumentSeries() {
        return ApiService.get('/AppointQualCategory/GetDocumentSeries')
    },
    Update(data) {
        return ApiService.post('/AppointQualCategory/Update', data)
    },
    Approve(data) {
        return ApiService.post(`/AppointQualCategory/Approve`,data)
    },
    CancelApproval(data) {
        return ApiService.post(`/AppointQualCategory/CancelApproval`,data)
    },
    Send(id, data) {
        return ApiService.post(`/AppointQualCategory/Send?id=${id}`, data)
    },
    Import(orgid) {
        return ApiService.get(`/AppointQualCategory/Import?organizationid=${orgid}`)
    },
    AppointQualCategoryPrint(oblastId, regionId, organizationId, personName, documentSeries, documentNumber, schoolSubjectId, qualificationCategoryId, qualcategorytypeid, sportqualspecialtyid, sporttypeclassifierId, statusId, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.print(`/AppointQualCategory/AppointQualCategoryPrint?oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&personName=${personName}&documentSeries=${documentSeries}&documentNumber=${documentNumber}&schoolSubjectId=${schoolSubjectId}&qualificationCategoryId=${qualificationCategoryId}&qualcategorytypeid=${qualcategorytypeid}&sportqualspecialtyid=${sportqualspecialtyid}&sporttypeclassifierId=${sporttypeclassifierId}&statusId=${statusId}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    PrintAppointQualCategoryPdf(filetype,id,data) {
        return ApiService.print(`/AppointQualCategory/PrintAppointQualCategoryPdf?filetype=${filetype}&id=${id}`, data)
    }
}
export default AppointQualCategoryService