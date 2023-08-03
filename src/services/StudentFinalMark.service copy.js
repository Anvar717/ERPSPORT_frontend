import ApiService from "./api.service";

const StudentFinalMarkService = {
  /**
   * @param {string} Search 
   * @param {string} SortColumn 
   * @param {string} OrderType 
   * @param {number} PageNumber 
   * @param {number} PageLimit 
   * @param {number} schoolyearid 
   * @param {number} SchoolGradeId 
   * @param {boolean | null} hasstudentfinalmark 
   * @param {string} personname
   * @returns 
   */
  GetList(query_params) {
    return ApiService.getParam(
      `/eduprocess/StudentFinalMark/GetList`, query_params
    );
  },
  /**
   * @param {number} id 
   * @returns 
   */
  Get(id) {
    return ApiService.get(`/eduprocess/StudentFinalMark/Get?id=${id}`);
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
    return ApiService.post("/eduprocess/StudentFinalMark/Update", data);
  },
  /**
   * 
   * @param {number} id 
   * @returns 
   */
  Approve(id) {
    return ApiService.post(`/eduprocess/StudentFinalMark/Approve?id=${id}`);
  },
  /**
   * 
   * @param {number} id 
   * @returns 
   */
  CancelApproval(id) {
    return ApiService.post(`/eduprocess/StudentFinalMark/CancelApproval?id=${id}`);
  },
  /**
   * @param {number} id 
   * @returns 
   */
  Delete(id) {
    return ApiService.delete(`/eduprocess/StudentFinalMark/Delete?id=${id}`);
  },
};
export default StudentFinalMarkService;
