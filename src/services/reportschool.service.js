import ApiService from "./api.service";
const ReportSchoolService = {
    GetSchoolCountBySchoolYearReady(oblastId,regionId,schoolTypeId,schoolLegalFormId,schoolyearid,schoolmanagementformid) {
        return ApiService.get(`/ReportSchool/GetSchoolCountBySchoolYearReady?oblastId=${oblastId}&regionId=${regionId}&schoolTypeId=${schoolTypeId}&schoolLegalFormId=${schoolLegalFormId}&schoolyearid=${schoolyearid}&schoolmanagementformid=${schoolmanagementformid}`)
    },
    PrintGetSchoolCountBySchoolYearReady(oblastId,regionId,schoolTypeId,schoolLegalFormId,schoolyearid,schoolmanagementformid) {
        return ApiService.print(`/ReportSchool/PrintGetSchoolCountBySchoolYearReady?oblastId=${oblastId}&regionId=${regionId}&schoolTypeId=${schoolTypeId}&schoolLegalFormId=${schoolLegalFormId}&schoolyearid=${schoolyearid}&schoolmanagementformid=${schoolmanagementformid}`)
    }
}

export default ReportSchoolService