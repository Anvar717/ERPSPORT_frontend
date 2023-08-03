import ApiService from './api.service'

const ReportIHService = {
    GetIHRest(OnDate, departmentid, responsiblepersonid, ihname) {
        return ApiService.get(`/ReportIH/GetIHRest?OnDate=${OnDate}&departmentid=${departmentid}&responsiblepersonid=${responsiblepersonid}&ihname=${ihname}`)
    },
    GetIHRestForIHMovement(OnDate, fromdepartment, fromresponsibleperson, ihname, Isbydocument, excludedocumentid, excludetableid) {
        return ApiService.get(`/ReportIH/GetIHRest?OnDate=${OnDate}&departmentid=${fromdepartment}&responsiblepersonid=${fromresponsibleperson}&ihname=${ihname}&bydocument=${Isbydocument}&excludedocumentid=${excludedocumentid}&excludetableid=${excludetableid}`)
    },
    GetIHForDocument(OnDate, department, responsibleperson, ihname, Isbydocument, excludedocumentid, excludetableid) {
        return ApiService.get(`/ReportIH/GetIHRest?OnDate=${OnDate}&departmentid=${department}&responsiblepersonid=${responsibleperson}&ihname=${ihname}&bydocument=${Isbydocument}&excludedocumentid=${excludedocumentid}&excludetableid=${excludetableid}`)
    },
    GetIHTurnover(startdate, enddate, departmentid, responsiblepersonid, ihname, bydocument) {
        return ApiService.get(`/ReportIH/GetIHTurnover?startdate=${startdate}&enddate=${enddate}&departmentid=${departmentid}&responsiblepersonid=${responsiblepersonid}&ihname=${ihname}&bydocument=${bydocument}`)
    },

}
export default ReportIHService