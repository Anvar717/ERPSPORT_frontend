import ApiService from './api.service'

const SchoolAdmissionQuotaService = {
    GetLastSchoolAdmissionQuota(schoolyearid, educationlanguageid) {
        return ApiService.get(`/SchoolAdmissionQuota/GetLastSchoolAdmissionQuota?schoolyearid=${schoolyearid}&educationlanguageid=${educationlanguageid}`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/SchoolAdmissionQuota/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    GetSentList(Startdate, EndDate,Search, SortColumn, OrderType, PageNumber, PageLimit,statusid,showlanguage) {
        return ApiService.get(`/SchoolAdmissionQuota/GetSentList?Startdate=${Startdate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&statusid=${statusid}&showlanguage=${showlanguage}`)
    },
    Delete(id) {
        return ApiService.delete(`/SchoolAdmissionQuota/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/SchoolAdmissionQuota/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/SchoolAdmissionQuota/Update', data)
    },
    Approve(id, data) {
        return ApiService.post(`/SchoolAdmissionQuota/Approve?id=${id}`, data)
    },
    CancelApproval(id, data) {
        return ApiService.post(`/SchoolAdmissionQuota/CancelApproval?id=${id}`, data)
    },

    Send(id) {
        return ApiService.post(`/SchoolAdmissionQuota/Send?id=${id}`)
    },

    Accept(id) {
        return ApiService.post(`/SchoolAdmissionQuota/Accept?id=${id}`)
    },
    ForConsideration(id) {
        return ApiService.post(`/SchoolAdmissionQuota/ForConsideration?id=${id}`)
    },

    Reject(id, Description) {
        return ApiService.post(`/SchoolAdmissionQuota/Reject?id=${id}&Description=${Description}`)
    },
    GetDocumentStatusLog(id) {
        return ApiService.get(`/SchoolAdmissionQuota/GetDocumentStatusLog?id=${id}`)
    },
    Print(Startdate, EndDate,statusid,showlanguage) {
        return ApiService.print(`/SchoolAdmissionQuota/PrintSentList?Startdate=${Startdate}&EndDate=${EndDate}&statusid=${statusid}&showlanguage=${showlanguage}`)
    },
}
export default SchoolAdmissionQuotaService