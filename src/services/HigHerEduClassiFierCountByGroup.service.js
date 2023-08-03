import ApiService from './api.service'

const HigHerEduClassiFierCountByGroupService = {
    GetHigHerEduClassiFierCountByGroup(
        ) {
          return ApiService.get(
            `/HigHerEduClassiFierCountByGroup/GetHigHerEduClassiFierCountByGroup`
          );
  },
  PrintHigHerEduClassiFierCountByGroup(
    ) {
      return ApiService.print(
        `/HigHerEduClassiFierCountByGroup/PrintHigHerEduClassiFierCountByGroup`
      );
},
}
export default HigHerEduClassiFierCountByGroupService