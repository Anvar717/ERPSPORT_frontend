import ApiService from './api.service'

const ReportTheAmountPerStudentService = {
    GetTheAmountPerStudent(schoolyearid, oblastid,regionid ){
		return ApiService.get(`/ReportLearningProcess/GetTheAmountPerStudent?schoolyearid=${schoolyearid}&oblastid=${oblastid}&regionid=${regionid}`
			
		)
	},
	Print(schoolyearid, oblastid,regionid) {
		return ApiService.print(`/ReportLearningProcess/PrintStudentsCount?
		schoolyearid=${schoolyearid}&
		oblastid=${oblastid}&
		regionid=${regionid}`)
	}
}
export default ReportTheAmountPerStudentService