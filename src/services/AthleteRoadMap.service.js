import ApiService from './api.service'

const AthleteRoadMapService = {
    GetList(statusId, Search, SortColumn, OrderType, PageNumber, PageLimit, organizationId, oblastId, regionId,sporttypeclassifierId) {
        return ApiService.get(`/AthleteRoadMap/GetList?statusId=${statusId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&organizationId=${organizationId}&oblastId=${oblastId}&regionId=${regionId}&sporttypeclassifierId=${sporttypeclassifierId}`)
    },
    Get(id,athletepreparingcompetid) {
        return ApiService.get(`/AthleteRoadMap/Get?id=${id}&athletepreparingcompetid=${athletepreparingcompetid}`)
    },
    Delete(id) {
        return ApiService.delete(`/AthleteRoadMap/Delete?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/AthleteRoadMap/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/AthleteRoadMap/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/AthleteRoadMap/CancelApproval?id=${id}`)
    },
}
export default AthleteRoadMapService