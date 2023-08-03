import ApiService from './api.service'

const SchoolAdmEStatementService = {
    SchoolAdmEStatementsStatus(schoolyearid, educationlanguageid, ismainquota) {
        return ApiService.get(`/SchoolAdmEStatement/SchoolAdmEStatementsStatus?schoolyearid=${schoolyearid}&educationlanguageid=${educationlanguageid}&ismainquota=${ismainquota}`)
    },
    GetList(StartDate,EndDate,Search, SortColumn, OrderType, PageNumber, PageLimit,schoolYearId,personName,oblastId,regionId,organizationId) {
        return ApiService.get(`/SchoolAdmEStatement/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&schoolYearId=${schoolYearId}&personName=${personName}&oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}`)
    },
    GetSentList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/SchoolAdmEStatement/GetSentList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    
    Delete(id) {
        return ApiService.delete(`/SchoolAdmEStatement/Delete?id=${id}`)
    },
    Get(id,onlinequeueinfocode) {
        return ApiService.get(`/SchoolAdmEStatement/Get?id=${id}&onlinequeueinfocode=${onlinequeueinfocode}`)
    },
    Update(data) {
        return ApiService.post('/SchoolAdmEStatement/Update', data)
    },
    Accept(data) {
        return ApiService.post(`/SchoolAdmEStatement/Accept`,data)
    },
    Cancel(id,Description) {
        return ApiService.post(`/SchoolAdmEStatement/Cancel?id=${id}&Description=${Description}`)
    },
    GetDetail(id) {
        return ApiService.get(`/SchoolAdmEStatement/GetDetail?id=${id}`)
    },
    AttachFile(data) {
        return ApiService.formData(`/SchoolAdmEStatement/AttachFile`,data)
    },
    DeleteFile(id, fileid) {
        return ApiService.delete(`/SchoolAdmEStatement/DeleteFile?id=${id}&fileid=${fileid}`)
    },
    GetAttachedFile(id,fileid){
        return ApiService.print(`/SchoolAdmEStatement/GetAttachedFile?id=${id}&fileid=${fileid}`)
    },
    GetDocumentListForAction(data){
        return ApiService.post('/SchoolAdmEStatement/GetDocumentListForAction', data)
    },
    Send(data) {
        return ApiService.post('/SchoolAdmEStatement/Send', data)
    }
    ,
    GetDocumentStatusLog(id) {
        return ApiService.get(`/SchoolAdmEStatement/GetDocumentStatusLog?id=${id}`)
    },
    // Print(StartDate,EndDate) {
    //     return ApiService.print(`/SchoolAdmEStatement/PrintList?StartDate=${StartDate}&EndDate=${EndDate}`)
    // },
    Print(StartDate,EndDate,Search, SortColumn, OrderType, PageNumber, PageLimit,schoolYearId,personName,oblastId,regionId,organizationId) {
        return ApiService.print(`/SchoolAdmEStatement/PrintList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&schoolYearId=${schoolYearId}&personName=${personName}&oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}`)
    },
}
export default SchoolAdmEStatementService