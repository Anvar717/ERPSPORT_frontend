import ApiService from "./api.service"

const SportGroupService = {
    GetAll(sporttypeclassifierid, sportlevelid, schoolYearId, showOnlyFormed, greaterThenId, showOnlyHaveFreePlace,notShownGroupId,sporttitleid,forStudentMovement) {
        if (sporttypeclassifierid == null || sporttypeclassifierid === undefined) {
            sporttypeclassifierid = 0;
        }
        if (sportlevelid == null || sportlevelid === undefined) {
            sportlevelid = 0;
        }
        if (greaterThenId == null || greaterThenId === undefined) {
            greaterThenId = 0;
        }
        if (showOnlyFormed == null || showOnlyFormed === undefined) {
            showOnlyFormed = false;
        }
        if (showOnlyHaveFreePlace == null || showOnlyHaveFreePlace === undefined) {
            showOnlyHaveFreePlace = false;
        }
        if (notShownGroupId == null || notShownGroupId === undefined) {
            notShownGroupId = 0;
        }
        if (sporttitleid == null || sporttitleid === undefined) {
            sporttitleid = 0;
        }
        if (forStudentMovement == null || forStudentMovement === undefined) {
            forStudentMovement = false
        }
        return ApiService.get(`/SportGroup/GetAll?sporttypeclassifierid=${sporttypeclassifierid}&sportlevelid=${sportlevelid}&schoolYearId=${schoolYearId}&showOnlyFormed=${showOnlyFormed}&greaterThenId=${greaterThenId}&showOnlyHaveFreePlace=${showOnlyHaveFreePlace}&notShownGroupId=${notShownGroupId}&sporttitleid=${sporttitleid}&forStudentMovement=${forStudentMovement}`)
    }, 
    GetSportGroupInfo(sportGroupId, schoolYearId) {
        if (sportGroupId == null || sportGroupId === undefined) {
            sportGroupId = 0;
        }
        return ApiService.get(`/SportGroup/GetSportGroupInfo?sportGroupId=${sportGroupId}&schoolYearId=${schoolYearId}`)
    },
    GetLastSportGroupNumber(sporttypeclassifierid,sportlevelid){
        return ApiService.get(`/SportGroup/GetLastSportGroupNumber?sporttypeclassifierid=${sporttypeclassifierid}&sportlevelid=${sportlevelid}`)
    },
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SportGroup/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/SportGroup/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/SportGroup/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/SportGroup/Delete?id=${id}`)
    }
}
export default SportGroupService