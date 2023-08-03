import ApiService from './api.service'

const GroupSheetService = {
    GetList(schoolYearId, higHerEduClassifierId, educationFormTypemId, educationLanguageId, genderId, Search, SortColumn, OrderType, PageNumber, PageLimit, dtmId, IsprotocolFormed, IsRetakeTheexam) {
        return ApiService.get(`/GroupSheet/GetList?schoolYearId=${schoolYearId}&higHerEduClassifierId=${higHerEduClassifierId}&educationFormTypemId=${educationFormTypemId}&educationLanguageId=${educationLanguageId}&genderId=${genderId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&dtmId=${dtmId}&IsprotocolFormed=${IsprotocolFormed}&IsRetakeTheexam=${IsRetakeTheexam}`)
    },
    Delete(id) {
        return ApiService.delete(`/GroupSheet/Delete?id=${id}`)
    },
    Print(id) {
        return ApiService.print(`/GroupSheet/Print?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/GroupSheet/Get?id=${id}`)
    },
    GetRetakethEexamAbiturients(groupSheetId) {
        return ApiService.get(`/GroupSheet/GetRetakethEexamAbiturients?groupSheetId=${groupSheetId}`)
    },
    Update(data) {
        return ApiService.post('/GroupSheet/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/GroupSheet/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/GroupSheet/CancelApproval?id=${id}`)
    },
    UpdateGroupSheetResult(data) {
        return ApiService.post('/GroupSheet/UpdateGroupSheetResult', data)
    },
    UpdateRetakethEexamGroupSheet(data) {
        return ApiService.post('/GroupSheet/UpdateRetakethEexamGroupSheet', data)
    },
    GroupSheetTable(id, groupSheetId) {
        return ApiService.get(`/GroupSheet/GroupSheetTable?id=${id}&groupSheetId=${groupSheetId}`)
    },
    GroupSheetTableForView(id) {
        return ApiService.get(`/GroupSheet/GroupSheetTableForView?id=${id}`)
    },
    FormedGroupSheet(id) {
        return ApiService.post(`/GroupSheet/FormedGroupSheet?id=${id}`)
    }
}
export default GroupSheetService