import ApiService from './api.service'

const OrgSchoolGradeControlService = {
    GetList(Search, schoolyearid, oblastid, regionid, organizationid, SortColumn, OrderType, PageNumber, PageLimit) {
        if (oblastid == null || oblastid === undefined) {
            oblastid = 0;
        }
        if (regionid == null || regionid === undefined) {
            regionid = 0;
        }
        if (organizationid == null || organizationid === undefined) {
            organizationid = 0;
        }
        return ApiService.get(`/OrgSchoolGradeControl/GetList?Search=${Search}&schoolyearid=${schoolyearid}&oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/OrgSchoolGradeControl/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/OrgSchoolGradeControl/Get?id=${id}`)
    },
    GetDetail(id) {
        return ApiService.get(`/OrgSchoolGradeControl/GetDetail?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/OrgSchoolGradeControl/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/OrgSchoolGradeControl/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/OrgSchoolGradeControl/CancelApproval?id=${id}`)
    },
}
export default OrgSchoolGradeControlService