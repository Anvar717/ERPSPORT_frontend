import ApiService from './api.service'

const FormingTeamSquadService = {
    GetList(sportteamsquadtypeid, sportteamsquadlevelid, sporttypeclassifierid, genderid, Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/FormingTeamSquad/GetList?sportteamsquadtypeid=${sportteamsquadtypeid}&sportteamsquadlevelid=${sportteamsquadlevelid}&sporttypeclassifierid=${sporttypeclassifierid}&genderid=${genderid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/FormingTeamSquad/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/FormingTeamSquad/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/FormingTeamSquad/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/FormingTeamSquad/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/FormingTeamSquad/CancelApproval?id=${id}`)
    },
    GetFormingTeamSquadAthleteList(sportteamtypeid, sporttypeclassifierid, genderid, Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/FormingTeamSquad/GetFormingTeamSquadAthleteList?sportteamtypeid=${sportteamtypeid}&sporttypeclassifierid=${sporttypeclassifierid}&genderid=${genderid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    GetFormingTeamSquadAthleteInfo(personid,sporttypeclassifierid,formingteamsquadid) {
        return ApiService.get(`/FormingTeamSquad/GetFormingTeamSquadAthleteInfo?personid=${personid}&sporttypeclassifierid=${sporttypeclassifierid}&formingteamsquadid=${formingteamsquadid}`)
    },
}
export default FormingTeamSquadService