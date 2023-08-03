import ApiService from './api.service'

const QualificationCategoryService = {
    GetAll(lang, isAllCategory, sportqualspecialtyid) {
        if (lang === 0 || lang == null || lang === undefined) {
            lang = "ru";
        }
        if (isAllCategory === 0 || isAllCategory == null || isAllCategory === undefined) {
            isAllCategory = true;
        }
        if (sportqualspecialtyid === "" || sportqualspecialtyid == null || sportqualspecialtyid === undefined) {
            sportqualspecialtyid = 0;
        }
        return ApiService.get(`/QualificationCategory/GetAll?lang=${lang}&isAllCategory=${isAllCategory}&sportqualspecialtyid=${sportqualspecialtyid}`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/QualificationCategory/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/QualificationCategory/Get?id=${id}`)
    },
    GetPersonQualificationCategory(personid,schoolsubjectid,ondate) {
        return ApiService.get(`/QualificationCategory/GetPersonQualificationCategory?personid=${personid}&schoolsubjectid=${schoolsubjectid}&ondate=${ondate}`)
    },
    Update(data) {
        return ApiService.post('/QualificationCategory/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/QualificationCategory/Delete?id=${id}`)
    }
}
export default QualificationCategoryService