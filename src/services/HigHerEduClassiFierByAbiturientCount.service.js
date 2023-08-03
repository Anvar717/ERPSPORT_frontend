import ApiService from './api.service'

const HigHerEduClassiFierByAbiturientCountService = {
    GetHigHerEduClassiFierByAbiturientCount(higHerEduClassifierId
        ) {
          return ApiService.get(
            `/HigHerEduClassiFierByAbiturientCount/GetHigHerEduClassiFierByAbiturientCount?higHerEduClassifierId=${higHerEduClassifierId}`
          );
    },
    PrintHigHerEduClassiFierByAbiturientCount(higHerEduClassifierId
        ) {
          return ApiService.print(
            `/HigHerEduClassiFierByAbiturientCount/PrintHigHerEduClassiFierByAbiturientCount?higHerEduClassifierId=${higHerEduClassifierId}`
          );
    },
}
export default HigHerEduClassiFierByAbiturientCountService