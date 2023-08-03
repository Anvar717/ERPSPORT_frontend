import ApiService from './api.service'

const OrganizationBuildingInfoService = {
    GetList(oblastid, regionid,organizationid, circlesporttypeid, Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/OrganizationBuildingInfo/GetList?oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&circlesporttypeid=${circlesporttypeid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/OrganizationBuildingInfo/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/OrganizationBuildingInfo/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/OrganizationBuildingInfo/Delete?id=${id}`)
    },
    GetAll(organizationid) {
        return ApiService.get(`/OrganizationBuildingInfo/GetAll?organizationid=${organizationid}`)
    },
}
export default OrganizationBuildingInfoService