import ApiService from './api.service'

const AthletePassportService = {
    GetList(personid, personName, Search, statusid, SortColumn, OrderType, PageNumber, PageLimit, pinfl, startDate, endDate, identityDocumentId, documentSeries, documentNumber, organizationId, oblastId, regionId, genderid, sporttypeclassifierid, isoldathletepassport) {
        
        if (isoldathletepassport == null || isoldathletepassport === undefined || isoldathletepassport === '') {
            isoldathletepassport = null;
        }
        return ApiService.get(`/AthletePassport/GetList?personid=${personid}&personName=${personName}&Search=${Search}&statusid=${statusid}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&pinfl=${pinfl}&startDate=${startDate}&endDate=${endDate}&identityDocumentId=${identityDocumentId}&documentSeries=${documentSeries}&documentNumber=${documentNumber}&organizationId=${organizationId}&oblastId=${oblastId}&regionId=${regionId}&genderid=${genderid}&sporttypeclassifierid=${sporttypeclassifierid}&isoldathletepassport=${isoldathletepassport}`)
    },
    PrintGetList(personid, personName, Search, statusid, SortColumn, OrderType, PageNumber, PageLimit, pinfl, startDate, endDate, identityDocumentId, documentSeries, documentNumber, organizationId, oblastId, regionId, genderid, sporttypeclassifierid, isoldathletepassport) {

        return ApiService.get(`/AthletePassport/PrintGetList?personid=${personid}&personName=${personName}&Search=${Search}&statusid=${statusid}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&pinfl=${pinfl}&startDate=${startDate}&endDate=${endDate}&identityDocumentId=${identityDocumentId}&documentSeries=${documentSeries}&documentNumber=${documentNumber}&organizationId=${organizationId}&oblastId=${oblastId}&regionId=${regionId}&genderid=${genderid}&sporttypeclassifierid=${sporttypeclassifierid}&isoldathletepassport=${isoldathletepassport}`)
    },
    
    GetSendList(personId, personName, statusId, Search, SortColumn, OrderType, PageNumber, PageLimit, pinfl, identityDocumentId, documentSeries, documentNumber, athletepassportseriesid, athletepassportumber, startdate, enddate, organizationId, oblastId, regionId, genderid, sporttypeclassifierid, isoldathletepassport, isprinted=false, issenttoprint=false, isreadytosend=false,) {
        if (isoldathletepassport == null || isoldathletepassport === undefined || isoldathletepassport === '') {
            isoldathletepassport = null;
        }
        return ApiService.get(`/AthletePassport/GetSendList?personId=${personId}&personName=${personName}&statusId=${statusId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&pinfl=${pinfl}&identityDocumentId=${identityDocumentId}&documentSeries=${documentSeries}&documentNumber=${documentNumber}&athletepassportseriesid=${athletepassportseriesid}&athletepassportumber=${athletepassportumber}&startdate=${startdate}&enddate=${enddate}&organizationId=${organizationId}&oblastId=${oblastId}&regionId=${regionId}&genderid=${genderid}&sporttypeclassifierid=${sporttypeclassifierid}&isoldathletepassport=${isoldathletepassport}&isprinted=${isprinted}&isreadytosend=${isreadytosend}&issenttoprint=${issenttoprint}`)
    },
    PrintSendList(personId, personName, statusId, Search, SortColumn, OrderType, PageNumber, PageLimit, pinfl, identityDocumentId, documentSeries, documentNumber, athletepassportseriesid, athletepassportumber, startdate, enddate, organizationId, oblastId, regionId, genderid, sporttypeclassifierid, isoldathletepassport, isprinted=false, issenttoprint=false) {
        return ApiService.print(`/AthletePassport/PrintSendList?personId=${personId}&personName=${personName}&statusId=${statusId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&pinfl=${pinfl}&identityDocumentId=${identityDocumentId}&documentSeries=${documentSeries}&documentNumber=${documentNumber}&athletepassportseriesid=${athletepassportseriesid}&athletepassportumber=${athletepassportumber}&startdate=${startdate}&enddate=${enddate}&organizationId=${organizationId}&oblastId=${oblastId}&regionId=${regionId}&genderid=${genderid}&sporttypeclassifierid=${sporttypeclassifierid}&isoldathletepassport=${isoldathletepassport}&isprinted=${isprinted}&issenttoprint=${issenttoprint}`)
    },
    Delete(id) {
        return ApiService.delete(`/AthletePassport/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/AthletePassport/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/AthletePassport/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/AthletePassport/Approve?id=${id}`)
    },
    Send(id) {
        return ApiService.post(`/AthletePassport/Send?id=${id}`)
    },
    Accept(AthletePassportId, AthletepassportSeriesId, DocDate, Docnumber, isoldathletepassport, oldathletepassportserial, oldathletepassportnumber) {
        if (isoldathletepassport == null || isoldathletepassport === undefined) {
            isoldathletepassport = 0;
        }
        return ApiService.post(`/AthletePassport/Accept?AthletePassportId=${AthletePassportId}&AthletepassportSeriesId=${AthletepassportSeriesId}&DocDate=${DocDate}&Docnumber=${Docnumber}&isoldathletepassport=${isoldathletepassport}&oldathletepassportserial=${oldathletepassportserial}&oldathletepassportnumber=${oldathletepassportnumber}`)
    },
    Reject(AthletePassportId, ReasonId, Reason) {
        return ApiService.post(`/AthletePassport/Reject?AthletePassportId=${AthletePassportId}&ReasonId=${ReasonId}&Reason=${Reason}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/AthletePassport/CancelApproval?id=${id}`)
    },
    GetAthletePassportTableInfo(personId) {
        return ApiService.get(`/AthletePassport/GetAthletePassportTableInfo?personId=${personId}`)
    },
    PrintAthletePassportSendList(statusId, athletepassportseriesid, organizationId, oblastId, regionId, genderid, sporttypeclassifierid) {
        return ApiService.print(`/AthletePassport/PrintAthletePassportSendList?
		statusId=${statusId}&
		athletepassportseriesid=${athletepassportseriesid}&
		organizationId=${organizationId}&oblastId=${oblastId}&regionId=${regionId}&genderid=${genderid}&sporttypeclassifierid=${sporttypeclassifierid}`)
    },
    PrintAthletePassport(personid, personName, Search, statusid, SortColumn, OrderType, PageNumber, PageLimit, pinfl, startDate, endDate, identityDocumentId, documentSeries, documentNumber, organizationId, oblastId, regionId, genderid, sporttypeclassifierid, isoldathletepassport) {
        
        if (isoldathletepassport == null || isoldathletepassport === undefined || isoldathletepassport === '') {
            isoldathletepassport = null;
        }
        return ApiService.print(`/AthletePassport/PrintAthletePassport?personid=${personid}&personName=${personName}&Search=${Search}&statusid=${statusid}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&pinfl=${pinfl}&startDate=${startDate}&endDate=${endDate}&identityDocumentId=${identityDocumentId}&documentSeries=${documentSeries}&documentNumber=${documentNumber}&organizationId=${organizationId}&oblastId=${oblastId}&regionId=${regionId}&genderid=${genderid}&sporttypeclassifierid=${sporttypeclassifierid}&isoldathletepassport=${isoldathletepassport}`)
    },
    GetAthletePassportNextDocNumber() {
        return ApiService.get(`/AthletePassport/GetAthletePassportNextDocNumber`)
    },
    CancelAccept(id) {
        return ApiService.post(`/AthletePassport/CancelAccept?id=${id}`)
    },
    GetUserListCanAccept() {
        return ApiService.get(`AthletePassport/GetUserListCanAccept`)
    },
    PrintAthletePassportPdf(filetype,id) {
        return ApiService.print(`/AthletePassport/PrintAthletePassportPdf?filetype=${filetype}&id=${id}`)
    },
    PrintAthletePassportGenerator(statusId,athletepassportseriesid,organizationId,oblastId,regionId,genderid,sporttypeclassifierid) {
        return ApiService.print(`/AthletePassport/PrintAthletePassportGenerator?statusId=${statusId}&athletepassportseriesid=${athletepassportseriesid}&organizationId=${organizationId}&oblastId=${oblastId}&regionId=${regionId}&genderid=${genderid}&sporttypeclassifierid=${sporttypeclassifierid}`)
    },
    SendToPrint(id, issenttoprint) {
        return ApiService.post(`/AthletePassport/SendToPrint?id=${id}&issenttoprint=${issenttoprint}`)
    },
    PrepareToSend(id, isreadytosend) {
        return ApiService.post(`/AthletePassport/PrepareToSend?id=${id}&isreadytosend=${isreadytosend}`)
    },
    CancelPrint(id) {
        return ApiService.post(`/AthletePassport/CancelPrint?id=${id}`)
    },
    Print(id) {
        return ApiService.post(`/AthletePassport/Print?id=${id}`)
    },
    PrintAthletePassportSendList(statusId,athletepassportseriesid,organizationId,oblastId,regionId,genderid,sporttypeclassifierid) {
        return ApiService.print(`/AthletePassport/PrintAthletePassportSendList?statusId=${statusId}&athletepassportseriesid=${athletepassportseriesid}&organizationId=${organizationId}&oblastId=${oblastId}&regionId=${regionId}&genderid=${genderid}&sporttypeclassifierid=${sporttypeclassifierid}`)
    },
    PrintAthleteListForPrintPassport(personId, personName, statusId, Search, SortColumn, OrderType, PageNumber, PageLimit, pinfl, identityDocumentId, documentSeries, documentNumber, athletepassportseriesid, athletepassportumber, startdate, enddate, organizationId, oblastId, regionId, genderid, sporttypeclassifierid, isoldathletepassport, isprinted=false, issenttoprint=false) {
        return ApiService.print(`/AthletePassport/PrintAthleteListForPrintPassport?personId=${personId}&personName=${personName}&statusId=${statusId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&pinfl=${pinfl}&identityDocumentId=${identityDocumentId}&documentSeries=${documentSeries}&documentNumber=${documentNumber}&athletepassportseriesid=${athletepassportseriesid}&athletepassportumber=${athletepassportumber}&startdate=${startdate}&enddate=${enddate}&organizationId=${organizationId}&oblastId=${oblastId}&regionId=${regionId}&genderid=${genderid}&sporttypeclassifierid=${sporttypeclassifierid}&isoldathletepassport=${isoldathletepassport}&isprinted=${isprinted}&issenttoprint=${issenttoprint}`)
    },
    DownloadPhotosAsZip(statusId,athletepassportseriesid,organizationId,oblastId,regionId,genderid,sporttypeclassifierid) {
        return ApiService.print(`/AthletePassport/DownloadPhotosAsZip?statusId=${statusId}&athletepassportseriesid=${athletepassportseriesid}&organizationId=${organizationId}&oblastId=${oblastId}&regionId=${regionId}&genderid=${genderid}&sporttypeclassifierid=${sporttypeclassifierid}`)
    },
}
export default AthletePassportService