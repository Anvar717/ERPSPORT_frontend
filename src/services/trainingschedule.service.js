import ApiService from "./api.service"

const TrainingScheduleService = {
    GetList(schoolyearid, organizationid, Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/eduprocess/TrainingSchedule/GetList?schoolyearid=${schoolyearid}&organizationid=${organizationid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id,isClone) {
        return ApiService.get(`/eduprocess/TrainingSchedule/Get?id=${id}&isClone=${isClone}`)
    },
    Fill(data) {
        return ApiService.post(`/eduprocess/TrainingSchedule/Fill`, data)
    },
    Update(data) {
        return ApiService.post(`/eduprocess/TrainingSchedule/Update`, data)
    },
    Delete(id) {
        return ApiService.delete(`/eduprocess/TrainingSchedule/Delete?id=${id}`)
    },
    UpdateSportGroupWeekDay(data) {
        return ApiService.post(`/eduprocess/TrainingSchedule/UpdateSportGroupWeekDay`, data)
    },
    DeleteSportGroupWeekDay(id) {
        return ApiService.delete(`/eduprocess/TrainingSchedule/DeleteSportGroupWeekDay?id=${id}`)
    },
    Approve(id) {
        return ApiService.post(`/eduprocess/TrainingSchedule/Approve?id=${id}`);
    },
    CancelApproval(id) {
        return ApiService.post(`/eduprocess/TrainingSchedule/CancelApproval?id=${id}`);
    },
    GetEndTime(startTime, academicHoursCount) {
        return ApiService.get(`/eduprocess/TrainingSchedule/GetEndTime?startTime=${startTime}&academicHoursCount=${academicHoursCount}`)
    },
    GetTrainingScheduleSportGroupList(trainingScheduleid, sporttypeclassifierid, sportgroupid,sportlevelid, Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/eduprocess/TrainingSchedule/GetTrainingScheduleSportGroupList?trainingScheduleid=${trainingScheduleid}&sporttypeclassifierid=${sporttypeclassifierid}&sportgroupid=${sportgroupid}&sportlevelid=${sportlevelid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    GetTrainingScheduleSportGroup(id) {
        return ApiService.get(`/eduprocess/TrainingSchedule/GetTrainingScheduleSportGroup?id=${id}`)
    },
    UpdateTrainingScheduleSportGroup(data) {
        return ApiService.post(`/eduprocess/TrainingSchedule/UpdateTrainingScheduleSportGroup`,data)
    },
    Clear(id) {
        return ApiService.post(`/eduprocess/TrainingSchedule/Clear?id=${id}`,{})
    }
}
export default TrainingScheduleService