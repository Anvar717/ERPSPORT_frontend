import ApiService from './api.service'

const ReportTarifficationDataService = {
    GetTarifficationData(schoolyearid, oblastid,regionid,qualificationcategoryid,schoolsubjectid,schoolgradegroupid) {
		return ApiService.get(`/ReportLearningProcess/GetTarifficationData?schoolyearid=${schoolyearid}&oblastid=${oblastid}&regionid=${regionid}&qualificationcategoryid=${qualificationcategoryid}&schoolsubjectid=${schoolsubjectid}&schoolgradegroupid=${schoolgradegroupid}`
			
		)
	},
	Print(schoolyearid, oblastid,regionid, qualificationcategoryid,schoolsubjectid,schoolgradegroupid) {
		return ApiService.print(`/ReportLearningProcess/PrintTarifficationData?
		schoolyearid=${schoolyearid}&
		oblastid=${oblastid}&
		regionid=${regionid}&
		qualificationcategoryid=${qualificationcategoryid}&
		schoolsubjectid=${schoolsubjectid}&
		schoolgradegroupid=${schoolgradegroupid}`)
	}
}

export default ReportTarifficationDataService