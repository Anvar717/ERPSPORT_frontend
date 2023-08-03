import ApiService from './api.service'
const OnlineQueueInfoService = {
    GetList(Startdate, EndDate, Search, SortColumn, OrderType, PageNumber, PageLimit,statusid,isaddquota) {
        return ApiService.get(`/OnlineQueueInfo/GetList?Startdate=${Startdate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&statusid=${statusid}&isaddquota=${isaddquota}`)
    },
    GetOnlineRatingList( Search, SortColumn, OrderType, PageNumber,PageLimit) {
        return ApiService.get(`/OnlineQueueInfo/GetOnlineRatingList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    GetOnlinequeueInfo(ondate, quotatype, oblastid, regionid) {
        return ApiService.get(`/OnlineQueueInfo/GetOnlinequeueInfo?ondate=${ondate}&quotatype=${quotatype}&oblastid=${oblastid}&regionid=${regionid}`)
    },
    Get() {
        return ApiService.get(`/OnlineQueueInfo/Get`)
    },
    GetZags(docseries,docnumber,dateofbirth) {
        return ApiService.get(`/Zags/Get?docseries=${docseries}&docnumber=${docnumber}&dateofbirth=${dateofbirth}`)
    },
    Update(id, code,isaddquota,documentseries, documentnumber,familyname,firstname,lastname,iscreatedstatus) {
        return ApiService.post(`/OnlineQueueInfo/Update?id=${id}&code=${code}&isaddquota=${isaddquota}&documentseries=${documentseries}&documentnumber=${documentnumber}&familyname=${familyname}&firstname=${firstname}&lastname=${lastname}&iscreatedstatus=${iscreatedstatus}`)
    },
    Accept(id, code) {
        return ApiService.post(`/OnlineQueueInfo/Accept?id=${id}&code=${code}`)
    },
    Waiting(id, code) {
        return ApiService.post(`/OnlineQueueInfo/Waiting?id=${id}&code=${code}`)
    },
    Reject(id, Description, code) {
        return ApiService.post(`/OnlineQueueInfo/Reject?id=${id}&Description=${Description}&code=${code}`)
    },
    ForceReject(id, Description, code) {
        return ApiService.post(`/OnlineQueueInfo/ForceReject?id=${id}&Description=${Description}&code=${code}`)
    },
    ReSendCode(id, data) {
        return ApiService.post(`/OnlineQueueInfo/ReSendCode?id=${id}`, data)
    },
    InsertForAdmin(data) {
        return ApiService.post('/OnlineQueueInfo/InsertForAdmin', data)
    },
    Print(Startdate, EndDate, Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.print(`/OnlineQueueInfo/PrintList?Startdate=${Startdate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    PrintRating(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.print(`/OnlineQueueInfo/PrintRatingList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    SendBatchSMS(ondate,message) {
        return ApiService.post(`/OnlineQueueInfo/SendBatchSMS?ondate=${ondate}&message=${message}`)
    }
}
export default OnlineQueueInfoService