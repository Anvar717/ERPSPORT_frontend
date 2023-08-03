import ApiService from './api.service'

const ReportVacancyService = {
    GetVacancy(schoolyearid, oblastid,regionid,schoolsubjectid) {
		return ApiService.get(`/ReportLearningProcess/GetVacancy?schoolyearid=${schoolyearid}&oblastid=${oblastid}&regionid=${regionid}&schoolsubjectid=${schoolsubjectid}`
			
		)
	},
	Print(schoolyearid, oblastid,regionid, schoolsubjectid) {
		return ApiService.print(`/ReportLearningProcess/PrintVacancy?
		schoolyearid=${schoolyearid}&
		oblastid=${oblastid}&
		regionid=${regionid}&
		schoolsubjectid=${schoolsubjectid}
		`)
	}
}

export default ReportVacancyService