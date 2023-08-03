import ApiService from './api.service'

const AthletePreparingCompetService = {
    GetList(oblastId, regionId, organizationId, statusId, sporteventid, sporttypeclassifierid, sportteamtypeid,isathleteroadmapexists,genderid, Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/AthletePreparingCompet/GetList?oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&statusId=${statusId}&sporteventid=${sporteventid}&sporttypeclassifierid=${sporttypeclassifierid}&sportteamtypeid=${sportteamtypeid}&isathleteroadmapexists=${isathleteroadmapexists}&genderid=${genderid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    PrintSportsmanFullInfoAthletePreparingCompet(oblastId, regionId, organizationId, statusId, sporteventid, sporttypeclassifierid, sportteamtypeid, isathleteroadmapexists) {
        return ApiService.print(`/AthletePreparingCompet/PrintSportsmanFullInfoAthletePreparingCompet?oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&statusId=${statusId}&sporteventid=${sporteventid}&sporttypeclassifierid=${sporttypeclassifierid}&sportteamtypeid=${sportteamtypeid}&isathleteroadmapexists=${isathleteroadmapexists}`)
    },
    Delete(id) {
        return ApiService.delete(`/AthletePreparingCompet/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/AthletePreparingCompet/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/AthletePreparingCompet/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/AthletePreparingCompet/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/AthletePreparingCompet/CancelApproval?id=${id}`)
    },
}
export default AthletePreparingCompetService