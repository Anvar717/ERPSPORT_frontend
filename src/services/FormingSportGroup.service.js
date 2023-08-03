import ApiService from './api.service'

const FormingSportGroupService = {
    GetList(statusid,Search, SortColumn, OrderType, PageNumber, PageLimit,schoolyearid,sportgroupid,sportsmename,coachname,sporttypeclassifierid) {
        return ApiService.get(`/FormingSportGroup/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&schoolyearid=${schoolyearid}&sportgroupid=${sportgroupid}&sportsmename=${sportsmename}&coachname=${coachname}&statusid=${statusid}&sporttypeclassifierid=${sporttypeclassifierid}`)
    },
    GetAll(schoolyearid, sporttypeclassifierid,sportgroupid) {
        return ApiService.get(`/FormingSportGroup/GetAll?schoolyearid=${schoolyearid}&sporttypeclassifierid=${sporttypeclassifierid}&sportgroupid=${sportgroupid}`)
    },
    Delete(id) {
        return ApiService.delete(`/FormingSportGroup/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/FormingSportGroup/Get?id=${id}`)
    },
    GetDetail(id) {
        return ApiService.get(`/FormingSportGroup/GetDetail?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/FormingSportGroup/Update', data)
    },
    PrintFormingSportGroup(statusid,Search, SortColumn, OrderType, PageNumber, PageLimit,schoolyearid,sportgroupid,sportsmename,coachname) {
        return ApiService.print(`/FormingSportGroup/PrintFormingSportGroup?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&schoolyearid=${schoolyearid}&sportgroupid=${sportgroupid}&sportsmename=${sportsmename}&coachname=${coachname}&statusid=${statusid}`)
    },
    Approve(id) {
        return ApiService.post(`/FormingSportGroup/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/FormingSportGroup/CancelApproval?id=${id}`)
    },
}
export default FormingSportGroupService