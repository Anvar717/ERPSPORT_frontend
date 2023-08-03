import ApiService from './api.service'

const ReportColorRatingOfSchoolsService = {
    GetColorRatingOfSchoolsByOblast(schoolyearid, oblastid,regionid) {
		return ApiService.get(`/ReportLearningProcess/GetColorRatingOfSchoolsByOblast?
			schoolyearid=${schoolyearid}&
			oblastid=${oblastid}&
			regionid=${regionid}`
			
		)
	}/* ,
	PrintStudentsCount(schoolyearid, oblastid,regionid) {
		return ApiService.print(`/ReportLearningProcess/PrintStudentsCount?
		schoolyearid=${schoolyearid}&
		oblastid=${oblastid}&
		regionid=${regionid}`)
	} */
}

export default ReportColorRatingOfSchoolsService