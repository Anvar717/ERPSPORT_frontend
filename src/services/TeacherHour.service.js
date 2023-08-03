import ApiService from './api.service'

const TeacherHourService = {
    GetList(schoolyearid, personid, orgschoolgradeid, schoolsubjectid, StartDate, EndDate, Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/TeacherHour/GetList?schoolyearid=${schoolyearid}&personid=${personid}&orgschoolgradeid=${orgschoolgradeid}&schoolsubjectid=${schoolsubjectid}&StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    AttachedHours(schoolyearid, personid, orgschoolgradeid, schoolsubjectid) {
        return ApiService.get(`/TeacherHour/AttachedHours?schoolyearid=${schoolyearid}&personid=${personid}&orgschoolgradeid=${orgschoolgradeid}&schoolsubjectid=${schoolsubjectid}`)
    },
    Delete(id) {
        return ApiService.delete(`/TeacherHour/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/TeacherHour/Get?id=${id}`)
    },
    RecalcCalcKindTables(data) {
        return ApiService.post('/TeacherHour/RecalcCalcKindTables', data)
    },
    Update(data) {
        return ApiService.post('/TeacherHour/Update', data)
    },
    Approve(id, data) {
        return ApiService.post(`/TeacherHour/Approve?id=${id}`, data)
    },
    CancelApproval(id, data) {
        return ApiService.post(`/TeacherHour/CancelApproval?id=${id}`, data)
    },
    GetPersonSchoolSubject(personid,schoolyearid) {
        return ApiService.get(`/TeacherHour/GetPersonSchoolSubject?personid=${personid}&schoolyearid=${schoolyearid}`)
    },
    GetPersonSchoolSubjectGrade(personid,schoolyearid,subjectid) {
      return ApiService.get(`/TeacherHour/GetPersonSchoolSubjectGrade?personid=${personid}&schoolyearid=${schoolyearid}&subjectid=${subjectid}`)  
    },
    GetTeacherHourTableList(schoolyearid, schoolsubjectid, orgschoolgradeid, Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/TeacherHour/GetTeacherHourTableList?schoolyearid=${schoolyearid}&schoolsubjectid=${schoolsubjectid}&orgschoolgradeid=${orgschoolgradeid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    }

}
export default TeacherHourService