import ApiService from './api.service'

const SportEventCalendarService = {
  GetList(sporteventcategoryid, sporttypegroupid, sporteventtypeid, competitiontypeid, sporttypeclassifierid, sporteventid, Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/SportEventCalendar/GetList?sporteventcategoryid=${sporteventcategoryid}&sporttypegroupid=${sporttypegroupid}&sporteventtypeid=${sporteventtypeid}&competitiontypeid=${competitiontypeid}&sporttypeclassifierid=${sporttypeclassifierid}&sporteventid=${sporteventid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  GetSportEventCalendarParticipantList(sportEventCalendarId, oblastId, regionId, organizationId, organizationTypeId, schoolTypeId, Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/SportEventCalendar/GetSportEventCalendarParticipantList?sportEventCalendarId=${sportEventCalendarId}&oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&organizationTypeId=${organizationTypeId}&schoolTypeId=${schoolTypeId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Delete(id) {
    return ApiService.delete(`/SportEventCalendar/Delete?id=${id}`)
  },
  DeleteSportEventCalendarParticipantTable(id) {
    return ApiService.delete(`/SportEventCalendar/DeleteSportEventCalendarParticipantTable?id=${id}`)
  },
  Get(id) {
    return ApiService.get(`/SportEventCalendar/Get?id=${id}`)
  },
  Update(data) {
    return ApiService.post('/SportEventCalendar/Update', data)
  },
  UpdateSportEventCalendarParticipantTable(data) {
    return ApiService.post('/SportEventCalendar/UpdateSportEventCalendarParticipantTable', data)
  },
  Fill(sportEventCalendarId, organizationTypeId, schoolTypeId,  data) {
    return ApiService.post(`/SportEventCalendar/Fill?sportEventCalendarId=${sportEventCalendarId}&organizationTypeId=${organizationTypeId}&schoolTypeId=${schoolTypeId}`, data)
  },
  Approve(id, data) {
    return ApiService.post(`/SportEventCalendar/Approve?id=${id}`, data)
  },
  CancelApproval(id, data) {
    return ApiService.post(`/SportEventCalendar/CancelApproval?id=${id}`, data)
  },
}
export default SportEventCalendarService