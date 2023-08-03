import ApiService from './api.service'

const TariffScaleService = {
    GetAll(tariffscaletypeid){
        return ApiService.get(`/TariffScale/GetAll?tariffscaletypeid=${tariffscaletypeid}`)
    },
    GetAllTableList(tariffscaleid){
        return ApiService.get(`/TariffScale/GetAllTableList?tariffscaleid=${tariffscaleid}`)
    },
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/TariffScale/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/TariffScale/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/TariffScale/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/TariffScale/Delete?id=${id}`)
    }
}
export default TariffScaleService