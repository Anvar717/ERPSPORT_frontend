import ApiService from './api.service'

const TourniquetDeviceLogService = {
    InsertMembershipInputOutputLog(data) {
        return ApiService.post('/TourniquetDeviceLog/InsertMembershipInputOutputLog', data)
    }
}
export default TourniquetDeviceLogService