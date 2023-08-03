import ApiService from './api.service'

const SportCompetitionService = {
    GetList(oblastid, regionid, organizationid, sporttypeclassifierid,sportcompetitiontypeid, competitiontypeid, sporteventtypeid, sporteventid, statusid, Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(
            `/SportCompetition/GetList?oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&sporttypeclassifierid=${sporttypeclassifierid}&sportcompetitiontypeid=${sportcompetitiontypeid}&competitiontypeid=${competitiontypeid}&sporteventtypeid=${sporteventtypeid}&sporteventid=${sporteventid}&statusid=${statusid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
        );
    },
    Delete(id) {
        return ApiService.delete(`/SportCompetition/Delete?uid=${id}`)
    },
    Get(uid, sportCompetitionTypeId) {
        let param = {}
        if (uid) {
            param.uid = uid
        }
        if (sportCompetitionTypeId) {
            param.sportCompetitionTypeId = sportCompetitionTypeId
        }
        return ApiService.getParam(`/SportCompetition/Get`, param)
    },
    Update(data) {
        return ApiService.post('/SportCompetition/Update', data)
    },
    Approve(id, data) {
        return ApiService.post(`/SportCompetition/ApproveMainPart?uid=${id}`, data)
    },
    CancelApproval(id, data) {
        return ApiService.post(`/SportCompetition/CancelApprovalMainPart?uid=${id}`, data)
    },
    GetMainPart(uid, sportCompetitionTypeId) {
        return ApiService.get(`/SportCompetition/GetMainPart?uid=${uid}&sportCompetitionTypeId=${sportCompetitionTypeId}`)
    },
    GetIndicator(id,sportCompetitionUId) {
        return ApiService.get(`/SportCompetition/GetIndicator?id=${id}&sportCompetitionUId=${sportCompetitionUId}`)
    },
    GetJuryStaffing(id,sportCompetitionUId) {
        return ApiService.get(`/SportCompetition/GetJuryStaffing?id=${id}&sportCompetitionUId=${sportCompetitionUId}`)
    },
    GetSportDisciplineList(params) {
        return ApiService.getParam(`/SportCompetition/GetSportDisciplineList`, params)
    },
    GetSportDiscipline(params) {
        return ApiService.getParam(`/SportCompetition/GetSportDiscipline`, params)
    },
    DeleteSportDiscipline(data) {
        return ApiService.delete(`/SportCompetition/DeleteSportDiscipline?id=${data.id}&sportCompetitionUId=${data.sportCompetitionUId}`)
    },
    GetParticipantRequirement(params) {
        return ApiService.getParam(`/SportCompetition/GetParticipantRequirement`, params)
    },
    UpdateMainPart(data) {
        return ApiService.post('/SportCompetition/UpdateMainPart',data)
    },
    UpdateMainPart(data) {
        return ApiService.post('/SportCompetition/UpdateMainPart',data)
    },
    ApproveMainPart(uid) {
        return ApiService.post(`/SportCompetition/ApproveMainPart?uid=${uid}`)
    },
    CancelAprovalMainPart(uid) {
        return ApiService.post(`/SportCompetition/CancelAprovalMainPart?uid=${uid}`)
    },
    UpdateIndicator(data) {
        return ApiService.post('/SportCompetition/UpdateIndicator',data)
    },
    ApproveIndicator(uid) {
        return ApiService.post(`/SportCompetition/ApproveIndicator?sportCompetitionUId=${uid}`)
    },
    DeleteIndicator(data) {
        return ApiService.delete(`/SportCompetition/DeleteIndicator?sportCompetitionUId=${data.sportCompetitionUId}&id=${data.id}`)
    },
    CancelIndicator(uid) {
        return ApiService.post(`/SportCompetition/CancelIndicator?uid=${uid}`)
    },
    UpdateSportDiscipline(data) {
        return ApiService.post('/SportCompetition/UpdateSportDiscipline',data)
    },
    ApproveSportDiscipline(data) {
        return ApiService.post(`/SportCompetition/ApproveSportDiscipline?sportCompetitionUId=${data.sportCompetitionUId}`)
    },
    CancelSportDiscipline(data) {
        return ApiService.post('/SportCompetition/CancelSportDiscipline',data)
    },
    UpdateJuryStaffing(data) {
        return ApiService.post('/SportCompetition/UpdateJuryStaffing',data)
    }, 
    ApproveJuryStaffing(uid) {
        return ApiService.post(`/SportCompetition/ApproveJuryStaffing?sportCompetitionUId=${uid}`)
    },
    CancelJuryStaffing(data) {
        return ApiService.post('/SportCompetition/CancelJuryStaffing',data)
    },
    DeleteJuryStaffing(data) {
        return ApiService.delete(`/SportCompetition/DeleteJuryStaffing?sportCompetitionUId=${data.sportCompetitionUId}&id=${data.id}`)
    },
    UpdateParticipantRequirement(data) {
        return ApiService.post('/SportCompetition/UpdateParticipantRequirement',data)
    },
    ApproveParticipantRequirement(uid) {
        return ApiService.post(`/SportCompetition/ApproveParticipantRequirement?sportCompetitionUId=${uid}`)
    },
    CancelParticipantRequirement(data) {
        return ApiService.post('/SportCompetition/CancelParticipantRequirement',data)
    },
    DeleteParticipantRequirement(data) {
        return ApiService.delete(`/SportCompetition/DeleteParticipantRequirement?sportCompetitionUId=${data.sportCompetitionUId}&id=${data.id}`)
    },
    // 
    GetEmployeeStaffing(id,sportCompetitionUId) {
        return ApiService.get(`/SportCompetition/GetEmployeeStaffing?id=${id}&sportCompetitionUId=${sportCompetitionUId}`)
    },
    GetEmployeeStaffingList(sportCompetitionUId) {
        return ApiService.get(`/SportCompetition/GetEmployeeStaffingList?sportCompetitionUId=${sportCompetitionUId}`)
    },
    UpdateEmployeeStaffing(data) {
        return ApiService.post('/SportCompetition/UpdateEmployeeStaffing',data)
    },
    ApproveEmployeeStaffing(uid) {
        return ApiService.post(`/SportCompetition/ApproveEmployeeStaffing?sportCompetitionUId=${uid}`)
    },
    CancelEmployeeStaffing(data) {
        return ApiService.post('/SportCompetition/CancelEmployeeStaffing',data)
    },
    DeleteEmployeeStaffing(data) {
        return ApiService.delete(`/SportCompetition/DeleteEmployeeStaffing?sportCompetitionUId=${data.sportCompetitionUId}&id=${data.id}`)
    },
    // 
    GetIndicatorList(sportCompetitionUId) {
        return ApiService.get(`/SportCompetition/GetIndicatorList?sportCompetitionUId=${sportCompetitionUId}`)
    },
    GetJuryStaffingList(sportCompetitionUId) {
        return ApiService.get(`/SportCompetition/GetJuryStaffingList?sportCompetitionUId=${sportCompetitionUId}`)
    },
    GetParticipantRequirementList(sportCompetitionUId) {
        return ApiService.get(`/SportCompetition/GetParticipantRequirementList?sportCompetitionUId=${sportCompetitionUId}`)
    },
    // 
    GetBudget(id,sportCompetitionUId) {
        return ApiService.get(`/SportCompetition/GetBudget?id=${id}&sportCompetitionUId=${sportCompetitionUId}`)
    },
    GetBudgetList(sportCompetitionUId) {
        return ApiService.get(`/SportCompetition/GetBudgetList?sportCompetitionUId=${sportCompetitionUId}`)
    },
    UpdateBudget(data) {
        return ApiService.post('/SportCompetition/UpdateBudget', data)
    },
    ApproveBudget(uid) {
        return ApiService.post(`/SportCompetition/ApproveBudget?sportCompetitionUId=${uid}`)
    },
    CancelBudget(data) {
        return ApiService.post('/SportCompetition/CancelBudget',data)
    },
    DeleteBudget(data) {
        return ApiService.delete(`/SportCompetition/DeleteBudget?sportCompetitionUId=${data.sportCompetitionUId}&id=${data.id}`)
    },
     // 
    GetParticipatingOrg(id,sportCompetitionUId) {
        return ApiService.get(`/SportCompetition/GetParticipatingOrg?id=${id}&sportCompetitionUId=${sportCompetitionUId}`)
    },
    GetParticipatingOrgList(sportCompetitionUId) {
        return ApiService.get(`/SportCompetition/GetParticipatingOrgList?sportCompetitionUId=${sportCompetitionUId}`)
    },
    UpdateParticipatingOrg(data) {
        return ApiService.post('/SportCompetition/UpdateParticipatingOrg', data)
    },
    ApproveParticipatingOrg(uid) {
        return ApiService.post(`/SportCompetition/ApproveParticipatingOrg?sportCompetitionUId=${uid}`)
    },
    CancelParticipatingOrg(data) {
        return ApiService.post('/SportCompetition/CancelParticipatingOrg',data)
    },
    DeleteParticipatingOrg(data) {
        return ApiService.delete(`/SportCompetition/DeleteParticipatingOrg?sportCompetitionUId=${data.sportCompetitionUId}&id=${data.id}`)
    },
    // 
    GetBudgetSource(id,sportCompetitionUId) {
        return ApiService.get(`/SportCompetition/GetBudgetSource?id=${id}&sportCompetitionUId=${sportCompetitionUId}`)
    },
    GetBudgetSourceList(sportCompetitionUId) {
        return ApiService.get(`/SportCompetition/GetBudgetSourceList?sportCompetitionUId=${sportCompetitionUId}`)
    },
    UpdateBudgetSource(data) {
        return ApiService.post('/SportCompetition/UpdateBudgetSource', data)
    },
    ApproveBudgetSource(uid) {
        return ApiService.post(`/SportCompetition/ApproveBudgetSource?sportCompetitionUId=${uid}`)
    },
    CancelBudgetSource(data) {
        return ApiService.post('/SportCompetition/CancelBudgetSource',data)
    },
    DeleteBudgetSource(data) {
        return ApiService.delete(`/SportCompetition/DeleteBudgetSource?sportCompetitionUId=${data.sportCompetitionUId}&id=${data.id}`)
    },
    // Jury
    GetJury(id,sportCompetitionUId) {
        return ApiService.get(`/SportCompetition/GetJury?id=${id}&sportCompetitionUId=${sportCompetitionUId}`)
    },
    GetJuryList(sportCompetitionUId) {
        return ApiService.get(`/SportCompetition/GetJuryList?sportCompetitionUId=${sportCompetitionUId}`)
    },
    UpdateJury(data) {
        return ApiService.post('/SportCompetition/UpdateJury', data)
    },
    ApproveJury(uid) {
        return ApiService.post(`/SportCompetition/ApproveJury?sportCompetitionUId=${uid}`)
    },
    CancelJury(data) {
        return ApiService.post('/SportCompetition/CancelJury',data)
    },
    DeleteJury(data) {
        return ApiService.delete(`/SportCompetition/DeleteJury?id=${data.id}&sportCompetitionUId=${data.sportCompetitionUId}`)
    },
    // StaffComposition
    GetStaffComposition(id,sportCompetitionUId) {
        return ApiService.get(`/SportCompetition/GetStaffComposition?id=${id}&sportCompetitionUId=${sportCompetitionUId}`)
    },
    GetStaffCompositionList(sportCompetitionUId) {
        return ApiService.get(`/SportCompetition/GetStaffCompositionList?sportCompetitionUId=${sportCompetitionUId}`)
    },
    UpdateStaffComposition(data) {
        return ApiService.post('/SportCompetition/UpdateStaffComposition', data)
    },
    ApproveStaffComposition(uid) {
        return ApiService.post(`/SportCompetition/ApproveStaffComposition?sportCompetitionUId=${uid}`)
    },
    CancelStaffComposition(data) {
        return ApiService.post('/SportCompetition/CancelStaffComposition',data)
    },
    DeleteStaffComposition(data) {
        return ApiService.delete(`/SportCompetition/DeleteStaffComposition?id=${data.id}&sportCompetitionUId=${data.sportCompetitionUId}`)
    },
    // Athlete
    GetAthlete(id,sportCompetitionUId) {
        return ApiService.get(`/SportCompetition/GetAthlete?id=${id}&sportCompetitionUId=${sportCompetitionUId}`)
    },
    GetAthleteList(sportCompetitionUId) {
        return ApiService.get(`/SportCompetition/GetAthleteList?sportCompetitionUId=${sportCompetitionUId}`)
    },
    UpdateAthlete(data) {
        return ApiService.post('/SportCompetition/UpdateAthlete', data)
    },
    ApproveAthlete(uid) {
        return ApiService.post(`/SportCompetition/ApproveAthlete?sportCompetitionUId=${uid}`)
    },
    CancelAthlete(data) {
        return ApiService.post('/SportCompetition/CancelAthlete',data)
    },
    DeleteAthlete(data) {
        return ApiService.delete(`/SportCompetition/DeleteAthlete?id=${data.id}&sportCompetitionUId=${data.sportCompetitionUId}`)
    },
    
// 
    GetEmployeeStaffingPosition(sportCompetitionUId, hasEmployeeStaffing=false) {
        return ApiService.get(`/SportCompetition/GetEmployeeStaffingPosition?sportCompetitionUId=${sportCompetitionUId}&hasEmployeeStaffing=${hasEmployeeStaffing}`)
    },
    GetJuryStaffingPosition(sportCompetitionUId, hasJuryStaffing=false) {
        return ApiService.get(`/SportCompetition/GetJuryStaffingPosition?sportCompetitionUId=${sportCompetitionUId}&hasJuryStaffing=${hasJuryStaffing}`)
    },
    FillParticipatingOrgTable(params) {
        return ApiService.getParam(`/SportCompetition/FillParticipatingOrgTable`, params)
    },
    GetJuryStaffingCategory(params) {
        return ApiService.getParam(`/SportCompetition/GetJuryStaffingCategory`, params)
    },

    //Winner - Musoboqa g'oliblari
    GetWinnerList(sportCompetitionUId) {
        return ApiService.get(`/SportCompetition/GetWinnerList?sportCompetitionUId=${sportCompetitionUId}`)
    },
    GetWinner(id,sportCompetitionUId) {
        return ApiService.get(`/SportCompetition/GetWinner?id=${id}&sportCompetitionUId=${sportCompetitionUId}`)
    },
    UpdateWinner(data) {
        return ApiService.post('/SportCompetition/UpdateWinner', data)
    },
    DeleteWinner(data) {
        return ApiService.delete(`/SportCompetition/DeleteWinner?id=${data.id}&sportCompetitionUId=${data.sportCompetitionUId}`)
    },
    ApproveWinner(uid) {
        return ApiService.post(`/SportCompetition/ApproveWinner?sportCompetitionUId=${uid}`)
    },
    CancelWinner(data) {
        return ApiService.post('/SportCompetition/CancelWinner',data)
    },

    //Result - Musoboqa natijalari
    GetResultList(sportCompetitionUId) {
        return ApiService.get(`/SportCompetition/GetResultList?sportCompetitionUId=${sportCompetitionUId}`)
    },
    GetResult(id,sportCompetitionUId) {
        return ApiService.get(`/SportCompetition/GetResult?id=${id}&sportCompetitionUId=${sportCompetitionUId}`)
    },
    UpdateResult(data) {
        return ApiService.post('/SportCompetition/UpdateResult', data)
    },
    DeleteResult(data) {
        return ApiService.delete(`/SportCompetition/DeleteResult?id=${data.id}&sportCompetitionUId=${data.sportCompetitionUId}`)
    },
    ApproveResult(uid) {
        return ApiService.post(`/SportCompetition/ApproveResult?sportCompetitionUId=${uid}`)
    },
    CancelResult(data) {
        return ApiService.post('/SportCompetition/CancelResult',data)
    },
    // 
    StepInfoUpdateFile(data) {
        return ApiService.post('/SportCompetition/StepInfoUpdateFile', data)
    },
    StepInfoDeleteFile(data) {
        return ApiService.post('/SportCompetition/StepInfoDeleteFile', data)
    },

}
export default SportCompetitionService