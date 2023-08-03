import ApiService from './api.service'
const DashboardService = {
    StudentsCountInSchool(isdashboard) {
        return ApiService.get(`/DashboardInSchool/StudentsCountInSchool?isdashboard=${isdashboard}`)
    },
    EmployeesCountInSchool(isdashboard) {
        return ApiService.get(`/DashboardInSchool/EmployeesCountInSchool?isdashboard=${isdashboard}`)
    },
    SchoolInfoForMNO(isdashboard, schoolyearid, schoollegalformid, organizationtypeid) {
        return ApiService.get(`/DashboardInSchool/SchoolInfoForMNO?isdashboard=${isdashboard}&schoolyearid=${schoolyearid}&schoollegalformid=${schoollegalformid}&organizationtypeid=${organizationtypeid}`)
    },
    SchoolInfoForOblast(oblastid, isdashboard, schoolyearid, schoollegalformid, organizationtypeid) {
        return ApiService.get(`/DashboardInSchool/SchoolInfoForOblast?oblastid=${oblastid}&isdashboard=${isdashboard}&schoolyearid=${schoolyearid}&schoollegalformid=${schoollegalformid}&organizationtypeid=${organizationtypeid}`)
    },
    SchoolInfoForRegion(regionid, isdashboard, schoolyearid, schoollegalformid, organizationtypeid) {
        return ApiService.get(`/DashboardInSchool/SchoolInfoForRegion?regionid=${regionid}&isdashboard=${isdashboard}&schoolyearid=${schoolyearid}&schoollegalformid=${schoollegalformid}&organizationtypeid=${organizationtypeid}`)
    },
    GetDashboardInfo(OblastId) {
        return ApiService.get(`/DashboardForSport/GetDashboardInfo?OblastId=${OblastId}`)
    },
    GetSportEventByOblast() {
        return ApiService.get(`/DashboardForSport/GetSportEventByOblast`)
    },
    DashboardSportEventInfo(OblastId, Year, SportTypeId) {
        return ApiService.get(`/DashboardForSport/DashboardSportEventInfo?OblastId=${OblastId}&Year=${Year}&SportTypeId=${SportTypeId}`)
    },
    DashboardFinanceInfo(OblastId, Year,SportEventID,SportTypeID) {
        return ApiService.get(`/DashboardForSport/DashboardFinanceInfo?OblastId=${OblastId}&Year=${Year}&SportEventID=${SportEventID}&SportTypeID=${SportTypeID}`)
    },
    DashboardBuildingInfo(OblastId, Year) {
        return ApiService.get(`/DashboardForSport/DashboardBuildingInfo?OblastId=${OblastId}&Year=${Year}`)
    },
    GetAllSportsType(sportsEventId,sportsDirectionId) {
        return ApiService.get(`/DashboardForSport/GetAllSportsType?sportsEventId=${sportsEventId}&sportsDirectionId=${sportsDirectionId}`)
    },
    GetAllSportsEvent() {
        return ApiService.get(`/DashboardForSport/GetAllSportsEvent`)
    },
    DashboardHumanResourceInfo(OblastId,Year,SportTypeId,IsAthlete,lang) {
        return ApiService.get(`/DashboardForSport/DashboardHumanResourceInfo?OblastId=${OblastId}&Year=${Year}&SportTypeId=${SportTypeId}&IsAthlete=${IsAthlete}&lang=${lang}`)
    },
    GetListOfParticipantBySportType(OblastId, Year, SportTypeID) {
        return ApiService.get(`/DashboardForSport/GetListOfParticipantBySportType?OblastId=${OblastId}&Year=${Year}&SportTypeID=${SportTypeID}`)
    },
    GetHRByOblast(Year, IsAthlete, lang) {
        return ApiService.get(`/DashboardForSport/GetHRByOblast?Year=${Year}&IsAthlete=${IsAthlete}&lang=${lang}`)
    },
    GetBuildingByOblast(Year) {
        return ApiService.get(`/DashboardForSport/GetBuildingByOblast?Year=${Year}`)
    },
    GetFinanceByOblast(Year) {
        return ApiService.get(`/DashboardForSport/GetFinanceByOblast?Year=${Year}`)
    },
    ParticipantCard(ParticipantId, Year) {
        return ApiService.get(`/DashboardForSport/ParticipantCard?ParticipantId=${ParticipantId}&Year=${Year}`)
    },
    TrainerCard(TrainerId, Year) {
        return ApiService.get(`/DashboardForSport/TrainerCard?TrainerId=${TrainerId}&Year=${Year}`)
    },
    SchoolInfoForReport(oblastid, regionid, isdashboard, schoolyearid, schoollegalformid, organizationtypeid) {
        return ApiService.get(`/DashboardInSchool/SchoolInfoForReport?oblastid=${oblastid}&regionid=${regionid}&isdashboard=${isdashboard}&schoolyearid=${schoolyearid}&schoollegalformid=${schoollegalformid}&organizationtypeid=${organizationtypeid}`)
    }

}
export default DashboardService