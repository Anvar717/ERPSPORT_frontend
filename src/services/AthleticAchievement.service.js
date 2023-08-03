import ApiService from './api.service'

const AthleticAchievementService = {
    GetList(statusId, Search, SortColumn, OrderType, PageNumber, PageLimit, organizationId, oblastId, regionId) {
        return ApiService.get(`/AthleticAchievement/GetList?statusId=${statusId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&organizationId=${organizationId}&oblastId=${oblastId}&regionId=${regionId}`)
    },
    Get(id) {
        return ApiService.get(`/AthleticAchievement/Get?id=${id}`)
    },
    Delete(id) {
        return ApiService.delete(`/AthleticAchievement/Delete?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/AthleticAchievement/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/AthleticAchievement/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/AthleticAchievement/CancelApproval?id=${id}`)
    },
    PrintAthleticAchievement(statusId, Search, SortColumn, OrderType, PageNumber, PageLimit, organizationId, oblastId, regionId) {
        return ApiService.print(`/AthleticAchievement/PrintAthleticAchievement?statusId=${statusId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&organizationId=${organizationId}&oblastId=${oblastId}&regionId=${regionId}`)
      },
}
export default AthleticAchievementService