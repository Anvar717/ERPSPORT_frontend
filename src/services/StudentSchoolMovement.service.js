import ApiService from './api.service'

const StudentSchoolMovementService = {
    GetAll(schoolyearid) {
        return ApiService.get(`/StudentSchoolMovement/GetAll?schoolyearid=${schoolyearid}`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit, DocumentType, startDate, endDate, schoolYearID, organizationName, personName, oblastid, regionid, organizationid, statusid) {
        return ApiService.get(`/StudentSchoolMovement/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&DocumentType=${DocumentType}&startDate=${startDate}&endDate=${endDate}&schoolYearID=${schoolYearID}&organizationName=${organizationName}&personName=${personName}&oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&statusid=${statusid}`)
    },
    Delete(id) {
        return ApiService.delete(`/StudentSchoolMovement/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/StudentSchoolMovement/Get?id=${id}`)
    },
    GetDetail(id) {
        return ApiService.get(`/StudentSchoolMovement/GetDetail?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/StudentSchoolMovement/Update', data)
    },
    Approve(id, data) {
        return ApiService.post(`/StudentSchoolMovement/Approve?id=${id}`, data)
    },
    CancelApproval(id, data) {
        return ApiService.post(`/StudentSchoolMovement/CancelApproval?id=${id}`, data)
    },
    Sent(id, data) {
        return ApiService.post(`/StudentSchoolMovement/Sent?id=${id}`, data)
    },
    Accept(id, data) {
        return ApiService.post(`/StudentSchoolMovement/Accept?id=${id}`, data)
    },
    Reject(id, data) {
        return ApiService.post(`/StudentSchoolMovement/Reject?id=${id}`, data)
    },
    Cancel(id) {
        return ApiService.post(`/StudentSchoolMovement/Cancel?id=${id}`)
    }
}
export default StudentSchoolMovementService