import ApiService from './api.service'

const FixedMinimumValueService = {
    GetMinimumValue(Date,TariffScaleID,minimumvaluetypeid){
        return ApiService.get(`/FixedMinimumValue/GetMinimumValue?Date=${Date}&TariffScaleID=${TariffScaleID}&minimumvaluetypeid=${minimumvaluetypeid}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/FixedMinimumValue/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/FixedMinimumValue/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/FixedMinimumValue/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/FixedMinimumValue/Delete?id=${id}`)
    }
}
export default FixedMinimumValueService