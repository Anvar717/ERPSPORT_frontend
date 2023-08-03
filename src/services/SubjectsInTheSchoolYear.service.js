import ApiService from "./api.service";

const SubjectsInTheSchoolYearService = {
  /**
   * @param {string} Search 
   * @param {string} SortColumn 
   * @param {string} OrderType 
   * @param {number} PageNumber 
   * @param {number} PageLimit 
   * @param {number} SchoolYearId 
   * @param {number} SchoolGradeId 
   * @returns 
   */
  GetList(query_params) {
    return ApiService.get(
      `/eduprocess/SubjectsInTheSchoolYear/GetList?Search=${query_params.Search}&SortColumn=${query_params.SortColumn}&OrderType=${query_params.OrderType}&PageNumber=${query_params.PageNumber}&PageLimit=${query_params.PageLimit}&schoolyearid=${query_params.SchoolYearId}&schoolgradeid=${query_params.SchoolGradeId}`
    );
  },
  /**
   * @param {number} id 
   * @returns 
   */
  Get(id) {
    return ApiService.get(`/eduprocess/SubjectsInTheSchoolYear/Get?id=${id}`);
  },

  /**
   * 
   * @param {
   * "id": 0,
   * "docnumber": "string",
   * "docdate": "2023-05-08T09:18:27.958Z",
   * "schoolyearid": 0,
   * "schoolyearname": "string",
   * "schoolgradeid": 0,
   * "schoolgradename": "string",
   * "fromyear": 0,
   * "toyear": 0,
   * "detailinfo": "string",
   * "statusid": 0,
   * "statusname": "string",
   * "organizationid": 0,
   * "organizationname": "string",
   * "canSave": true,
   * "canApprove": true,
   * "canCancelApproval": true,
   * "tables": [
   *  {
   *    "id": 0,
   *    "ownerid": 0,
   *    "schoolsubjectid": 0, 
   *    "schoolsubjectname": "string",
   *    "hours": 0,
   *    "status": 0
   *  }]
   * } data 
   * @returns Promise
   */
  Update(data) {
    return ApiService.post("/eduprocess/SubjectsInTheSchoolYear/Update", data);
  },
  /**
   * 
   * @param {number} id 
   * @returns 
   */
  Approve(id) {
    return ApiService.post(`/eduprocess/SubjectsInTheSchoolYear/Approve?id=${id}`);
  },
  /**
   * 
   * @param {number} id 
   * @returns 
   */
  CancelApproval(id) {
    return ApiService.post(`/eduprocess/SubjectsInTheSchoolYear/CancelApproval?id=${id}`);
  },
  /**
   * @param {number} id 
   * @returns 
   */
  Delete(id) {
    return ApiService.delete(`/eduprocess/SubjectsInTheSchoolYear/Delete?id=${id}`);
  },
};
export default SubjectsInTheSchoolYearService;
