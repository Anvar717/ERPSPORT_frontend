import ApiService from './api.service'

const SchoolAdmissionService = {
    GetList(StartDate,EndDate,SchoolYearID,OrgSchoolGradeID,PersonName, SortColumn, OrderType, PageNumber, PageLimit,statusId) {
        return ApiService.get(`/SchoolAdmission/GetList?StartDate=${StartDate}&EndDate=${EndDate}&SchoolYearID=${SchoolYearID}&OrgSchoolGradeID=${OrgSchoolGradeID}&PersonName=${PersonName}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&statusId=${statusId}`)
    },
    /*   GetImportDocumentList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
          return ApiService.get(`/SchoolAdmission/GetImportDocumentList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
      }, */
    Delete(id) {
        return ApiService.delete(`/SchoolAdmission/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/SchoolAdmission/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/SchoolAdmission/Update', data)
    },
    Insert(data) {
        return ApiService.post('/SchoolAdmission/Insert', data)
    },
    Approve(id) {
        return ApiService.post(`/SchoolAdmission/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/SchoolAdmission/CancelApproval?id=${id}`)
    },
    ImportFromExcel(data) {
        return ApiService.formData('/SchoolAdmission/ImportFromExcel', data)
    },
    PrintSchoolAdmissionTemplate(type) {
        return ApiService.print(`/SchoolAdmission/PrintSchoolAdmissionTemplate?type=${type}`)
    },
    DeleteStudentInApprovedDocument(documentId, rowid) {
        return ApiService.delete(`/SchoolAdmission/DeleteStudentInApprovedDocument?documentId=${documentId}&rowid=${rowid}`)
    },
    AddStudentToApprovedDocument(data) {
        return ApiService.post(`/SchoolAdmission/AddStudentToApprovedDocument`,data)
    }
    
    
}
export default SchoolAdmissionService